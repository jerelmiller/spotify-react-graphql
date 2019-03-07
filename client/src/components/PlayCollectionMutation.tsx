import React, { FC, ReactNode } from 'react'
import gql from 'graphql-tag'
import { Mutation, MutationFn } from 'react-apollo'
import useSpotifyContext from '../hooks/useSpotifyContext'
import { PlayCollectionInput } from '../types/globalTypes'
import { PlayCollectionMutation as PlayCollectionMutationDef } from './types/PlayCollectionMutation'

interface Props {
  children(props: ChildrenProps): ReactNode
}

interface ChildrenProps {
  playCollection: (
    uri: string
  ) => ReturnType<MutationFn<PlayCollectionMutationDef, Variables>>
}

interface Variables {
  input: PlayCollectionInput
}

class _PlayCollectionMutation extends Mutation<
  PlayCollectionMutationDef,
  Variables
> {}

const PlayCollectionMutation: FC<Props> = ({ children }) => {
  const { deviceId } = useSpotifyContext()

  return (
    <_PlayCollectionMutation
      mutation={gql`
        mutation PlayCollectionMutation($input: PlayCollectionInput!) {
          playCollection(input: $input) {
            success
          }
        }
      `}
    >
      {mutation =>
        children({
          playCollection: uri =>
            mutation({
              variables: {
                input: { collectionUri: uri, deviceId }
              }
            })
        })
      }
    </_PlayCollectionMutation>
  )
}

export default PlayCollectionMutation
