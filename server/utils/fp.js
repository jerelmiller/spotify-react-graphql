export const prop = name => obj => obj[name]
export const self = item => item
export const filterKeys = fn => obj =>
  Object.entries(obj)
    .filter(fn)
    .reduce((memo, [key, value]) => ({ ...memo, [key]: value }))

export const filterNullValues = filterKeys(([_, value]) => Boolean(value))
