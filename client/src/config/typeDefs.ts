import gql from 'graphql-tag'

const typeDefs = gql`
  extend type Query {
    notifications: [Notification!]!
  }

  extend type Mutation {
    notify(input: NotifyInput!): NotifyPayload!
    removeNotification(
      input: RemoveNotificationInput!
    ): RemoveNotificationPayload!
  }

  input NotifyInput {
    message: String!
    timeout: Int
  }

  type NotifyPayload {
    id: ID!
  }

  input RemoveNotificationInput {
    id: ID!
  }

  type RemoveNotificationPayload {
    notifications: [Notification!]!
  }

  type Notification {
    id: ID!
    message: String!
    timeout: Int!
  }

  extend type Album {
    link: String!
  }

  extend type Track {
    link: String!
  }

  extend type SimpleTrack {
    link: String!
  }

  extend type FullTrack {
    link: String!
  }

  extend type SavedTrack {
    link: String!
  }
`

export default typeDefs
