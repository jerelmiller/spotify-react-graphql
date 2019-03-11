import React, { ReactNode, FC, useRef, useCallback } from 'react'
import { css } from '../../styled'
import Menu, { Props as MenuProps } from './Menu'
import useToggle from '../../hooks/useToggle'
import useOuterClick from '../../hooks/useOuterClick'
import Item from './Item'

interface OwnProps {
  trigger(props: TriggerProps): ReactNode
}

export type Props = OwnProps & Pick<MenuProps, 'align'>

interface TriggerProps {
  toggle(): void
}

type DropdownMenuComponent = FC<Props> & {
  Item: typeof Item
}

const DropdownMenu: DropdownMenuComponent = ({ align, children, trigger }) => {
  const ref = useRef(null)
  const { on: open, toggle, disable: close } = useToggle()
  useOuterClick(ref, close)

  return (
    <div
      css={css`
        position: relative;
      `}
      onDoubleClick={e => e.stopPropagation()}
      ref={ref}
    >
      {trigger({ toggle })}
      <Menu align={align} open={open}>
        {children}
      </Menu>
    </div>
  )
}

DropdownMenu.Item = Item

export default DropdownMenu
