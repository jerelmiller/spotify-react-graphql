import React, { FC } from 'react'
import gql from 'graphql-tag'
import { Mutation, MutationFunction } from 'react-apollo'
import useSpotifyContext from '../hooks/useSpotifyContext'
import { PlayCollectionInput } from '../types/globalTypes'
import { PlayCollectionMutation } from './types/PlayCollectionMutation'

interface Props {
  children(props: ChildrenProps): JSX.Element | null
}

interface ChildrenProps {
  playCollection: (
    uri: string
  ) => ReturnType<MutationFunction<PlayCollectionMutation, Variables>>
}

interface Variables {
  input: PlayCollectionInput
}

const PlayCollection: FC<Props> = ({ children }) => {
  const { deviceId } = useSpotifyContext()

  return (
    <Mutation<PlayCollectionMutation, Variables>
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
    </Mutation>
  )
}

export default PlayCollection
