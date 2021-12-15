import React from 'react'
import NavLink from 'components/NavLink'
import styled from 'styled-components'
import { color } from 'styles/utils'
import { css } from '@emotion/core'

const Link = styled(NavLink)`
  display: block;
  color: rgba(255, 255, 255, 0.6);
  padding: 1rem 1.5rem;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 0.8rem;
  letter-spacing: 1px;
  transition: color 0.3s ease-in-out;
  position: relative;

  &.active,
  &:hover {
    color: #fff;
  }

  &::after,
  .active::after {
    content: '';
    background: ${color('green')};
    position: absolute;
    width: 30px;
    top: 80%;
    left: 50%;
  }

  &::after {
    opacity: 0;
    transform: translateX(-50%) scaleX(0);
    transition: transform 0.2s ease-out, opacity 0.3s ease-out;
  }

  &.active::after {
    content: '';
    opacity: 1;
    height: 2px;
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translateX(-50%) scaleX(1);
  }
`

const NavItem = props => (
  <li>
    <Link {...props} />
  </li>
)
const TabNav = ({ className, children }) => (
  <nav className={className}>
    <ul
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        list-style: none;
        text-align: center;
        margin: 0;
        padding: 0;
      `}
    >
      {children}
    </ul>
  </nav>
)

TabNav.NavItem = NavItem

export default TabNav
