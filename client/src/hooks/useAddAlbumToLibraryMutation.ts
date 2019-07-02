import { useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const useAddAlbumToLibraryMutation = () => {
  const [addAlbumToLibary] = useMutation(gql`
    mutation AddAlbumToLibraryMutation($input: AddAlbumToLibraryInput!) {
      addAlbumToLibrary(input: $input) {
        album {
          id
          savedToLibrary
        }
      }
    }
  `)

  return useCallback(
    albumId => addAlbumToLibary({ variables: { input: { albumId } } }),
    [addAlbumToLibary]
  )
}

export default useAddAlbumToLibraryMutation
