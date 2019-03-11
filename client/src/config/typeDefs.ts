import gql from 'graphql-tag'

const typeDefs = gql`
  extend type Query {
    notifications: [Notification!]!
  }

  extend type Mutation {
    notify(input: NotificationInput!): NotificationPayload!
    removeNotification(
      input: RemoveNotificationInput!
    ): RemoveNotificationPayload!
  }

  input NotificationInput {
    message: String!
    timeout: Number
  }

  type NotificationPayload {
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
    timeout: Number!
  }
`

export default typeDefs
