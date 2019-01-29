import styled from './styled-components'
import { prop } from '../utils/fp'
import { CSSProperties } from 'react'

interface Props {
  inline?: boolean
  alignItems?: CSSProperties['alignItems']
  justifyContent?: CSSProperties['justifyContent']
  direction?: CSSProperties['flexDirection']
}

const FlexContainer = styled('div')<Props>`
  display: ${({ inline }) => (inline ? 'inline-flex' : 'flex')};
  align-items: ${prop('alignItems')};
  justify-content: ${prop('justifyContent')};
  flex-direction: ${prop('direction')};
`

export default FlexContainer
