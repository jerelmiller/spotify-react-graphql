/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { NotifyInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: NotifyMutation
// ====================================================

export interface NotifyMutation_notify {
  __typename: "NotifyPayload";
  id: string;
}

export interface NotifyMutation {
  notify: NotifyMutation_notify;
}

export interface NotifyMutationVariables {
  input: NotifyInput;
}
