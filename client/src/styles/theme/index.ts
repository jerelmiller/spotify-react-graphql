import { colors, Colors } from './colors'
import { typography, Typography } from './typography'

export interface Theme {
  colors: Colors
  typography: Typography
}

export * from './colors'
export * from './typography'

export const theme: Theme = {
  colors,
  typography
}
