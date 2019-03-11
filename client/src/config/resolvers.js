import globalId from '../utils/globalId'
import gql from 'graphql-tag'

const NOTIFICATIONS_QUERY = gql`
  query NotificationsQuery {
    notifications @client {
      id
      message
      timeout
    }
  }
`

const resolvers = {
  Mutation: {
    notify: (_, { input: { timeout, ...input } }, { cache }) => {
      const { notifications } = cache.readQuery({ query: NOTIFICATIONS_QUERY })

      const notification = {
        ...input,
        id: globalId(),
        timeout: input.timeout || 3000,
        __typename: 'Notification'
      }

      cache.writeQuery({
        query: NOTIFICATIONS_QUERY,
        data: {
          notifications: [...notifications, notification]
        }
      })

      return { id: notification.id, __typename: 'NotifyPayload' }
    },
    removeNotification: (_, { input: { id } }, { cache }) => {
      const { notifications: currentNotifications } = cache.readQuery({
        query: NOTIFICATIONS_QUERY
      })

      const notifications = currentNotifications.filter(
        notification => notification.id !== id
      )

      cache.writeQuery({
        query: NOTIFICATIONS_QUERY,
        data: {
          notifications
        }
      })

      return {
        notifications,
        __typename: 'RemoveNotificationPayload'
      }
    }
  }
}

export default resolvers
