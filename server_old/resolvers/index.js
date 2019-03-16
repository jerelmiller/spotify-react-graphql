import fs from 'fs'
import path from 'path'
import { getRelativeFiles } from '../utils/fs'

const resolvers = getRelativeFiles(__dirname).reduce(
  (resolvers, filename) => ({
    ...resolvers,
    [path.basename(filename, '.js')]: require(path.resolve(__dirname, filename))
      .default
  }),
  {}
)

export default resolvers
