import 'dotenv/config'
import express from 'express'
import schema from './schema'
import resolvers from './resolvers'
import { ApolloServer } from 'apollo-server-express'

const app = express()
const server = new ApolloServer({ typeDefs: schema, resolvers })

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
})
