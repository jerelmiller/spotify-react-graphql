import { prop } from '../utils/fp'

export default {
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
