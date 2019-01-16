import fs from 'fs'
import path from 'path'

const currentFilename = path.basename(__filename)
const isJSFile = filename => /\.js$/.test(filename)

// automatically require all files in current directory
const resolvers = fs
  .readdirSync(path.resolve(__dirname))
  .filter(filename => isJSFile(filename) && filename !== currentFilename)
  .reduce(
    (resolvers, filename) => ({
      ...resolvers,
      [path.basename(filename, '.js')]: require(path.resolve(
        __dirname,
        filename
      )).default
    }),
    {}
  )

export default resolvers
