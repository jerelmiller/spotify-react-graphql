import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import useSpotifyContext from 'hooks/useSpotifyContext'

const PlayTrackMutation = ({ children }) => {
  const { deviceId } = useSpotifyContext()

  return (
    <Mutation
      mutation={gql`
        mutation PlayTrackMutation($input: PlayTrackInput!) {
          playTrack(input: $input) {
            success
          }
        }
      `}
    >
      {mutation =>
        children({
          playTrack: uri =>
            mutation({ variables: { input: { track: uri, deviceId } } })
        })
      }
    </Mutation>
  )
}

export default PlayTrackMutation
