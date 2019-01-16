export default {
  albums: ({ id }, { limit = 50, offset = 0 }, { dataSources }) =>
    dataSources.spotifyAPI.getArtistAlbums(id, { limit, offset }),
  topTracks: ({ id }, { limit = 10 }, { dataSources }) =>
    dataSources.spotifyAPI
      .getTopTracksByArtist(id)
      .then(({ tracks }) => tracks.slice(0, limit)),
  relatedArtists: ({ id }, _args, { dataSources }) =>
    dataSources.spotifyAPI.getRelatedArtists(id).then(prop('artists'))
}
