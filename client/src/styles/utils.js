import { curry } from 'utils/fp'

export const color = curry((name, { theme }) => theme.colors[name])

export const textColor = curry(
  (name, { theme }) => theme.typography.colors[name]
)
