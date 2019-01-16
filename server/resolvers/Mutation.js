export default {
  playTrack: (_, { input }, { dataSources }) =>
    dataSources.spotifyAPI
      .playTrack(input.track, { deviceId: input.deviceId })
      .then(() => ({ success: true }))
}
