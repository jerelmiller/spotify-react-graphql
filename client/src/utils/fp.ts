export const noop = () => {}
export const value = <T = any>(val: T) => () => val
export const prop = <K extends keyof T, T>(name: K) => (obj: T) => obj[name]

export { curry, ifElse, compose, defaultTo } from 'ramda'
