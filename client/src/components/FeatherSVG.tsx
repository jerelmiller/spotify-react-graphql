import styled from 'styled-components'
import { branch, compose, defaultTo, prop, value } from '../utils/fp'
import { color } from '../styles/utils'
import { CSSProperties } from 'react'

export interface Props {
  cursor?: CSSProperties['cursor']
  fill?: string
  stroke?: string
  strokeWidth?: number
  size?: string
  // TODO: Figure out how to pull this off styled.svg
  onClick?(e: MouseEvent): void
}

const withColor = (colorValue: string) => color(colorValue) || colorValue

const FeatherSVG = styled.svg.attrs({
  viewBox: '0 0 24 24',
  xmlns: 'http://www.w3.org/2000/svg'
})<Props>`
  cursor: ${prop('cursor')};
  fill: ${branch(
    prop('fill'),
    compose(
      withColor,
      prop('fill')
    ),
    () => 'none'
  )};
  stroke: ${branch(
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
