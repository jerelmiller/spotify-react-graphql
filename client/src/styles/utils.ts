import { curry } from '../utils/fp'
import { css } from 'styled-components'
import { lighten as lighter } from 'polished'
import { Theme, Hex } from './theme'

interface Props {
  theme: Theme
}

export const addUnits = curry((unit: string, value: number | string) =>
  typeof value === 'number' ? value + unit : value
)

export const color = curry(
  (name: string, { theme }: Props): Hex => theme.colors[name]
)

export const textColor = curry(
  (name: string, { theme }: Props): Hex => theme.typography.colors[name]
)

export const typography = curry((name: string, { theme }: Props) => {
  const typographyStyle = theme.typography.style[name] || {}
  const { size, weight } = typographyStyle

  return css`
    font-size: ${size};
    font-weight: ${weight};
  `
})

export const lighten = curry((amount: number, name: string, { theme }: Props) =>
  lighter(amount, color(name, { theme }) || '')
)
