import styled from 'styled-components'
import { prop } from 'utils/fp'

const FlexContainer = styled.div`
  display: flex;
  align-items: ${prop('alignItems')};
  justify-content: ${prop('justifyContent')};
  flex-direction: ${prop('direction')};
`

export default FlexContainer
