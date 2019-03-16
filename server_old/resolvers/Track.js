export default {
  __resolveType: ({ addedAt, album }) => {
    if (addedAt) {
      return 'SavedTrack'
    } else if (album) {
      return 'FullTrack'
    }

    return 'SimpleTrack'
  }
}
