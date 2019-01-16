import { prop } from '../utils/fp'

export default {
  artist: (_, { id }, { dataSources }) => dataSources.spotifyAPI.getArtist(id),
  album: (_, { id }, { dataSources }) => dataSources.spotifyAPI.getAlbum(id),
  category: (_, { id }, { dataSources }) =>
    dataSources.spotifyAPI.getCategory(id),
  categories: (_, { limit = 50, offset = 0 }, { dataSources }) =>
    dataSources.spotifyAPI
      .getCategories({ limit, offset })
      .then(prop('categories')),
  featuredPlaylists: (_, { limit = 50, offset = 0 }, { dataSources }) =>
    dataSources.spotifyAPI
      .getFeaturedPlaylists({ limit, offset })
      .then(data => console.log(data.message) || prop('playlists')(data)),
  playlist: (_, { id }, { dataSources }) =>
    dataSources.spotifyAPI.getPlaylist(id),
  playlistsByCategory: (
    _,
    { categoryId, limit = 50, offset = 0 },
    { dataSources }
  ) =>
    dataSources.spotifyAPI
      .getPlaylistsByCategory(categoryId, { limit, offset })
      .then(prop('playlists')),
  newReleases: (_, { limit = 50, offset = 0 }, { dataSources }) =>
    dataSources.spotifyAPI
      .getNewReleases({ limit, offset })
      .then(prop('albums')),
  viewer: () => ({}) // dummy to allow Viewer type to work below
}
