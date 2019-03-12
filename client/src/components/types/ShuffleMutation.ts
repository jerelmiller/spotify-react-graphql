/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ShuffleInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ShuffleMutation
// ====================================================

export interface ShuffleMutation_shuffle {
  __typename: "ShufflePayload";
  success: boolean;
}

export interface ShuffleMutation {
  /**
   * Toggle shuffle for a users's playback
   */
  shuffle: ShuffleMutation_shuffle | null;
}

export interface ShuffleMutationVariables {
  input: ShuffleInput;
}
