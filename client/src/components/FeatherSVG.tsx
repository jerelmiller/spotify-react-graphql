import styled from 'styled-components'
import { ifElse, compose, defaultTo, prop, value } from '../utils/fp'
import { color } from '../styles/utils'

export interface Props {
  fill?: string
  stroke?: string
  strokeWidth?: number
  size?: string
}

const withColor = (colorValue: string) => color(colorValue) || colorValue

const FeatherSVG = styled.svg.attrs({
  viewBox: '0 0 24 24',
  xmlns: 'http://www.w3.org/2000/svg'
})<Props>`
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
