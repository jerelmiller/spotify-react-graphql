export const curry = fn => {
  const curried = (...args) => {
    if (args.length >= fn.length) {
      return fn(...args)
    }

    return (...args2) => curried(...args.concat(args2))
  }

  return curried
}

export const prop = name => obj => obj[name]
export const self = item => item
export const filterKeys = curry((fn, obj) =>
  Object.entries(obj)
    .filter(fn)
    .reduce((memo, [key, value]) => ({ ...memo, [key]: value }), {})
)

export const filterNullValues = filterKeys(([_, value]) => Boolean(value))

export const omit = curry((keys, obj) =>
  filterKeys(([key]) => !keys.includes(key), obj)
)
