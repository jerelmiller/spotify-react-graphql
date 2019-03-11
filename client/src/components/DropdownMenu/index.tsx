import React, { ReactNode, FC } from 'react'
import { css } from '../../styled'
import Menu, { Props as MenuProps } from './Menu'
import useToggle from '../../hooks/useToggle'

interface OwnProps {
  trigger(props: TriggerProps): ReactNode
}

export type Props = OwnProps & Pick<MenuProps, 'align'>

interface TriggerProps {
  toggle(): void
}

const DropdownMenu: FC<Props> = ({ align, children, trigger }) => {
  const { on: open, toggle } = useToggle()

  return (
    <div
      css={css`
        position: relative;
      `}
    >
      {trigger({ toggle })}
      <Menu align={align} open={open}>
        {children}
      </Menu>
    </div>
  )
}

export default DropdownMenu
