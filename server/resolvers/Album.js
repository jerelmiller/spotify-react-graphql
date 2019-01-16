export default {
  group: ({ album_group: group }) => group.toUpperCase(),
  primaryArtist: ({ artists }) => artists[0],
  releaseDate: ({ release_date, release_date_precision }) => ({
    date: release_date,
    precision: release_date_precision.toUpperCase()
  }),
  tracks: async ({ id }, _args, { dataSources }) =>
    dataSources.spotifyAPI.getAlbumTracks(id),
  type: ({ album_type: type }) => type.toUpperCase()
}
