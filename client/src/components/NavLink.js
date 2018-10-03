import React from 'react'
import { Link } from '@reach/router'

const NavLink = ({ activeClassName, className, ...rest }) => (
  <Link
    {...rest}
    getProps={({ isCurrent }) => ({
      className: isCurrent ? `${className} ${activeClassName}` : className
    })}
  />
)

NavLink.defaultProps = {
  activeClassName: 'active'
}

export default NavLink
