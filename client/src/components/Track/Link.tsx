import styled from 'styled-components'
import { Link as RRLink } from '@reach/router'

const Link = styled(RRLink)`
  border-bottom: 1px solid transparent;
  transition: all 0.2s ease-in-out;
  font-size: 0.85rem;
  font-weight: 300;

  &:hover {
    color: #fff;
    border-bottom-color: #fff;
  }
`

export default Link
