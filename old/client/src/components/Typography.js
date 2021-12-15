import styled from 'styled-components'
import { color, typography } from 'styles/utils'
import { compose, prop } from 'utils/fp'

const Typography = styled.span`
  ${({ kind }) => typography(kind)};
  color: ${compose(
    color,
    prop('color')
  )};
`

export default Typography
