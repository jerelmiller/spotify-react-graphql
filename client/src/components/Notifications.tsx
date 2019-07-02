import React from 'react'
import gql from 'graphql-tag'
import Notification from './Notification'
import { PoseGroup } from 'react-pose'
import { NotificationsQuery } from '../config/types/NotificationsQuery'
import { useQuery } from '@apollo/react-hooks'

const Notifications = () => {
  const { loading, data } = useQuery<NotificationsQuery>(gql`
    query NotificationsQuery {
      notifications @client {
        id
        ...Notification_notification
      }
    }

    ${Notification.fragments!.notification}
  `)

  if (loading || !data) {
    return null
  }

  return (
    <PoseGroup>
      {data.notifications.map(notification => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </PoseGroup>
  )
}

export default Notifications
