import { curry } from 'utils/fp'

export const addUnits = curry(
  (unit, value) => (typeof value === 'number' ? value + unit : value)
)

export const color = curry((name, { theme }) => theme.colors[name])

export const textColor = curry(
  (name, { theme }) => theme.typography.colors[name]
)
