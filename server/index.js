import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import fetch from 'node-fetch'
import schema from './schema'
import resolvers from './resolvers'
import { URLSearchParams } from 'url'
import { ApolloServer } from 'apollo-server-express'

const SCOPES = [
  'streaming',
  'user-follow-modify',
  'user-follow-read',
  'playlist-read-private',
  'playlist-modify-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'user-modify-playback-state',
  'user-read-playback-state',
  'user-read-currently-playing',
  'user-read-email',
  'user-library-read',
  'user-library-modify',
  'user-top-read',
  'user-read-recently-played'
].join(' ')

const app = express()
const server = new ApolloServer({ typeDefs: schema, resolvers })

app.use(cors())

app.get('/oauth/init', (req, res) => {
  const query = new URLSearchParams()
  query.set('response_type', 'code')
  query.set('client_id', process.env.CLIENT_ID)
  query.set('redirect_uri', process.env.REDIRECT_URI)
  query.set('scopes', SCOPES)

  res.redirect(`https://accounts.spotify.com/authorize?${query}`)
})

app.get('/oauth/finalize', async (req, res) => {
  const body = new URLSearchParams()

  body.append('grant_type', 'authorization_code')
  body.append('code', req.query.code)
  body.append('redirect_uri', process.env.REDIRECT_URI)
  body.append('client_id', process.env.CLIENT_ID)
  body.append('client_secret', process.env.CLIENT_SECRET)

  const data = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  }).then(res => res.json())

  res.send(data)
})

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
})
