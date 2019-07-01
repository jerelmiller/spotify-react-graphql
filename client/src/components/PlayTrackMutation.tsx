import React, { FC } from 'react'
import gql from 'graphql-tag'
import { Mutation, MutationFunction } from 'react-apollo'
import useSpotifyContext from '../hooks/useSpotifyContext'
import { PlayTrackMutation } from './types/PlayTrackMutation'
import { PlayTrackInput } from '../types/globalTypes'

interface Props {
  children(props: ChildrenProps): JSX.Element | null
}

interface ChildrenProps {
  playTrack: (
    uri: string,
    options: { context?: string }
  ) => ReturnType<MutationFunction<PlayTrackMutation, Variables>>
}

interface Variables {
  input: PlayTrackInput
}

const _PlayTrackMutation: FC<Props> = ({ children }) => {
  const { deviceId } = useSpotifyContext()

  return (
    <Mutation<PlayTrackMutation, Variables>
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
          playTrack: (uri, { context } = {}) =>
            mutation({
              variables: {
                input: { track: uri, deviceId, contextUri: context }
              }
            })
        })
      }
    </Mutation>
  )
}

_PlayTrackMutation.displayName = 'PlayTrackMutation'

export default _PlayTrackMutation
