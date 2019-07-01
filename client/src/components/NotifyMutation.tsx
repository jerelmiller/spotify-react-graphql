import React, { FC } from 'react'
import { Mutation, MutationFunction } from 'react-apollo'
import gql from 'graphql-tag'
import { NotifyMutation } from './types/NotifyMutation'
import { NotifyInput } from '../types/globalTypes'

interface Props {
  children(props: ChildrenProps): JSX.Element | null
}

interface ChildrenProps {
  notify(
    notification: NotifyInput
  ): ReturnType<MutationFunction<NotifyMutation, Variables>>
}

interface Variables {}

const Notify: FC<Props> = ({ children }) => (
  <Mutation<NotifyMutation, Variables>
    mutation={gql`
      mutation NotifyMutation($input: NotifyInput!) {
        notify(input: $input) @client {
          id
        }
      }
    `}
  >
    {mutation =>
      children({
        notify: notification => mutation({ variables: { input: notification } })
      })
    }
  </Mutation>
)

export default Notify
