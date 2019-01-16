import { prop } from '../../utils/fp'

export default () => ({
  edges: prop('items'),
  pageInfo: ({ limit, next, offset, previous, total }) => ({
    hasNextPage: Boolean(next),
    hasPreviousPage: Boolean(previous),
    offset,
    limit,
    total
  })
})
