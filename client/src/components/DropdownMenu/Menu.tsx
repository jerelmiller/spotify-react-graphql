import styled from '../../styled'
import { color } from '../../styles/utils'
import isPropValid from '@emotion/is-prop-valid'
import { prop } from '../../utils/fp'

export interface Props {
  align?: 'right' | 'left'
  open: boolean
}

const Menu = styled('ul', {
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'open'
})<Props>`
  list-style: none;
  margin: 0;
  z-index: 99;
  position: absolute;
  background-color: ${color('grey')};
  display: ${({ open }) => (open ? 'block' : 'none')};
  padding: 0.25rem 0;
  top: 100%;
  min-width: 150px;
  border-radius: 4px;

  ${prop('align')}: 0;
`

Menu.defaultProps = {
  align: 'left'
}

export default Menu
