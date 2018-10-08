import React from 'react'
import gql from 'graphql-tag'
import UserAvatar from './UserAvatar'
import NavLink from './NavLink'
import styled from 'styled-components'

const Sidebar = styled.aside`
  grid-area: sidebar;
  background: #121212;
  color: #fff;
`

const Section = styled.section`
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`

const Title = styled.h6`
  text-transform: uppercase;
`

const NavSection = ({ children, title }) => (
  <Section>
    {title && <Title>{title}</Title>}
    <nav>
      <ul>{children}</ul>
    </nav>
  </Section>
)

const SidebarLink = styled(NavLink)`
  font-size: 0.85rem;
  color: #666;

  &:hover,
  &.active {
    color: #fff;
  }
`

const Link = ({ children, to }) => (
  <li>
    <SidebarLink to={to}>{children}</SidebarLink>
  </li>
)

const AppSidebar = ({ loading, viewer }) => (
  <Sidebar>
    {loading || (
      <>
        <UserAvatar user={viewer.user} />
        <NavSection>
          <Link to="browse">Browse</Link>
        </NavSection>
        <NavSection title="Your Library">
          <Link to="collections/songs">Songs</Link>
          <Link to="collections/albums">Albums</Link>
          <Link to="collections/artists">Artists</Link>
        </NavSection>
      </>
    )}
  </Sidebar>
)

AppSidebar.fragments = {
  viewer: gql`
    fragment AppSidebar_viewer on Viewer {
      user {
        id
        ...UserAvatar_user
      }
    }

    ${UserAvatar.fragments.user}
  `
}

export default AppSidebar
