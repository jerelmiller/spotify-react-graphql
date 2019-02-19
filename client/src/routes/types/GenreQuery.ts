/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GenreQuery
// ====================================================

export interface GenreQuery_playlistsByCategory_edges_node_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface GenreQuery_playlistsByCategory_edges_node {
  __typename: "Playlist";
  id: string;
  name: string;
  images: GenreQuery_playlistsByCategory_edges_node_images[];
}

export interface GenreQuery_playlistsByCategory_edges {
  __typename: "PlaylistEdge";
  node: GenreQuery_playlistsByCategory_edges_node;
}

export interface GenreQuery_playlistsByCategory {
  __typename: "PlaylistConnection";
  edges: GenreQuery_playlistsByCategory_edges[];
}

export interface GenreQuery_category {
  __typename: "Category";
  id: string;
  name: string;
}

export interface GenreQuery {
  /**
   * Get a set of playlists for a category
   */
  playlistsByCategory: GenreQuery_playlistsByCategory | null;
  /**
   * Get a category by its ID
   */
  category: GenreQuery_category | null;
}

export interface GenreQueryVariables {
  categoryId: string;
  limit: number;
  offset: number;
}
