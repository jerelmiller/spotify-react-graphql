/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PlaylistTile_playlist
// ====================================================

export interface PlaylistTile_playlist_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface PlaylistTile_playlist {
  __typename: "Playlist";
  id: string;
  name: string;
  images: PlaylistTile_playlist_images[];
}
