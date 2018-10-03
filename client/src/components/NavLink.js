import React from 'react'
import { Link } from '@reach/router'

const NavLink = ({ activeClassName, className, exact, ...rest }) => (
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
