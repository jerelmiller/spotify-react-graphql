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
    success: Boolean
  }

  type Notification {
    id: ID!
    message: String!
    timeout: Int!
  }
`

export default typeDefs
