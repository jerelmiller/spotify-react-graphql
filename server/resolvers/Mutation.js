export default {
  refreshSession: (_, { token }, { dataSources }) =>
    dataSources.spotifyAPI.refreshSession(),
  playTrack: (_, { input }, { dataSources }) =>
    dataSources.spotifyAPI
      .playTrack(input.track, {
        deviceId: input.deviceId,
        contextUri: input.contextUri
      })
      .then(() => ({ success: true }))
}
