import { css } from '../styled'
import { color as themeColor } from '../styles/utils'
import { CSSProperties, FC, HTMLAttributes } from 'react'
import { ColorName, Theme } from '../styles/theme'

type Color = ColorName | 'currentColor'

interface OwnProps {
  cursor?: CSSProperties['cursor']
  fill?: Color
  stroke?: Color
  strokeWidth?: CSSProperties['strokeWidth']
  size?: string
}

export type Props = HTMLAttributes<SVGElement> & OwnProps

const color = (
  value: Color | undefined,
  theme: Theme,
  { defaultTo }: { defaultTo: string }
) => {
  if (value === 'currentColor') {
    return 'currentColor'
  }

  return value ? themeColor(value, { theme }) : defaultTo
}

const FeatherSVG: FC<Props> = ({
  cursor,
  fill,
  children,
  size,
  stroke,
  strokeWidth,
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    css={(theme: Theme) => css`
      cursor: ${cursor};
      fill: ${color(fill, theme, { defaultTo: 'none' })};
      stroke: ${color(stroke, theme, { defaultTo: 'currentColor' })};
      stroke-width: ${strokeWidth || 2};
      stroke-linecap: round;
      stroke-linejoin: round;
      width: ${size};
      height: ${size};
    `}
    {...props}
  >
    {children}
  </svg>
)

export default FeatherSVG
