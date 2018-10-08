import { curry } from 'utils/fp'

export const color = curry((name, { theme }) => theme.colors[name])
