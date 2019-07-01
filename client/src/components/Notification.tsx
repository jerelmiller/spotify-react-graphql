import React, { ReactNode } from 'react'
import gql from 'graphql-tag'
import useTimeout from '../hooks/useTimeout'
import styled from '../styled'
import { FragmentComponent, GQLFragment } from '../types/shared'
import { Notification_notification } from './types/Notification_notification'
import { useMutation } from 'react-apollo-hooks'
import { RemoveNotificationInput } from '../types/globalTypes'
import { color } from '../styles/utils'
import posed from 'react-pose'
import css from '@emotion/css'
import CloseIcon from './CloseIcon'

interface Props {
  notification: Notification_notification
}

const useRemoveNotification = (id: RemoveNotificationInput['id']) =>
  useMutation(
    gql`
      mutation RemoveNotificationMutation($input: RemoveNotificationInput!) {
        removeNotification(input: $input) @client {
          notifications {
            id
          }
        }
      }
    `,
    { variables: { input: { id } } }
  )

interface ContainerProps {
  children: ReactNode
}

const Container = styled(
  posed.div({
    enter: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 210, damping: 25 }
    },
    exit: { y: '-100%', opacity: 0 }
  })
)<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem 1.5rem;
  color: ${color('white')};
  background: ${color('green')};
  z-index: 999;
`

const Notification: FragmentComponent<Props, { notification: GQLFragment }> = ({
  notification,
  ...props
}) => {
  const removeNotification = useRemoveNotification(notification.id)
  useTimeout(removeNotification, notification.timeout)

  return (
    <Container {...props}>
      <span
        css={css`
          flex: 1;
        `}
      >
        {notification.message}
      </span>
      <CloseIcon
        cursor="pointer"
        size="1.5rem"
        strokeWidth={1}
        onClick={() => removeNotification()}
      />
    </Container>
  )
}

Notification.fragments = {
  notification: gql`
    fragment Notification_notification on Notification {
      id @client
      message @client
      timeout @client
    }
  `
}

export default Notification
