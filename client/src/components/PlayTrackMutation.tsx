import React, { FC, ReactNode } from 'react'
import gql from 'graphql-tag'
import { Mutation, MutationFn } from 'react-apollo'
import useSpotifyContext from '../hooks/useSpotifyContext'
import { PlayTrackMutation as PlayTrackMutationDef } from './types/PlayTrackMutation'
import { PlayTrackInput } from '../types/globalTypes'

interface Props {
  children(props: ChildrenProps): ReactNode
}

interface ChildrenProps {
  playTrack: (
    uri: string,
    options: { context?: string }
  ) => ReturnType<MutationFn<PlayTrackMutationDef, Variables>>
}

interface Variables {
  input: PlayTrackInput
}

class PlayTrackMutation extends Mutation<PlayTrackMutationDef, Variables> {}

const _PlayTrackMutation: FC<Props> = ({ children }) => {
  const { deviceId } = useSpotifyContext()

  return (
    <PlayTrackMutation
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
    </PlayTrackMutation>
  )
}

_PlayTrackMutation.displayName = 'PlayTrackMutation'

export default _PlayTrackMutation
