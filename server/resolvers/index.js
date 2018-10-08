import { prop } from '../utils/fp'

const resolvers = {
  Query: {
    artist: () => ({ id: 1 }),
    viewer: () => ({}) // dummy to allow Viewer type to work below
  },
  User: {
    displayName: prop('display_name')
  },
  Track: {
    discNumber: prop('disc_number'),
    trackNumber: prop('track_number')
  },
  Viewer: {
    user: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.getCurrentUser(),
    tracks: async (_source, { limit = 20, offset = 0 }, { dataSources }) =>
      dataSources.spotifyAPI
        .getViewerTracks({ limit, offset })
        .then(({ items }) => items.map(prop('track')))
  }
}

export default resolvers
