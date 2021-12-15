/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ArtistsQuery
// ====================================================

export interface ArtistsQuery_viewer_followedArtists_edges_node_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface ArtistsQuery_viewer_followedArtists_edges_node {
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
  images: ArtistsQuery_viewer_followedArtists_edges_node_images[];
}

export interface ArtistsQuery_viewer_followedArtists_edges {
  __typename: "ArtistEdge";
  node: ArtistsQuery_viewer_followedArtists_edges_node;
}

export interface ArtistsQuery_viewer_followedArtists {
  __typename: "ArtistConnection";
  edges: ArtistsQuery_viewer_followedArtists_edges[];
}

export interface ArtistsQuery_viewer {
  __typename: "Viewer";
  /**
   * The list of the current user's followed artists.
   */
  followedArtists: ArtistsQuery_viewer_followedArtists | null;
}

export interface ArtistsQuery {
  /**
   * Get information for the current logged-in user
   */
  viewer: ArtistsQuery_viewer | null;
}

export interface ArtistsQueryVariables {
  limit: number;
  after?: string | null;
}
