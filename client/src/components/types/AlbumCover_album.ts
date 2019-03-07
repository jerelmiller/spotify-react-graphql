/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AlbumCover_album
// ====================================================

export interface AlbumCover_album_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface AlbumCover_album {
  __typename: "Album";
  id: string;
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the album.
   */
  uri: string | null;
  /**
   * The cover art for the album in various sizes, widest first.
   */
  images: AlbumCover_album_images[];
}
