import React, { ReactNode, FC, useRef, useCallback } from 'react'
import { css } from '../../styled'
import Menu, { Props as MenuProps } from './Menu'
import useToggle from '../../hooks/useToggle'
import useOuterClick from '../../hooks/useOuterClick'
import Item from './Item'
import Context from './Context'
import { PoseGroup } from 'react-pose'

interface OwnProps {
  trigger(props: TriggerProps): ReactNode
}

export type Props = OwnProps & Pick<MenuProps, 'align'>

interface TriggerProps {
  toggle: ReturnType<typeof useToggle>['toggle']
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
      <PoseGroup>
        {open && (
          <Menu key="menu" align={align}>
            <Context.Provider value={{ close }}>{children}</Context.Provider>
          </Menu>
        )}
      </PoseGroup>
    </div>
  )
}

DropdownMenu.Item = Item

export default DropdownMenu
