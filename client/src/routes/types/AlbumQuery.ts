/* tslint:disable */
// This file was automatically generated and should not be edited.

import { AlbumType, ReleaseDatePrecision } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: AlbumQuery
// ====================================================

export interface AlbumQuery_album_releaseDate {
  __typename: "ReleaseDate";
  /**
   * The date the album was first released, for example 1981. Depending on the
   * precision, it might be shown as 1981-12, or 1981-12-15.
   */
  date: string | null;
  /**
   * The precision with which the release date value is known.
   */
  precision: ReleaseDatePrecision | null;
}

export interface AlbumQuery_album_primaryArtist {
  __typename: "SimpleArtist";
  id: string;
  name: string;
}

export interface AlbumQuery_album_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
  /**
   * The image width in pixels. If unknown, null is returned.
   */
  width: number | null;
}

export interface AlbumQuery_album_tracks_edges_node_SimpleTrack_artists {
  __typename: "SimpleArtist";
  id: string;
  name: string;
}

export interface AlbumQuery_album_tracks_edges_node_SimpleTrack {
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
  artists: AlbumQuery_album_tracks_edges_node_SimpleTrack_artists[];
}

export interface AlbumQuery_album_tracks_edges_node_SavedTrack_artists {
  __typename: "SimpleArtist";
  id: string;
  name: string;
}

export interface AlbumQuery_album_tracks_edges_node_SavedTrack_album {
  __typename: "SimpleAlbum";
  id: string;
  /**
   * The name of the album. In case of an album takedown, the value may be an
   * empty string.
   */
  name: string;
}

export interface AlbumQuery_album_tracks_edges_node_SavedTrack {
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
  artists: AlbumQuery_album_tracks_edges_node_SavedTrack_artists[];
  /**
   * A simplified album object.
   */
  album: AlbumQuery_album_tracks_edges_node_SavedTrack_album;
}

export interface AlbumQuery_album_tracks_edges_node_FullTrack_artists {
  __typename: "SimpleArtist";
  id: string;
  name: string;
}

export interface AlbumQuery_album_tracks_edges_node_FullTrack_album_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface AlbumQuery_album_tracks_edges_node_FullTrack_album {
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
  images: AlbumQuery_album_tracks_edges_node_FullTrack_album_images[];
}

export interface AlbumQuery_album_tracks_edges_node_FullTrack {
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
  artists: AlbumQuery_album_tracks_edges_node_FullTrack_artists[];
  /**
   * A simplified album object.
   */
  album: AlbumQuery_album_tracks_edges_node_FullTrack_album;
}

export type AlbumQuery_album_tracks_edges_node = AlbumQuery_album_tracks_edges_node_SimpleTrack | AlbumQuery_album_tracks_edges_node_SavedTrack | AlbumQuery_album_tracks_edges_node_FullTrack;

export interface AlbumQuery_album_tracks_edges {
  __typename: "TrackEdge";
  /**
   * The track object.
   */
  node: AlbumQuery_album_tracks_edges_node;
}

export interface AlbumQuery_album_tracks_pageInfo {
  __typename: "PageInfo";
  /**
   * The total number of items returned for the page.
   */
  total: number;
}

export interface AlbumQuery_album_tracks {
  __typename: "TrackConnection";
  edges: AlbumQuery_album_tracks_edges[];
  pageInfo: AlbumQuery_album_tracks_pageInfo;
}

export interface AlbumQuery_album {
  __typename: "Album";
  id: string;
  /**
   * The name of the album. In case of an album takedown, the value may be an
   * empty string
   */
  name: string;
  /**
   * The type of album
   */
  type: AlbumType;
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the album.
   */
  uri: string | null;
  /**
   * Information about the release date of the album.
   */
  releaseDate: AlbumQuery_album_releaseDate | null;
  primaryArtist: AlbumQuery_album_primaryArtist | null;
  /**
   * The cover art for the album in various sizes, widest first.
   */
  images: AlbumQuery_album_images[];
  /**
   * The tracks of the album
   */
  tracks: AlbumQuery_album_tracks | null;
}

export interface AlbumQuery {
  /**
   * Get information about an album
   */
  album: AlbumQuery_album | null;
}

export interface AlbumQueryVariables {
  albumId: string;
}
