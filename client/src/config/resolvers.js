import globalId from '../utils/globalId'

const resolvers = {
  Mutation: {
    notify: (_, { input: { timeout, ...input } }, { cache }) => {
      const notification = {
        ...input,
        id: globalId(),
        timeout: input.timeout || 3000,
        __typename: 'Notification'
      }

      console.log(notification)

      return { id: notification.id }
    }
  }
}

export default resolvers
