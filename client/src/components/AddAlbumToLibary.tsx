import React, { FC } from 'react'
import gql from 'graphql-tag'
import { Mutation, MutationFunction } from 'react-apollo'
import { AddAlbumToLibraryMutation } from './types/AddAlbumToLibraryMutation'
import { AddAlbumToLibraryInput } from '../types/globalTypes'

interface Props {
  children(props: ChildrenProps): JSX.Element | null
}

interface ChildrenProps {
  addAlbumToLibrary(
    albumId: AddAlbumToLibraryInput['albumId']
  ): ReturnType<MutationFunction<AddAlbumToLibraryMutation, Variables>>
}

interface Variables {
  input: AddAlbumToLibraryInput
}

const AddAlbumToLibrary: FC<Props> = ({ children }) => {
  return (
    <Mutation<AddAlbumToLibraryMutation, Variables>
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
          addAlbumToLibrary: (albumId: AddAlbumToLibraryInput['albumId']) =>
            mutation({
              variables: { input: { albumId } }
            })
        })
      }
    </Mutation>
  )
}

export default AddAlbumToLibrary
