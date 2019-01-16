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
}
