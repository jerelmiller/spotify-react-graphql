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
    duration: prop('duration_ms'),
    trackNumber: prop('track_number')
  },
  TrackEdge: {
    addedAt: prop('added_at'),
    node: prop('track')
  },
  TrackConnection: {
    edges: ({ items }) => items,
    pageInfo: ({ limit, next, offset, previous, total }) => ({
      hasNext: Boolean(next),
      hasPrevious: Boolean(previous),
      offset,
      limit,
      total
    })
  },
  Viewer: {
    user: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.getCurrentUser(),
    tracks: async (_source, { limit = 20, offset = 0 }, { dataSources }) =>
      dataSources.spotifyAPI.getViewerTracks({ limit, offset })
  }
}

export default resolvers
