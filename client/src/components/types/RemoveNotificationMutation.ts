/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { RemoveNotificationInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: RemoveNotificationMutation
// ====================================================

export interface RemoveNotificationMutation_removeNotification_notifications {
  __typename: "Notification";
  id: string;
}

export interface RemoveNotificationMutation_removeNotification {
  __typename: "RemoveNotificationPayload";
  notifications: RemoveNotificationMutation_removeNotification_notifications[];
}

export interface RemoveNotificationMutation {
  removeNotification: RemoveNotificationMutation_removeNotification;
}

export interface RemoveNotificationMutationVariables {
  input: RemoveNotificationInput;
}
