/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { RemoveAlbumFromLibraryInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: RemoveAlbumFromLibraryMutation
// ====================================================

export interface RemoveAlbumFromLibraryMutation_removeAlbumFromLibrary_album {
  __typename: "Album";
  id: string;
  /**
   * Whether or not the album is saved to the user's library
   */
  savedToLibrary: boolean | null;
}

export interface RemoveAlbumFromLibraryMutation_removeAlbumFromLibrary {
  __typename: "RemoveAlbumFromLibraryPayload";
  /**
   * Modified album after removing from the user's library
   */
  album: RemoveAlbumFromLibraryMutation_removeAlbumFromLibrary_album | null;
}

export interface RemoveAlbumFromLibraryMutation {
  /**
   * Remove an album from a user's library
   */
  removeAlbumFromLibrary: RemoveAlbumFromLibraryMutation_removeAlbumFromLibrary;
}

export interface RemoveAlbumFromLibraryMutationVariables {
  input: RemoveAlbumFromLibraryInput;
}
