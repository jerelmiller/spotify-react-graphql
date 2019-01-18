import { colors, Hex } from './colors'

enum WeightValue {
  light = 300,
  normal = 400
}

interface Weight {
  light: WeightValue.light
  normal: WeightValue.normal
}

interface Size {
  xs: string
  sm: string
  normal: string
}

interface TextColors {
  primary: Hex
  muted: Hex
  highlight: Hex
  [key: string]: Hex
}

interface TypographyPreset {
  size: string
  weight: WeightValue
}

interface TypographyStyle {
  xs: TypographyPreset
  sm: TypographyPreset
  md: TypographyPreset
  [key: string]: TypographyPreset
}

export interface Typography {
  colors: TextColors
  size: Size
  weight: Weight
  style: TypographyStyle
}

const size = {
  xs: '0.8rem',
  sm: '0.9rem',
  normal: '1rem'
}

const weight = {
  light: 300,
  normal: 400
}

export const typography: Typography = {
  colors: {
    primary: colors.white,
    muted: colors.offWhite,
    highlight: colors.green
  },
  size,
  weight,
  style: {
    xs: {
      weight: weight.light,
      size: size.xs
    },
    sm: {
      weight: weight.light,
      size: size.sm
    },
    md: {
      weight: weight.normal,
      size: size.normal
    }
  }
}
