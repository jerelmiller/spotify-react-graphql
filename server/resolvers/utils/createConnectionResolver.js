import { filter, prop, compose } from '../../utils/fp'

export default (filterFn = Boolean) => ({
  edges: compose(
    filter(filterFn),
    prop('items')
  ),
  pageInfo: ({ limit, next, offset, previous, total }) => ({
    hasNextPage: Boolean(next),
    hasPreviousPage: Boolean(previous),
    offset,
    limit,
    total
  })
})
