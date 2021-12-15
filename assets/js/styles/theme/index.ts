import colors from './colors'
import typography from './typography'

const theme = { colors, typography }

export type Theme = typeof theme
export type ColorName = keyof typeof colors
export type FontSize = keyof typeof typography.size

export default theme
