import { curry } from '../utils/fp'
import { css } from 'styled-components'
import { lighten as lighter } from 'polished'
import { Theme } from './theme'

interface Props {
  theme: Theme
}

type ColorName = keyof Theme['colors']
type TypographyColor = keyof Theme['typography']['colors']
type TypographyStyle = keyof Theme['typography']['style']

export const color = curry(
  (name: ColorName, { theme }: Props) => theme.colors[name]
)

export const textColor = curry(
  (name: TypographyColor, { theme }: Props) => theme.typography.colors[name]
)

export const typography = curry((name: TypographyStyle, { theme }: Props) => {
  const { size, weight } = theme.typography.style[name]

  return css`
    font-size: ${size};
    font-weight: ${weight};
  `
})

export const lighten = curry(
  (amount: string | number, name: ColorName, props: Props) =>
    lighter(amount, color(name, props) || '')
)
