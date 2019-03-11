import colors from './colors'
import typography from './typography'

export type Theme = typeof theme
export type ColorName = keyof typeof colors
export type FontSize = keyof typeof typography.size

const theme = { colors, typography }

export default theme
