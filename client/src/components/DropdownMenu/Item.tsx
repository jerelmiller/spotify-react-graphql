import { ReactNode } from 'react'
import styled from '../../styled'
import { textColor, lighten, fontSize } from '../../styles/utils'

interface Props {
  children: ReactNode
}

const Item = styled.li<Props>`
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: ${textColor('muted')};
  white-space: nowrap;

  ${fontSize('sm')};

  &:hover {
    color: ${textColor('primary')};
    background: ${lighten(0.08, 'grey')};
  }
`

export default Item
