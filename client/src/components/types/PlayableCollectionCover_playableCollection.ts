/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PlayableCollectionCover_playableCollection
// ====================================================

export interface PlayableCollectionCover_playableCollection_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface PlayableCollectionCover_playableCollection {
  __typename: "Artist" | "Album" | "Playlist";
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * of the playable collection.
   */
  uri: string | null;
  /**
   * Images associated with the playable collection
   */
  images: PlayableCollectionCover_playableCollection_images[];
}
