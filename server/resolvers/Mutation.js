export default {
  refreshSession: (_, { token }, { dataSources }) =>
    dataSources.spotifyAPI.refreshSession(),
  playTrack: (_, { input }, { dataSources }) =>
    dataSources.spotifyAPI
      .playTrack(input.track, { deviceId: input.deviceId })
      .then(() => ({ success: true }))
}
