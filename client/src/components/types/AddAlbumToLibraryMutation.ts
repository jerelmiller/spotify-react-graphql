/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddAlbumToLibraryInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AddAlbumToLibraryMutation
// ====================================================

export interface AddAlbumToLibraryMutation_addAlbumToLibrary_album {
  __typename: "Album";
  id: string;
  /**
   * Whether or not the album is saved to the user's library
   */
  savedToLibrary: boolean | null;
}

export interface AddAlbumToLibraryMutation_addAlbumToLibrary {
  __typename: "AddAlbumToLibraryPayload";
  /**
   * Modified album after adding to the user's library
   */
  album: AddAlbumToLibraryMutation_addAlbumToLibrary_album | null;
}

export interface AddAlbumToLibraryMutation {
  /**
   * Add an album to a user's library
   */
  addAlbumToLibrary: AddAlbumToLibraryMutation_addAlbumToLibrary;
}

export interface AddAlbumToLibraryMutationVariables {
  input: AddAlbumToLibraryInput;
}
