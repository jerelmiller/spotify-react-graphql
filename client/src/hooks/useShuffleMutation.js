import { useMemo } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import useSpotifyContext from './useSpotifyContext'

const useShuffleMutation = () => {
  const { deviceId } = useSpotifyContext()
  const [mutation] = useMutation(gql`
    mutation ShuffleMutation($input: ShuffleInput!) {
      shuffle(input: $input) {
        success
      }
    }
  `)

  return useMemo(
    () => ({
      shuffle: state => mutation({ variables: { input: { state, deviceId } } })
    }),
    [mutation, deviceId]
  )
}

export default useShuffleMutation
