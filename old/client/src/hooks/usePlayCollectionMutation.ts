import useSpotifyContext from './useSpotifyContext'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const usePlayCollectionMutation = (uri: string) => {
  const { deviceId } = useSpotifyContext()

  const [playCollection] = useMutation(
    gql`
      mutation PlayCollectionMutation($input: PlayCollectionInput!) {
        playCollection(input: $input) {
          success
        }
      }
    `,
    { variables: { input: { collectionUri: uri, deviceId } } }
  )

  return playCollection
}

export default usePlayCollectionMutation
