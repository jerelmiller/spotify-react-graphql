import { curry } from 'utils/fp'
import { css } from 'styled-components'
import { lighten as lighter } from 'polished'

export const addUnits = curry((unit, value) =>
  typeof value === 'number' ? value + unit : value
)

export const color = curry((name, { theme }) => theme.colors[name])

export const textColor = curry(
  (name, { theme }) => theme.typography.colors[name]
)

export const typography = curry((name, { theme }) => {
  const { color, size, weight } = theme.typography.style[name] || {}

  return css`
    color: ${color};
    font-size: ${size};
    font-weight: ${weight};
  `
})

export const lighten = curry((amount, name, { theme }) =>
  lighter(amount, color(name, { theme }) || '')
)
