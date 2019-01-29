import React, { FC, ReactNode } from 'react'
import gql from 'graphql-tag'
import { Mutation, MutationFn } from 'react-apollo'
import useSpotifyContext from '../hooks/useSpotifyContext'
import {
  PlayTrackMutation as PlayTrackMutationType,
  PlayTrackMutationVariables
} from './types/PlayTrackMutation'

interface PlayTrackOptions {
  context?: string | null
}

interface ChildrenProps {
  playTrack(uri: string, options: PlayTrackOptions): ReturnType<MutationFn>
}

interface Props {
  children(props: ChildrenProps): ReactNode
}

class PTMutation extends Mutation<
  PlayTrackMutationType,
  PlayTrackMutationVariables
> {}

const PlayTrackMutation: FC<Props> = ({ children }) => {
  const { deviceId } = useSpotifyContext()

  return (
    <PTMutation
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
          playTrack: (uri: string, { context }: PlayTrackOptions = {}) =>
            mutation({
              variables: {
                input: { track: uri, deviceId, contextUri: context }
              }
            })
        })
      }
    </PTMutation>
  )
}

export default PlayTrackMutation
