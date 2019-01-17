import 'dotenv/config'
import 'newrelic'
import nr from 'newrelic'
import cors from 'cors'
import express from 'express'
import fetch from 'node-fetch'
import schema from './schema'
import resolvers from './resolvers'
import { URLSearchParams } from 'url'
import { ApolloServer } from 'apollo-server-express'
import { SpotifyAPI } from './data-sources'
import { session } from './models'
import { omit } from './utils/fp'

const SCOPES = [
  'streaming',
  'user-follow-modify',
  'user-follow-read',
  'playlist-read-private',
  'playlist-modify-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'user-modify-playback-state',
  'user-read-private',
  'user-read-birthdate',
  'user-read-playback-state',
  'user-read-currently-playing',
  'user-read-email',
  'user-library-read',
  'user-library-modify',
  'user-top-read',
  'user-read-recently-played'
].join(' ')

const app = express()
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: error => {
    error.stack = error.extensions.exception.stacktrace.join('\n')

    nr.noticeError(error, {
      code: error.extensions.code,
      path: error.path,
      locations: error.locations
    })

    return omit(['stack'], error)
  },
  dataSources: () => ({
    spotifyAPI: new SpotifyAPI()
  }),
  context: ({ req }) => ({
    accessToken: req.headers.authorization
  })
})

app.use(cors())

app.get('/oauth/init', (req, res) => {
  const query = new URLSearchParams()
  query.set('response_type', 'code')
  query.set('client_id', process.env.CLIENT_ID)
  query.set('redirect_uri', process.env.REDIRECT_URI)
  query.set('scope', SCOPES)

  res.redirect(`https://accounts.spotify.com/authorize?${query}`)
})

app.get('/oauth/finalize', async (req, res) => {
  const body = new URLSearchParams()

  body.append('grant_type', 'authorization_code')
  body.append('code', req.query.code)
  body.append('redirect_uri', process.env.REDIRECT_URI)
  body.append('client_id', process.env.CLIENT_ID)
  body.append('client_secret', process.env.CLIENT_SECRET)

  const { access_token, refresh_token, scope, expires_in } = await fetch(
    'https://accounts.spotify.com/api/token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    }
  ).then(res => res.json())

  await session.create({
    accessToken: access_token,
    refreshToken: refresh_token,
    scopes: scope,
    expiresAt: new Date(Date.now() + expires_in * 1000)
  })

  const params = new URLSearchParams()
  params.set('token', access_token)

  res.redirect(`${process.env.CLIENT_URI}/set-token?${params}`)
})

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
})
