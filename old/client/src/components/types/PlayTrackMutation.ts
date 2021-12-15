/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PlayTrackInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: PlayTrackMutation
// ====================================================

export interface PlayTrackMutation_playTrack {
  __typename: "PlayTrackPayload";
  success: boolean | null;
}

export interface PlayTrackMutation {
  /**
   * Play a track or set of tracks
   */
  playTrack: PlayTrackMutation_playTrack | null;
}

export interface PlayTrackMutationVariables {
  input: PlayTrackInput;
}
