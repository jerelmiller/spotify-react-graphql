import { prop } from '../utils/fp'

export default {
  addedAt: prop('added_at'),
  node: ({ addedAt, track }) => ({ ...track, addedAt })
}
