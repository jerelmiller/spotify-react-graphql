import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const PlayTrackMutation = ({ children }) => (
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
        playTrack: uri => mutation({ variables: { input: { track: uri } } })
      })
    }
  </Mutation>
)

export default PlayTrackMutation
