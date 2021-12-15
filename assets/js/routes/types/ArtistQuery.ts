/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ArtistQuery
// ====================================================

export interface ArtistQuery_artist_followers {
  __typename: "Followers";
  /**
   * The total number of followers.
   */
  total: number;
}

export interface ArtistQuery_artist_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
  /**
   * The image width in pixels. If unknown, null is returned.
   */
  width: number | null;
  /**
   * The image height in pixels. If unknown, null is returned.
   */
  height: number | null;
}

export interface ArtistQuery_artist {
  __typename: "Artist";
  /**
   * The [Spotify ID](https:  // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the artist.
   */
  id: string;
  /**
   * The name of the artist.
   */
  name: string;
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the artist.
   */
  uri: string | null;
  /**
   * Information about the followers of the artist.
   */
  followers: ArtistQuery_artist_followers | null;
  /**
   * Images of the artist in various sizes, widest first.
   */
  images: ArtistQuery_artist_images[];
}

export interface ArtistQuery {
  artist: ArtistQuery_artist | null;
}

export interface ArtistQueryVariables {
  artistId: string;
}
