/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Album_album
// ====================================================

export interface Album_album_artists {
  __typename: "SimpleArtist";
  id: string;
  name: string;
}

export interface Album_album_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface Album_album {
  __typename: "Album";
  id: string;
  /**
   * The name of the album. In case of an album takedown, the value may be an
   * empty string
   */
  name: string;
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the album.
   */
  uri: string | null;
  /**
   * The artists of the album.
   */
  artists: Album_album_artists[];
  /**
   * The cover art for the album in various sizes, widest first.
   */
  images: Album_album_images[];
}
