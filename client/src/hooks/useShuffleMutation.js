import { useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import useSpotifyContext from './useSpotifyContext'

const useShuffleMutation = () => {
  const { deviceId } = useSpotifyContext()
  const [shuffle] = useMutation(gql`
    mutation ShuffleMutation($input: ShuffleInput!) {
      shuffle(input: $input) {
        success
      }
    }
  `)

  return useCallback(
    state => shuffle({ variables: { input: { state, deviceId } } }),
    [shuffle, deviceId]
  )
}

export default useShuffleMutation
