/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Artist_artist
// ====================================================

export interface Artist_artist_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface Artist_artist {
  __typename: "Artist";
  /**
   * The [Spotify ID](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the artist.
   */
  id: string;
  /**
   * The name of the artist.
   */
  name: string;
  /**
   * Images of the artist in various sizes, widest first.
   */
  images: Artist_artist_images[];
}
