/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TrackImage_track
// ====================================================

export interface TrackImage_track_SavedTrack {
  __typename: "SavedTrack" | "SimpleTrack";
}

export interface TrackImage_track_FullTrack_album_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface TrackImage_track_FullTrack_album {
  __typename: "SimpleAlbum";
  /**
   * The cover art for the album in various sizes, widest first.
   */
  images: TrackImage_track_FullTrack_album_images[];
}

export interface TrackImage_track_FullTrack {
  __typename: "FullTrack";
  /**
   * A simplified album object.
   */
  album: TrackImage_track_FullTrack_album;
}

export type TrackImage_track = TrackImage_track_SavedTrack | TrackImage_track_FullTrack;
