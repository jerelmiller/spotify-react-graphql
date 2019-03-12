import React from 'react'
import gql from 'graphql-tag'
import { FragmentComponent, GQLFragment } from '../types/shared'
import { Notification_notification } from './types/Notification_notification'

interface Props {
  notification: Notification_notification
}

const Notification: FragmentComponent<Props, { notification: GQLFragment }> = ({
  notification
}) => <div>{notification.message}</div>

Notification.fragments = {
  notification: gql`
    fragment Notification_notification on Notification {
      id
      message
      timeout
    }
  `
}

export default Notification
