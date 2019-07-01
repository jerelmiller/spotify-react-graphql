import React from 'react'
import gql from 'graphql-tag'
import Notification from './Notification'
import { PoseGroup } from 'react-pose'
import { Query } from '@apollo/react-components'
import { NotificationsQuery } from '../config/types/NotificationsQuery'

const Notifications = () => (
  <Query<NotificationsQuery>
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
  </Query>
)

export default Notifications
