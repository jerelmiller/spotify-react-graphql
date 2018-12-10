import styled from 'styled-components'
import { branch, compose, defaultTo, prop } from 'utils/fp'
import { color } from 'styles/utils'

const FeatherSVG = styled.svg.attrs({
  viewBox: '0 0 24 24',
  xmlns: 'http://www.w3.org/2000/svg'
})`
  fill: ${branch(
    prop('fill'),
    compose(
      color,
      prop('fill')
    ),
    () => 'none'
  )};
  stroke: currentColor;
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
