import fs from 'fs'
import path from 'path'

const isJSFile = (filename, ext) => filename.slice(-3) === '.js'
const isHiddenFile = filename => filename.indexOf('.') === 0

export const getRelativeFiles = dirname =>
  fs
    .readdirSync(path.resolve(dirname))
    .filter(
      filename =>
        isJSFile(filename) && !isHiddenFile(filename) && filename !== 'index.js'
    )
