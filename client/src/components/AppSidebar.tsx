import React, { FC } from 'react'
import gql from 'graphql-tag'
import UserAvatar from './UserAvatar'
import NavLink from './NavLink'
import UnstyledList from './UnstyledList'
import styled from 'styled-components'
import { color } from '../styles/utils'
import { rgba } from 'polished'
import { FragmentComponent, GQLFragment } from '../types/shared'
import { AppSidebar_viewer } from './types/AppSidebar_viewer'

const Sidebar = styled.aside`
  grid-area: sidebar;
  background: ${rgba('#121212', 0.5)};
  color: #fff;
  overflow: auto;
  padding: 1rem 0;
`

const Section = styled.section`
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`

const Title = styled.h5`
  text-transform: uppercase;
  padding: 0 2rem;
  font-weight: 300;
  margin: 0;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
  border-left: 0.375rem transparent;
`

interface NavSectionProps {
  title?: string
}

const NavSection: FC<NavSectionProps> = ({ children, title }) => (
  <Section>
    {title && <Title>{title}</Title>}
    <nav>
      <UnstyledList>{children}</UnstyledList>
    </nav>
  </Section>
)

const SidebarLink = styled(NavLink)`
  display: block;
  font-size: 0.95rem;
  color: #858585;
  padding: 0 1.5rem;
  transition: color 0.15s ease-in-out, border-left 0.3s ease-in-out;
  border-left: 0.375rem solid transparent;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:not(:last-child) {
    margin-bottom: 0.25rem;
  }

  &:hover,
  &.active {
    color: #fff;
  }

  &.active {
    border-left-color: ${color('green')};
  }
`

const Li = styled.li`
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`

interface LinkProps {
  to: string
}

const Link: FC<LinkProps> = ({ children, to }) => (
  <Li>
    <SidebarLink to={to}>{children}</SidebarLink>
  </Li>
)

const AvatarContainer = styled.div`
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
  border-left: 0.375rem solid transparent;
`

interface Props {
  loading: boolean
  viewer: AppSidebar_viewer
}

const AppSidebar: FragmentComponent<Props, { viewer: GQLFragment }> = ({
  loading,
  viewer
}) => (
  <Sidebar>
    <AvatarContainer>
      {viewer.user && <UserAvatar user={viewer.user} />}
    </AvatarContainer>
    <NavSection>
      <Link to="browse">Browse</Link>
    </NavSection>
    <NavSection title="Your Library">
      <Link to="collection/tracks">Songs</Link>
      <Link to="collection/albums">Albums</Link>
      <Link to="collection/artists">Artists</Link>
    </NavSection>
    <NavSection title="Playlists">
      {loading ||
        (viewer.playlists &&
          viewer.playlists.edges.map(({ node }) => (
            <Link key={node.id} to={`/playlists/${node.id}`}>
              {node.name}
            </Link>
          )))}
    </NavSection>
  </Sidebar>
)

AppSidebar.fragments = {
  viewer: gql`
    fragment AppSidebar_viewer on Viewer {
      user {
        id
        ...UserAvatar_user
      }

      playlists {
        edges {
          node {
            id
            name
          }
        }
      }
    }

    ${UserAvatar.fragments!.user}
  `
}

export default AppSidebar