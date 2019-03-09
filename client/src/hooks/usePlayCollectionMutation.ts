import useSpotifyContext from './useSpotifyContext'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'

const usePlayCollectionMutation = (uri: string) => {
  const { deviceId } = useSpotifyContext()

  return useMutation(
    gql`
      mutation PlayCollectionMutation($input: PlayCollectionInput!) {
        playCollection(input: $input) {
          success
        }
      }
    `,
    { variables: { input: { collectionUri: uri, deviceId } } }
  )
}

export default usePlayCollectionMutation
