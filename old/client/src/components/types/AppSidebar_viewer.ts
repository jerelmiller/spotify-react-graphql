/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AppSidebar_viewer
// ====================================================

export interface AppSidebar_viewer_user_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface AppSidebar_viewer_user {
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
  images: AppSidebar_viewer_user_images[];
}

export interface AppSidebar_viewer_playlists_edges_node {
  __typename: "Playlist";
  id: string;
  name: string;
}

export interface AppSidebar_viewer_playlists_edges {
  __typename: "PlaylistEdge";
  node: AppSidebar_viewer_playlists_edges_node;
}

export interface AppSidebar_viewer_playlists {
  __typename: "PlaylistConnection";
  edges: AppSidebar_viewer_playlists_edges[];
}

export interface AppSidebar_viewer {
  __typename: "Viewer";
  /**
   * Info about the user
   */
  user: AppSidebar_viewer_user | null;
  /**
   * The list of the current user's owned or followed playlists
   */
  playlists: AppSidebar_viewer_playlists | null;
}
