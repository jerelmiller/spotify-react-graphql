export const noop = () => {}
export const value = <T = any>(val: T) => () => val
export const prop = <K extends keyof T, T>(name: K) => (obj: T) => obj[name]

export {
  concat,
  curry,
  ifElse,
  compose,
  defaultTo,
  lens,
  lensPath,
  lensProp,
  view,
  set
} from 'ramda'
