import colors from './colors'

const size = {
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
  highlight: colors.green
}

export default {
  colors: textColors,
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
