/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Track_track
// ====================================================

export interface Track_track_SimpleTrack_artists {
  __typename: "SimpleArtist";
  id: string;
  name: string;
}

export interface Track_track_SimpleTrack {
  __typename: "SimpleTrack";
  id: string;
  /**
   * The name of the track
   */
  name: string;
  /**
   * The track length in milliseconds
   */
  duration: number;
  /**
   * Whether or not the track has explicit lyrics (true = yes it does;
   * false = no it does not OR unknown)
   */
  explicit: boolean;
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the artist.
   */
  uri: string | null;
  /**
   * An array of simplified artist objects.
   */
  artists: Track_track_SimpleTrack_artists[];
}

export interface Track_track_SavedTrack_artists {
  __typename: "SimpleArtist";
  id: string;
  name: string;
}

export interface Track_track_SavedTrack_album {
  __typename: "SimpleAlbum";
  id: string;
  /**
   * The name of the album. In case of an album takedown, the value may be an
   * empty string.
   */
  name: string;
}

export interface Track_track_SavedTrack {
  __typename: "SavedTrack";
  id: string;
  /**
   * The name of the track
   */
  name: string;
  /**
   * The track length in milliseconds
   */
  duration: number;
  /**
   * Whether or not the track has explicit lyrics (true = yes it does;
   * false = no it does not OR unknown)
   */
  explicit: boolean;
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the artist.
   */
  uri: string | null;
  /**
   * An array of simplified artist objects.
   */
  artists: Track_track_SavedTrack_artists[];
  /**
   * A simplified album object.
   */
  album: Track_track_SavedTrack_album;
}

export interface Track_track_FullTrack_artists {
  __typename: "SimpleArtist";
  id: string;
  name: string;
}

export interface Track_track_FullTrack_album_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface Track_track_FullTrack_album {
  __typename: "SimpleAlbum";
  id: string;
  /**
   * The name of the album. In case of an album takedown, the value may be an
   * empty string.
   */
  name: string;
  /**
   * The cover art for the album in various sizes, widest first.
   */
  images: Track_track_FullTrack_album_images[];
}

export interface Track_track_FullTrack {
  __typename: "FullTrack";
  id: string;
  /**
   * The name of the track
   */
  name: string;
  /**
   * The track length in milliseconds
   */
  duration: number;
  /**
   * Whether or not the track has explicit lyrics (true = yes it does;
   * false = no it does not OR unknown)
   */
  explicit: boolean;
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the artist.
   */
  uri: string | null;
  /**
   * An array of simplified artist objects.
   */
  artists: Track_track_FullTrack_artists[];
  /**
   * A simplified album object.
   */
  album: Track_track_FullTrack_album;
}

export type Track_track = Track_track_SimpleTrack | Track_track_SavedTrack | Track_track_FullTrack;
