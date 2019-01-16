export default {
  tracks: ({ id }, { limit = 100, offset = 0 }, { dataSources }) =>
    dataSources.spotifyAPI.getPlaylistTracks(id, { limit, offset })
}
