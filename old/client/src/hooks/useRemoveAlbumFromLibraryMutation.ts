import { useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const useRemoveAlbumFromLibraryMutation = () => {
  const [removeAlbumFromLibrary] = useMutation(gql`
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
  `)

  return useCallback(
    albumId => removeAlbumFromLibrary({ variables: { input: { albumId } } }),
    [removeAlbumFromLibrary]
  )
}

export default useRemoveAlbumFromLibraryMutation
