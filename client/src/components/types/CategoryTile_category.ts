/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CategoryTile_category
// ====================================================

export interface CategoryTile_category_icons {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface CategoryTile_category {
  __typename: "Category";
  id: string;
  name: string;
  icons: CategoryTile_category_icons[];
}
