import globalId from '../utils/globalId'
import gql from 'graphql-tag'

const DEFAULT_TIMEOUT = 3000

const NOTIFICATIONS_QUERY = gql`
  query LocalNotificationsQuery {
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
        timeout: timeout || DEFAULT_TIMEOUT,
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
  },
  Album: {
    link: ({ id }) => `${window.location.origin}/albums/${id}`
  },
  SimpleTrack: {
    link: ({ id }) => `${window.location.origin}/tracks/${id}`
  },
  SavedTrack: {
    link: ({ id }) => `${window.location.origin}/tracks/${id}`
  },
  FullTrack: {
    link: ({ id }) => `${window.location.origin}/tracks/${id}`
  }
}

export default resolvers
