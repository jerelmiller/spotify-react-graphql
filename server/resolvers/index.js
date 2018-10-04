import { prop } from '../utils/fp'

const resolvers = {
  Query: {
    artist: () => ({ id: 1 }),
    viewer: () => ({}) // dummy to allow Viewer type to work below
  },
  User: {
    displayName: prop('display_name')
  },
  Viewer: {
    user: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.getCurrentUser()
  }
}

export default resolvers
