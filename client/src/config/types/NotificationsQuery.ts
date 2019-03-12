/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NotificationsQuery
// ====================================================

export interface NotificationsQuery_notifications {
  __typename: "Notification";
  id: string;
  message: string;
  timeout: number;
}

export interface NotificationsQuery {
  notifications: NotificationsQuery_notifications[];
}
