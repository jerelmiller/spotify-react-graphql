import * as React from 'react'
import Avatar, { fragments as AvatarFragments } from './Avatar'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { UserAvatar_user } from './types/UserAvatar_user'

export interface Props {
  user: UserAvatar_user
}

const Container = styled.div`
  display: flex;
  align-items: center;

  img {
    margin-right: 0.5rem;
  }
`
const UserAvatar: React.SFC<Props> = ({ user }) => (
  <Container>
    <Avatar image={user.images[0]} />
    <span>{user.displayName}</span>
  </Container>
)

export const fragments = {
  user: gql`
    fragment UserAvatar_user on User {
      id
      displayName
      images {
        ...Avatar_image
      }
    }

    ${AvatarFragments.image}
  `
}

export default UserAvatar
