import styled from 'styled-components'
import { prop } from '../utils/fp'
import { CSSProperties } from 'react'

interface Props {
  direction?: CSSProperties['flexDirection']
  alignItems?: CSSProperties['alignItems']
  justifyContent?: CSSProperties['justifyContent']
  inline?: boolean
}

const FlexContainer = styled.div<Props>`
  display: ${({ inline }) => (inline ? 'inline-flex' : 'flex')};
  align-items: ${prop('alignItems')};
  justify-content: ${prop('justifyContent')};
  flex-direction: ${prop('direction')};
`

export default FlexContainer
