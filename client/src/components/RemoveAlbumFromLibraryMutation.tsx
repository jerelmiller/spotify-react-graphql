import React, { FC } from 'react'
import gql from 'graphql-tag'
import { Mutation, MutationFunction } from 'react-apollo'
import { RemoveAlbumFromLibraryMutation } from './types/RemoveAlbumFromLibraryMutation'
import { RemoveAlbumFromLibraryInput } from '../types/globalTypes'

interface Props {
  children(props: ChildrenProps): JSX.Element | null
}

interface ChildrenProps {
  removeAlbumFromLibrary(
    albumId: RemoveAlbumFromLibraryInput['albumId']
  ): ReturnType<MutationFunction<RemoveAlbumFromLibraryMutation, Variables>>
}

interface Variables {
  input: RemoveAlbumFromLibraryInput
}

const RemoveAlbumFromLibrary: FC<Props> = ({ children }) => {
  return (
    <Mutation<RemoveAlbumFromLibraryMutation, Variables>
      mutation={gql`
        mutation RemoveAlbumFromLibraryMutation(
          $input: RemoveAlbumFromLibraryInput!
        ) {
          removeAlbumFromLibrary(input: $input) {
            album {
              id
              savedToLibrary
            }
          }
        }
      `}
    >
      {mutation =>
        children({
          removeAlbumFromLibrary: albumId =>
            mutation({
              variables: { input: { albumId } }
            })
        })
      }
    </Mutation>
  )
}

export default RemoveAlbumFromLibrary
