import React, { FC, ReactNode } from 'react'
import { Mutation, MutationFn } from 'react-apollo'
import gql from 'graphql-tag'
import {
  NotifyMutation as NotifyMutationDef,
  NotifyMutation_notify
} from './types/NotifyMutation'
import { NotifyInput } from '../types/globalTypes'

class NotifyMutation extends Mutation<NotifyMutationDef, Variables> {}

interface Props {
  children(props: ChildrenProps): ReactNode
}

interface ChildrenProps {
  notify(
    notification: NotifyInput
  ): ReturnType<MutationFn<NotifyMutationDef, Variables>>
}

interface Variables {}

const Notify: FC<Props> = ({ children }) => (
  <NotifyMutation
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
  </NotifyMutation>
)

export default Notify
