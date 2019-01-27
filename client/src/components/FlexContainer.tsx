import styled from './styled-components'
import { prop } from '../utils/fp'

const FlexContainer = styled('div')<{ inline: boolean }>`
  display: ${({ inline }) => (inline ? 'inline-flex' : 'flex')};
  align-items: ${prop('alignItems')};
  justify-content: ${prop('justifyContent')};
  flex-direction: ${prop('direction')};
`

export default FlexContainer
