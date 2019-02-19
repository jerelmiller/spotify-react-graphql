/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AlbumsQuery
// ====================================================

export interface AlbumsQuery_viewer_savedAlbums_edges_node_artists {
  __typename: "SimpleArtist";
  id: string;
  name: string;
}

export interface AlbumsQuery_viewer_savedAlbums_edges_node_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface AlbumsQuery_viewer_savedAlbums_edges_node {
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
  artists: AlbumsQuery_viewer_savedAlbums_edges_node_artists[];
  /**
   * The cover art for the album in various sizes, widest first.
   */
  images: AlbumsQuery_viewer_savedAlbums_edges_node_images[];
}

export interface AlbumsQuery_viewer_savedAlbums_edges {
  __typename: "SavedAlbumEdge";
  /**
   * The album object.
   */
  node: AlbumsQuery_viewer_savedAlbums_edges_node;
}

export interface AlbumsQuery_viewer_savedAlbums {
  __typename: "SavedAlbumConnection";
  edges: AlbumsQuery_viewer_savedAlbums_edges[];
}

export interface AlbumsQuery_viewer {
  __typename: "Viewer";
  /**
   * The collection of saved albums in the current user's Spotify library.
   */
  savedAlbums: AlbumsQuery_viewer_savedAlbums | null;
}

export interface AlbumsQuery {
  /**
   * Get information for the current logged-in user
   */
  viewer: AlbumsQuery_viewer | null;
}

export interface AlbumsQueryVariables {
  limit: number;
  offset: number;
}
