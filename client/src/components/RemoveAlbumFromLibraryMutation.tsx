import React, { ReactNode, FC } from 'react'
import gql from 'graphql-tag'
import { Mutation, MutationFn } from 'react-apollo'
import { RemoveAlbumFromLibraryMutation as RemoveAlbumFromLibraryMutationDef } from './types/RemoveAlbumFromLibraryMutation'
import { RemoveAlbumFromLibraryInput } from '../types/globalTypes'

class RemoveAlbumFromLibraryMutation extends Mutation<
  RemoveAlbumFromLibraryMutationDef,
  Variables
> {}

interface Props {
  children(props: ChildrenProps): ReactNode
}

interface ChildrenProps {
  removeAlbumFromLibrary(
    albumId: RemoveAlbumFromLibraryInput['albumId']
  ): ReturnType<MutationFn<RemoveAlbumFromLibraryMutationDef, Variables>>
}

interface Variables {
  input: RemoveAlbumFromLibraryInput
}

const RemoveAlbumFromLibrary: FC<Props> = ({ children }) => {
  return (
    <RemoveAlbumFromLibraryMutation
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
            mutation({ variables: { input: { albumId } } })
        })
      }
    </RemoveAlbumFromLibraryMutation>
  )
}

export default RemoveAlbumFromLibrary
