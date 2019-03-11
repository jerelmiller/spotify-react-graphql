import React, { FC } from 'react'
import DropdownMenu, { Props as DropdownMenuProps } from './DropdownMenu'
import MoreIcon from './MoreIcon'
import { ComponentProps } from 'react'

interface OwnProps {}

type Props = OwnProps &
  Pick<DropdownMenuProps, 'align'> &
  Pick<ComponentProps<typeof MoreIcon>, 'size'>

const MoreMenu: FC<Props> = ({ align, children, size }) => (
  <DropdownMenu
    align={align}
    trigger={({ toggle }) => (
      <MoreIcon onClick={toggle} size={size} color="white" cursor="pointer" />
    )}
  >
    {children}
  </DropdownMenu>
)

export default MoreMenu
