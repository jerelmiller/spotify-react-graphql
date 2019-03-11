import React from 'react'
import Avatar from './Avatar'
import gql from 'graphql-tag'
import styled, { css } from '../styled'
import { UserAvatar_user } from './types/UserAvatar_user'
import { FragmentComponent, GQLFragment } from '../types/shared'

interface Props {
  user: UserAvatar_user
}

const Container = styled.div`
  display: flex;
  align-items: center;
`
const UserAvatar: FragmentComponent<Props, { user: GQLFragment }> = ({
  user
}) => (
  <Container>
    <Avatar image={user.images[0]} />
    <span
      css={css`
        margin-left: 0.5rem;
      `}
    >
      {user.displayName}
    </span>
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

    ${Avatar.fragments!.image}
  `
}

export default UserAvatar
