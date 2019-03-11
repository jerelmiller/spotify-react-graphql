/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PlayCollectionInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: PlayCollectionMutation
// ====================================================

export interface PlayCollectionMutation_playCollection {
  __typename: "PlayCollectionPayload";
  success: boolean | null;
}

export interface PlayCollectionMutation {
  /**
   * Play an album
   */
  playCollection: PlayCollectionMutation_playCollection | null;
}

export interface PlayCollectionMutationVariables {
  input: PlayCollectionInput;
}
