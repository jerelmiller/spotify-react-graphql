/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GenresQuery
// ====================================================

export interface GenresQuery_categories_edges_node_icons {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface GenresQuery_categories_edges_node {
  __typename: "Category";
  id: string;
  name: string;
  icons: GenresQuery_categories_edges_node_icons[];
}

export interface GenresQuery_categories_edges {
  __typename: "CategoryEdge";
  node: GenresQuery_categories_edges_node;
}

export interface GenresQuery_categories {
  __typename: "CategoryConnection";
  edges: GenresQuery_categories_edges[];
}

export interface GenresQuery {
  categories: GenresQuery_categories | null;
}

export interface GenresQueryVariables {
  limit: number;
  offset: number;
}
