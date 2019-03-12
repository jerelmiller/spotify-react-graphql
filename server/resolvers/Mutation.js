export default {
  refreshSession: (_, { input }, { dataSources }) =>
    dataSources.spotifyAPI.refreshSession(input.token),
  playTrack: (_, { input }, { dataSources }) =>
    dataSources.spotifyAPI
      .playTrack(input.track, {
        deviceId: input.deviceId,
        contextUri: input.contextUri
      })
      .then(() => ({ success: true }))
      .catch(() => ({ success: false })),
  playCollection: (_, { input }, { dataSources }) =>
    dataSources.spotifyAPI
      .playCollection(input.collectionUri, { deviceId: input.deviceId })
      .then(() => ({ success: true }))
      .catch(() => ({ success: false })),
  shuffle: (_, { input }, { dataSources }) =>
    dataSources.spotifyAPI
      .shuffle(input.state, { deviceId: input.deviceId })
      .then(() => ({ success: true }))
      .catch(() => ({ success: false })),
  removeAlbumFromLibrary: (_, { input }, { dataSources }) =>
    dataSources.spotifyAPI
      .removeAlbumsFromLibrary([input.albumId])
      .then(() => dataSources.spotifyAPI.getAlbum(input.id))
      .then(album => ({ album })),
  addAlbumToLibrary: (_, { input }, { dataSources }) =>
    dataSources.spotifyAPI
      .addAlbumsToLibrary([input.albumId])
      .then(() => dataSources.spotifyAPI.getAlbum(input.id))
      .then(album => ({ album }))
}
