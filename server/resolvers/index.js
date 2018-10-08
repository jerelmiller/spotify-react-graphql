import { prop } from '../utils/fp'

const createConnectionResolver = () => ({
  edges: prop('items'),
  pageInfo: ({ limit, next, offset, previous, total }) => ({
    hasNext: Boolean(next),
    hasPrevious: Boolean(previous),
    offset,
    limit,
    total
  })
})

const resolvers = {
  Query: {
    artist: () => ({ id: 1 }),
    viewer: () => ({}) // dummy to allow Viewer type to work below
  },
  Album: {
    releaseDate: ({ release_date, release_date_precision }) => ({
      date: release_date,
      precision: release_date_precision
    }),
    tracks: async ({ id }, _args, { dataSources }) =>
      dataSources.spotifyAPI.getAlbumTracks(id),
    type: prop('album_type')
  },
  AlbumConnection: createConnectionResolver(),
  AlbumEdge: {
    node: item => item
  },
  User: {
    displayName: prop('display_name')
  },
  SavedAlbumConnection: createConnectionResolver(),
  SavedAlbumEdge: {
    addedAt: prop('added_at'),
    node: prop('album')
  },
  SavedTrackConnection: createConnectionResolver(),
  SavedTrackEdge: {
    addedAt: prop('added_at'),
    node: prop('track')
  },
  Track: {
    discNumber: prop('disc_number'),
    duration: prop('duration_ms'),
    trackNumber: prop('track_number')
  },
  TrackConnection: createConnectionResolver(),
  TrackEdge: {
    node: item => item
  },
  Viewer: {
    albums: async (_source, { limit = 20, offset = 0 }, { dataSources }) =>
      dataSources.spotifyAPI.getViewerAlbums({ limit, offset }),
    user: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.getCurrentUser(),
    tracks: async (_source, { limit = 20, offset = 0 }, { dataSources }) =>
      dataSources.spotifyAPI.getViewerTracks({ limit, offset })
  }
}

export default resolvers
