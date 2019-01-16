import { prop } from '../../utils/fp'

export default () => ({
  edges: prop('items'),
  pageInfo: ({ cursors, limit, next, total }) => ({
    cursor: cursors.after,
    next: Boolean(next),
    limit,
    total
  })
})
