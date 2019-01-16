import { prop } from '../utils/fp'

export const createConnectionResolver = () => ({
  edges: prop('items'),
  pageInfo: ({ limit, next, offset, previous, total }) => ({
    hasNextPage: Boolean(next),
    hasPreviousPage: Boolean(previous),
    offset,
    limit,
    total
  })
})

export const createCursorConnectionResolver = () => ({
  edges: prop('items'),
  pageInfo: ({ cursors, limit, next, total }) => ({
    cursor: cursors.after,
    next: Boolean(next),
    limit,
    total
  })
})
