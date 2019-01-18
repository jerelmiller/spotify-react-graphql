/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RelatedArtistQuery
// ====================================================

export interface RelatedArtistQuery_artist_relatedArtists_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface RelatedArtistQuery_artist_relatedArtists {
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
  images: RelatedArtistQuery_artist_relatedArtists_images[];
}

export interface RelatedArtistQuery_artist {
  __typename: "Artist";
  /**
   * The [Spotify ID](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the artist.
   */
  id: string;
  /**
   * Artists similar to the artist.
   */
  relatedArtists: RelatedArtistQuery_artist_relatedArtists[];
}

export interface RelatedArtistQuery {
  artist: RelatedArtistQuery_artist | null;
}

export interface RelatedArtistQueryVariables {
  artistId: string;
}
