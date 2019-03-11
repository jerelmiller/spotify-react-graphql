import React, { FC, ReactNode, useContext, MouseEvent } from 'react'
import DropdownMenuContext from './Context'
import { css } from '../../styled'
import { textColor, lighten, fontSize } from '../../styles/utils'
import { composeHandlers } from '../../utils/events'

interface Props {
  onClick?(e: MouseEvent): void
  children: ReactNode
}

const Item: FC<Props> = ({ onClick, children }) => {
  const { close } = useContext(DropdownMenuContext)

  return (
    <li
      onClick={composeHandlers(onClick, close)}
      css={theme => css`
        padding: 0.5rem 1rem;
        cursor: pointer;
        color: ${textColor('muted', { theme })};
        white-space: nowrap;

        ${fontSize('sm', { theme })};

        &:hover {
          color: ${textColor('primary', { theme })};
          background: ${lighten(0.08, 'grey', { theme })};
        }
      `}
    >
      {children}
    </li>
  )
}

export default Item
