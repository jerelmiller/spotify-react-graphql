import styled from '../../styled'
import { color } from '../../styles/utils'
import isPropValid from '@emotion/is-prop-valid'
import { prop } from '../../utils/fp'
import posed from 'react-pose'

export interface Props {
  align?: 'right' | 'left'
}

const Menu = styled(
  posed.ul({
    enter: { scale: 1, opacity: 1, transition: { duration: 200 } },
    exit: { scale: 0.95, opacity: 0, transition: { duration: 150 } }
  })
)<Props>`
  list-style: none;
  margin: 0;
  z-index: 99;
  position: absolute;
  background-color: ${color('grey')};
  padding: 0.25rem 0;
  top: 100%;
  min-width: 150px;
  border-radius: 4px;
  transform-origin: top ${prop('align')} !important;
  text-align: left;

  ${prop('align')}: 0;
`

Menu.defaultProps = {
  align: 'left'
}

export default Menu
