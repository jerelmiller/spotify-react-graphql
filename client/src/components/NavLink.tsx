import React, { FC } from 'react'
import { Link } from '@reach/router'

interface Props {
  activeClassName?: string
  className?: string
  exact?: boolean
  // TODO: Figure out how to get this from LinkProps
  to: string
}

const NavLink: FC<Props> = ({ activeClassName, className, exact, ...rest }) => (
  <Link
    {...rest}
    getProps={({ isCurrent, isPartiallyCurrent }) => {
      const match = exact ? isCurrent : isPartiallyCurrent

      return {
        className: match ? `${className} ${activeClassName}` : className
      }
    }}
  />
)

NavLink.defaultProps = {
  activeClassName: 'active',
  exact: false
}

export default NavLink
