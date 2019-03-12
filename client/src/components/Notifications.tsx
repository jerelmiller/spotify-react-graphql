import React from 'react'
import gql from 'graphql-tag'
import Notification from './Notification'
import { PoseGroup } from 'react-pose'
import { Query } from 'react-apollo'
import { NotificationsQuery as NotificationsQueryDef } from '../config/types/NotificationsQuery'

class NotificationsQuery extends Query<NotificationsQueryDef> {}

const Notifications = () => (
  <NotificationsQuery
    query={gql`
      query NotificationsQuery {
        notifications @client {
          id
          ...Notification_notification
        }
      }

      ${Notification.fragments!.notification}
    `}
  >
    {({ loading, data }) => {
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
    }}
  </NotificationsQuery>
)

export default Notifications
