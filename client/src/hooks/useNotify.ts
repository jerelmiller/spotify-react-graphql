import { useCallback } from 'react'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'

const useNotify = () => {
  const notify = useMutation(gql`
    mutation NotifyMutation($input: NotifyInput!) {
      notify(input: $input) @client {
        id
      }
    }
  `)

  return useCallback(
    notification => notify({ variables: { input: notification } }),
    [notify]
  )
}

export default useNotify
