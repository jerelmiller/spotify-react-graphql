export const curry = fn => {
  const curried = (...args) => {
    if (args.length >= fn.length) {
      return fn(...args)
    }

    return (...args2) => curried(...args.concat(args2))
  }

  return curried
}

export const compose = (...fns) =>
  fns.reduce((f, g) => (...args) => f(g(...args)))

export const branch = curry((predicate, ifTrue, ifFalse, obj) =>
  predicate(obj) ? ifTrue(obj) : ifFalse()
)

export const defaultTo = curry((def, obj) => (obj == null ? def : obj))
export const noop = () => {}
export const prop = curry((name, obj) => obj[name])
export const value = val => () => val
