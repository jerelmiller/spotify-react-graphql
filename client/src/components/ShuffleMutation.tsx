import React, { ReactNode, FC } from 'react'
import gql from 'graphql-tag'
import useSpotifyContext from '../hooks/useSpotifyContext'
import { Mutation, MutationFn } from 'react-apollo'
import { ShuffleMutation as ShuffleMutationDef } from './types/ShuffleMutation'
import { ShuffleInput } from '../types/globalTypes'

class ShuffleMutation extends Mutation<ShuffleMutationDef, Variables> {}

interface Props {
  children(props: ChildrenProps): ReactNode
}

interface ChildrenProps {
  shuffle(state: boolean): ReturnType<MutationFn<ShuffleMutationDef, Variables>>
}

interface Variables {
  input: ShuffleInput
}

const Shuffle: FC<Props> = ({ children }) => {
  const { deviceId } = useSpotifyContext()

  return (
    <ShuffleMutation
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
    </ShuffleMutation>
  )
}

export default Shuffle
