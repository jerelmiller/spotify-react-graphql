import React, { ReactNode, FC } from 'react'
import gql from 'graphql-tag'
import useSpotifyContext from '../hooks/useSpotifyContext'
import { Mutation, MutationFunction } from 'react-apollo'
import { ShuffleMutation } from './types/ShuffleMutation'
import { ShuffleInput } from '../types/globalTypes'

interface Props {
  children(props: ChildrenProps): JSX.Element | null
}

interface ChildrenProps {
  shuffle(
    state: boolean
  ): ReturnType<MutationFunction<ShuffleMutation, Variables>>
}

interface Variables {
  input: ShuffleInput
}

const Shuffle: FC<Props> = ({ children }) => {
  const { deviceId } = useSpotifyContext()

  return (
    <Mutation<ShuffleMutation, Variables>
      mutation={gql`
        mutation ShuffleMutation($input: ShuffleInput!) {
          shuffle(input: $input) {
            success
          }
        }
      `}
    >
      {mutation =>
        children({
          shuffle: state =>
            mutation({ variables: { input: { state, deviceId } } })
        })
      }
    </Mutation>
  )
}

export default Shuffle
