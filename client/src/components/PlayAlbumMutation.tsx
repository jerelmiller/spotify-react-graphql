import React, { FC, ReactNode } from 'react'
import gql from 'graphql-tag'
import { Mutation, MutationFn } from 'react-apollo'
import useSpotifyContext from '../hooks/useSpotifyContext'
import { PlayAlbumInput } from '../types/globalTypes'
import { PlayAlbumMutation as PlayAlbumMutationDef } from './types/PlayAlbumMutation'

interface Props {
  children(props: ChildrenProps): ReactNode
}

interface ChildrenProps {
  playTrack: (
    uri: string
  ) => ReturnType<MutationFn<PlayAlbumMutationDef, Variables>>
}

interface Variables {
  input: PlayAlbumInput
}

class _PlayAlbumMutation extends Mutation<PlayAlbumMutationDef, Variables> {}

const PlayAlbumMutation: FC<Props> = ({ children }) => {
  const { deviceId } = useSpotifyContext()

  return (
    <_PlayAlbumMutation
      mutation={gql`
        mutation PlayAlbumMutation($input: PlayAlbumInput!) {
          playAlbum(input: $input) {
            success
          }
        }
      `}
    >
      {mutation =>
        children({
          playTrack: uri =>
            mutation({
              variables: {
                input: { album: uri, deviceId }
              }
            })
        })
      }
    </_PlayAlbumMutation>
  )
}

export default PlayAlbumMutation
