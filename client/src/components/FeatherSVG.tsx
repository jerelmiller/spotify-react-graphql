import styled from 'styled-components'
import { ifElse, compose, defaultTo, prop, value } from '../utils/fp'
import { color } from '../styles/utils'
import { CSSProperties, HTMLAttributes } from 'react'

export interface Props extends HTMLAttributes<SVGElement> {
  cursor?: CSSProperties['cursor']
  fill?: CSSProperties['fill']
  stroke?: CSSProperties['stroke']
  strokeWidth?: CSSProperties['strokeWidth']
  size?: string
}

const withColor = (colorValue: string) => color(colorValue) || colorValue

const FeatherSVG = styled.svg.attrs({
  viewBox: '0 0 24 24',
  xmlns: 'http://www.w3.org/2000/svg'
})<Props>`
  cursor: ${prop('cursor')};
  fill: ${ifElse(
    prop('fill'),
    compose(
      withColor,
      prop('fill')
    ),
    value('none')
  )};
  stroke: ${ifElse(
    prop('stroke'),
    compose(
      withColor,
      prop('stroke')
    ),
    value('currentColor')
  )};
  stroke-width: ${compose(
    defaultTo(2),
    prop('strokeWidth')
  )};
  stroke-linecap: round;
  stroke-linejoin: round;
  width: ${prop('size')};
  height: ${prop('size')};
`

export default FeatherSVG
