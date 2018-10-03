const { gql } = require('apollo-server')

module.exports = gql`
  type Query {
    artist(id: ID!): Artist
  }

  type Artist {
    id: ID!
  }
`
