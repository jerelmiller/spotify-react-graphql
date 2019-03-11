import React, { FC } from 'react'
import DropdownMenu, { Props as DropdownMenuProps } from './DropdownMenu'
import MoreIcon from './MoreIcon'
import { ComponentProps } from 'react'

interface OwnProps {}

type Props = OwnProps &
  Pick<DropdownMenuProps, 'align'> &
  Pick<ComponentProps<typeof MoreIcon>, 'size'>

type MoreMenuComponent = FC<Props> & {
  Item: typeof DropdownMenu.Item
}

const MoreMenu: MoreMenuComponent = ({ align, children, size }) => (
  <DropdownMenu
    align={align}
    trigger={({ toggle }) => (
      <MoreIcon onClick={toggle} size={size} color="white" cursor="pointer" />
    )}
  >
    {children}
  </DropdownMenu>
)

MoreMenu.Item = DropdownMenu.Item

export default MoreMenu
