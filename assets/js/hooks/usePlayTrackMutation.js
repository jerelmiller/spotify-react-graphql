import { useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import useSpotifyContext from './useSpotifyContext'

const usePlayTrackMutation = () => {
  const { deviceId } = useSpotifyContext()
  const [playTrack] = useMutation(gql`
    mutation PlayTrackMutation($input: PlayTrackInput!) {
      playTrack(input: $input) {
        success
      }
    }
  `)

  return useCallback(
    (uri, { context } = {}) =>
      playTrack({
        variables: { input: { track: uri, deviceId, contextUri: context } }
      }),
    [deviceId, playTrack]
  )
}

export default usePlayTrackMutation
