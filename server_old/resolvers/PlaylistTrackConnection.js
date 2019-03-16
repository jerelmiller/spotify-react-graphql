import { createConnectionResolver } from './utils'
import { prop, compose } from '../utils/fp'

export default createConnectionResolver(
  compose(
    Boolean,
    prop('track')
  )
)
