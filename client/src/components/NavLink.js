import React from 'react'
import { Link } from '@reach/router'
import usePartialMatch from 'hooks/usePartialMatch'

const NavLink = ({ activeClassName, className, exact, to, ...rest }) => {
  const match = usePartialMatch(to)

  return (
    <Link
      {...rest}
      to={to}
      className={match ? `${className} ${activeClassName}` : className}
    />
  )
}

NavLink.defaultProps = {
  activeClassName: 'active',
  exact: false
}

export default NavLink
