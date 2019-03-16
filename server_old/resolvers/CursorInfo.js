export default {
  cursor: ({ cursors }) => cursors.after,
  hasNextPage: ({ next }) => Boolean(next)
}
