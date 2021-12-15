/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AppLayoutQuery
// ====================================================

export interface AppLayoutQuery_viewer_user_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface AppLayoutQuery_viewer_user {
  __typename: "User";
  /**
   * The [Spotify user ID](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the user.
   */
  id: string;
  /**
   * The name displayed on the user’s profile. null if not available.
   */
  displayName: string | null;
  /**
   * The user’s profile image.
   */
  images: AppLayoutQuery_viewer_user_images[];
}

export interface AppLayoutQuery_viewer_playlists_edges_node {
  __typename: "Playlist";
  id: string;
  name: string;
}

export interface AppLayoutQuery_viewer_playlists_edges {
  __typename: "PlaylistEdge";
  node: AppLayoutQuery_viewer_playlists_edges_node;
}

export interface AppLayoutQuery_viewer_playlists {
  __typename: "PlaylistConnection";
  edges: AppLayoutQuery_viewer_playlists_edges[];
}

export interface AppLayoutQuery_viewer {
  __typename: "Viewer";
  /**
   * Info about the user
   */
  user: AppLayoutQuery_viewer_user | null;
  /**
   * The list of the current user's owned or followed playlists
   */
  playlists: AppLayoutQuery_viewer_playlists | null;
}

export interface AppLayoutQuery {
  /**
   * Get information for the current logged-in user
   */
  viewer: AppLayoutQuery_viewer | null;
}
