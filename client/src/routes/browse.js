import React from 'react'
import NavLink from 'components/NavLink'
import styled from 'styled-components'

const Header = styled.header``

const NavContainer = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  text-align: center;
  margin: 0;
  padding: 0;
`

const Link = styled(NavLink)`
  display: block;
  color: rgba(255, 255, 255, 0.6);
  padding: 1rem 1.5rem;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 0.8rem;
  letter-spacing: 1px;
  transition: color 0.3s ease-in-out;

  &.active,
  &:hover {
    color: #fff;
  }
`

const NavItem = ({ children, to }) => (
  <li>
    <Link to={to}>{children}</Link>
  </li>
)

const RouteBrowse = ({ children }) => (
  <>
    <Header>
      <nav>
        <NavContainer>
          <NavItem to="featured">Featured</NavItem>
          <NavItem to="podcasts">Podcasts</NavItem>
          <NavItem to="charts">Charts</NavItem>
          <NavItem to="genres">Genres &amp; Moods</NavItem>
          <NavItem to="new-releases">New Releases</NavItem>
          <NavItem to="discover">Discover</NavItem>
        </NavContainer>
      </nav>
    </Header>
    {children}
  </>
)

export default RouteBrowse
