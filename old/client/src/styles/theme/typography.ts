import colors from './colors'

const size = {
  xxs: '0.625rem',
  xs: '0.8rem',
  sm: '0.9rem',
  normal: '1rem'
}

const weight = {
  light: 300
}

const textColors = {
  primary: colors.white,
  muted: colors.offWhite,
  highlight: colors.lightGreen
}

interface Style {
  weight?: number
  size: keyof typeof size
}

export default {
  colors: textColors,
  size,
  weight,
  style: {
    xxs: {
      weight: weight.light,
      size: size.xxs
    },
    xs: {
      weight: weight.light,
      size: size.xs
    },
    sm: {
      weight: weight.light,
      size: size.sm
    },
    md: {
      size: size.normal
    }
  } as { [key: string]: Style }
}
