/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PlayAlbumInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: PlayAlbumMutation
// ====================================================

export interface PlayAlbumMutation_playAlbum {
  __typename: "PlayAlbumPayload";
  success: boolean | null;
}

export interface PlayAlbumMutation {
  /**
   * Play an album
   */
  playAlbum: PlayAlbumMutation_playAlbum | null;
}

export interface PlayAlbumMutationVariables {
  input: PlayAlbumInput;
}
