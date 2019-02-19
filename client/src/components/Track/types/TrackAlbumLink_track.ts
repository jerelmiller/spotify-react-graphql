/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TrackAlbumLink_track
// ====================================================

export interface TrackAlbumLink_track_SimpleTrack {
  __typename: "SimpleTrack";
}

export interface TrackAlbumLink_track_SavedTrack_album {
  __typename: "SimpleAlbum";
  id: string;
  /**
   * The name of the album. In case of an album takedown, the value may be an
   * empty string.
   */
  name: string;
}

export interface TrackAlbumLink_track_SavedTrack {
  __typename: "SavedTrack";
  /**
   * A simplified album object.
   */
  album: TrackAlbumLink_track_SavedTrack_album;
}

export interface TrackAlbumLink_track_FullTrack_album {
  __typename: "SimpleAlbum";
  id: string;
  /**
   * The name of the album. In case of an album takedown, the value may be an
   * empty string.
   */
  name: string;
}

export interface TrackAlbumLink_track_FullTrack {
  __typename: "FullTrack";
  /**
   * A simplified album object.
   */
  album: TrackAlbumLink_track_FullTrack_album;
}

export type TrackAlbumLink_track = TrackAlbumLink_track_SimpleTrack | TrackAlbumLink_track_SavedTrack | TrackAlbumLink_track_FullTrack;
