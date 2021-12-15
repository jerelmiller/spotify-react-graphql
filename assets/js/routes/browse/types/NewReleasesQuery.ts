/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NewReleasesQuery
// ====================================================

export interface NewReleasesQuery_newReleases_edges_node_artists {
  __typename: "SimpleArtist";
  id: string;
  name: string;
}

export interface NewReleasesQuery_newReleases_edges_node_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface NewReleasesQuery_newReleases_edges_node {
  __typename: "Album";
  id: string;
  /**
   * The name of the album. In case of an album takedown, the value may be an
   * empty string
   */
  name: string;
  /**
   * The artists of the album.
   */
  artists: NewReleasesQuery_newReleases_edges_node_artists[];
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the album.
   */
  uri: string | null;
  /**
   * The cover art for the album in various sizes, widest first.
   */
  images: NewReleasesQuery_newReleases_edges_node_images[];
}

export interface NewReleasesQuery_newReleases_edges {
  __typename: "AlbumEdge";
  node: NewReleasesQuery_newReleases_edges_node;
}

export interface NewReleasesQuery_newReleases {
  __typename: "AlbumConnection";
  edges: NewReleasesQuery_newReleases_edges[];
}

export interface NewReleasesQuery {
  /**
   * Get new releases
   */
  newReleases: NewReleasesQuery_newReleases | null;
}

export interface NewReleasesQueryVariables {
  limit: number;
  offset: number;
}
