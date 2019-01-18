/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserAvatar_user
// ====================================================

export interface UserAvatar_user_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface UserAvatar_user {
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
  images: UserAvatar_user_images[];
}
