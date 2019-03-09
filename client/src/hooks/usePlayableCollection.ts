import useSpotifyContext from './useSpotifyContext'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'

const usePlayableCollection = (uri: string) => {
  const { contextUri, play, pause, playing, deviceId } = useSpotifyContext()
  const isCurrentContext = contextUri === uri
  const playCollection = useMutation(
    gql`
      mutation PlayCollectionMutation($input: PlayCollectionInput!) {
        playCollection(input: $input) {
          success
        }
      }
    `,
    { variables: { input: { collectionUri: uri, deviceId } } }
  )

  let action

  if (isCurrentContext) {
    action = playing ? pause : play
  } else {
    action = playCollection
  }

  return { playing: isCurrentContext && playing, perform: action }
}

export default usePlayableCollection
