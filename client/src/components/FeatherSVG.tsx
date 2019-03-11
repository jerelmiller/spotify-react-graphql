import { css } from '../styled'
import { color } from '../styles/utils'
import { CSSProperties, HTMLAttributes, FC } from 'react'
import { ColorName, Theme } from '../styles/theme'

export interface Props extends HTMLAttributes<SVGElement> {
  cursor?: CSSProperties['cursor']
  fill?: ColorName
  stroke?: ColorName
  strokeWidth?: CSSProperties['strokeWidth']
  size?: string
}

const FeatherSVG: FC<Props> = ({
  cursor,
  fill,
  children,
  size,
  stroke,
  strokeWidth
}) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    css={(theme: Theme) => css`
      cursor: ${cursor};
      fill: ${fill ? color(fill, { theme }) : 'none'};
      stroke: ${stroke ? color(stroke, { theme }) : 'currentColor'};
      stroke-width: ${strokeWidth || 2};
      stroke-linecap: round;
      stroke-linejoin: round;
      width: ${size};
      height: ${size};
    `}
  >
    {children}
  </svg>
)

export default FeatherSVG
