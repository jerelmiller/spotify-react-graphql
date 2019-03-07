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
  playAlbum: (_, { input }, { dataSources }) =>
    dataSources.spotifyAPI
      .playAlbum(input.album, { deviceId: input.deviceId })
      .then(() => ({ success: true }))
      .catch(() => ({ success: false }))
}
