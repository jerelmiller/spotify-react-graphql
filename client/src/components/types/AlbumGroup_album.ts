/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AlbumGroup_album
// ====================================================

export interface AlbumGroup_album_artists {
  __typename: "SimpleArtist";
  id: string;
  name: string;
}

export interface AlbumGroup_album_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface AlbumGroup_album {
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
  artists: AlbumGroup_album_artists[];
  /**
   * The cover art for the album in various sizes, widest first.
   */
  images: AlbumGroup_album_images[];
}
