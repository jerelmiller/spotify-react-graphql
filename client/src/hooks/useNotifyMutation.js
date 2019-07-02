import { useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const useNotifyMutation = () => {
  const [notify] = useMutation(gql`
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

export default useNotifyMutation
