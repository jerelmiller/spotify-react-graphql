import React from 'react'
import gql from 'graphql-tag'
import UserAvatar from './UserAvatar'
import styled from 'styled-components'

const Sidebar = styled.aside`
  grid-area: sidebar;
  background: #121212;
  color: #fff;
  padding: 1rem;
`

const AppSidebar = ({ loading, viewer }) => (
  <Sidebar>
    {loading || (
      <>
        <UserAvatar user={viewer.user} />
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
