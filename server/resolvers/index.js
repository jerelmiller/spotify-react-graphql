import { prop } from '../utils/fp'

const createConnectionResolver = () => ({
  edges: prop('items'),
  pageInfo: ({ limit, next, offset, previous, total }) => ({
    hasNextPage: Boolean(next),
    hasPreviousPage: Boolean(previous),
    offset,
    limit,
    total
  })
})

const createCursorConnectionResolver = () => ({
  edges: prop('items'),
  pageInfo: ({ cursors, limit, next, total }) => ({
    cursor: cursors.after,
    next: Boolean(next),
    limit,
    total
  })
})

const resolvers = {
  Query: {
    artist: (_, { id }, { dataSources }) =>
      dataSources.spotifyAPI.getArtist(id),
    album: (_, { id }, { dataSources }) => dataSources.spotifyAPI.getAlbum(id),
    viewer: () => ({}) // dummy to allow Viewer type to work below
  },
  Album: {
    primaryArtist: ({ artists }) => artists[0],
    releaseDate: ({ release_date, release_date_precision }) => ({
      date: release_date,
      precision: release_date_precision.toUpperCase()
    }),
    tracks: async ({ id }, _args, { dataSources }) =>
      dataSources.spotifyAPI.getAlbumTracks(id),
    type: ({ album_group: group, album_type: type }) =>
      group ? group.toUpperCase() : type.toUpperCase()
  },
  AlbumConnection: createConnectionResolver(),
  AlbumEdge: {
    node: item => item
  },
  Artist: {
    albums: ({ id }, { limit = 50, offset = 0 }, { dataSources }) =>
      dataSources.spotifyAPI.getArtistAlbums(id, { limit, offset }),
    externalUrls: prop('external_urls'),
    topTracks: ({ id }, { limit = 10 }, { dataSources }) =>
      dataSources.spotifyAPI
        .getTopTracksByArtist(id)
        .then(({ tracks }) => tracks.slice(0, limit))
  },
  ArtistConnection: createCursorConnectionResolver(),
  ArtistEdge: {
    node: item => item
  },
  CursorInfo: {
    cursor: ({ cursors }) => cursors.after,
    hasNextPage: ({ next }) => Boolean(next)
  },
  FullTrack: {
    discNumber: prop('disc_number'),
    duration: prop('duration_ms'),
    previewUrl: prop('preview_url'),
    trackNumber: prop('track_number')
  },
  Playlist: {
    tracks: async ({ id }, { limit = 100, offset = 0 }, { dataSources }) =>
      dataSources.spotifyAPI.getPlaylistTracks(id, { limit, offset })
  },
  PlaylistConnection: createConnectionResolver(),
  PlaylistEdge: {
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
  SavedTrack: {
    discNumber: prop('disc_number'),
    duration: prop('duration_ms'),
    trackNumber: prop('track_number')
  },
  SavedTrackConnection: createConnectionResolver(),
  SavedTrackEdge: {
    addedAt: prop('added_at'),
    node: ({ addedAt, track }) => ({ ...track, addedAt })
  },
  Track: {
    __resolveType: ({ addedAt, album }) => {
      if (addedAt) {
        return 'SavedTrack'
      } else if (album) {
        return 'FullTrack'
      }

      return 'SimpleTrack'
    }
  },
  SimpleTrack: {
    discNumber: prop('disc_number'),
    duration: prop('duration_ms'),
    trackNumber: prop('track_number')
  },
  TrackConnection: createConnectionResolver(),
  TrackEdge: {
    node: item => item
  },
  Viewer: {
    followedArtists: async (_source, { limit = 50, after }, { dataSources }) =>
      dataSources.spotifyAPI
        .getViewerArtists({ limit, after })
        .then(prop('artists')),
    playlists: async (_source, { limit = 50, offset = 0 }, { dataSources }) =>
      dataSources.spotifyAPI.getViewerPlaylists({ limit, offset }),
    savedAlbums: async (_source, { limit = 20, offset = 0 }, { dataSources }) =>
      dataSources.spotifyAPI.getViewerAlbums({ limit, offset }),
    user: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.getCurrentUser(),
    savedTracks: async (_source, { limit = 20, offset = 0 }, { dataSources }) =>
      dataSources.spotifyAPI.getViewerTracks({ limit, offset })
  }
}

export default resolvers
