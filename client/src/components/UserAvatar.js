import React from 'react'
import Avatar from './Avatar'
import gql from 'graphql-tag'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;

  img {
    margin-right: 0.5rem;
  }
`
const UserAvatar = ({ user }) => (
  <Container>
    <Avatar image={user.images[0]} />
    <span>{user.displayName}</span>
  </Container>
)

UserAvatar.fragments = {
  user: gql`
    fragment UserAvatar_user on User {
      id
      displayName
      images {
        ...Avatar_image
      }
    }

    ${Avatar.fragments.image}
  `
}

export default UserAvatar
