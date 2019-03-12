import React, { ReactNode, FC } from 'react'
import gql from 'graphql-tag'
import { Mutation, MutationFn } from 'react-apollo'
import { AddAlbumToLibraryMutation as AddAlbumToLibraryMutationDef } from './types/AddAlbumToLibraryMutation'
import { AddAlbumToLibraryInput } from '../types/globalTypes'

class AddAlbumToLibraryMutation extends Mutation<
  AddAlbumToLibraryMutationDef,
  Variables
> {}

interface Props {
  children(props: ChildrenProps): ReactNode
}

interface ChildrenProps {
  addAlbumToLibrary(
    albumId: AddAlbumToLibraryInput['albumId']
  ): ReturnType<MutationFn<AddAlbumToLibraryMutationDef, Variables>>
}

interface Variables {
  input: AddAlbumToLibraryInput
}

const AddAlbumToLibrary: FC<Props> = ({ children }) => {
  return (
    <AddAlbumToLibraryMutation
      mutation={gql`
        mutation AddAlbumToLibraryMutation($input: AddAlbumToLibraryInput!) {
          addAlbumToLibrary(input: $input) {
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
          addAlbumToLibrary: albumId =>
            mutation({
              variables: { input: { albumId } }
            })
        })
      }
    </AddAlbumToLibraryMutation>
  )
}

export default AddAlbumToLibrary
