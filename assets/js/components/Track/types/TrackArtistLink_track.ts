/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TrackArtistLink_track
// ====================================================

export interface TrackArtistLink_track_artists {
  __typename: "SimpleArtist";
  id: string;
  name: string;
}

export interface TrackArtistLink_track {
  __typename: "FullTrack" | "SavedTrack" | "SimpleTrack";
  /**
   * An array of simplified artist objects.
   */
  artists: TrackArtistLink_track_artists[];
}
