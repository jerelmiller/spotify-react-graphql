/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PlaylistQuery
// ====================================================

export interface PlaylistQuery_playlist_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface PlaylistQuery_playlist_owner {
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
}

export interface PlaylistQuery_playlist_tracks_edges_node_SimpleTrack_artists {
  __typename: "SimpleArtist";
  id: string;
  name: string;
}

export interface PlaylistQuery_playlist_tracks_edges_node_SimpleTrack {
  __typename: "SimpleTrack";
  id: string;
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the artist.
   */
  uri: string | null;
  link: string;
  /**
   * An array of simplified artist objects.
   */
  artists: PlaylistQuery_playlist_tracks_edges_node_SimpleTrack_artists[];
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
   * The name of the track
   */
  name: string;
}

export interface PlaylistQuery_playlist_tracks_edges_node_SavedTrack_album {
  __typename: "SimpleAlbum";
  id: string;
  /**
   * The name of the album. In case of an album takedown, the value may be an
   * empty string.
   */
  name: string;
}

export interface PlaylistQuery_playlist_tracks_edges_node_SavedTrack_artists {
  __typename: "SimpleArtist";
  id: string;
  name: string;
}

export interface PlaylistQuery_playlist_tracks_edges_node_SavedTrack {
  __typename: "SavedTrack";
  id: string;
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the artist.
   */
  uri: string | null;
  link: string;
  /**
   * A simplified album object.
   */
  album: PlaylistQuery_playlist_tracks_edges_node_SavedTrack_album;
  /**
   * An array of simplified artist objects.
   */
  artists: PlaylistQuery_playlist_tracks_edges_node_SavedTrack_artists[];
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
   * The name of the track
   */
  name: string;
}

export interface PlaylistQuery_playlist_tracks_edges_node_FullTrack_album {
  __typename: "SimpleAlbum";
  id: string;
  /**
   * The name of the album. In case of an album takedown, the value may be an
   * empty string.
   */
  name: string;
}

export interface PlaylistQuery_playlist_tracks_edges_node_FullTrack_artists {
  __typename: "SimpleArtist";
  id: string;
  name: string;
}

export interface PlaylistQuery_playlist_tracks_edges_node_FullTrack {
  __typename: "FullTrack";
  id: string;
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the artist.
   */
  uri: string | null;
  link: string;
  /**
   * A simplified album object.
   */
  album: PlaylistQuery_playlist_tracks_edges_node_FullTrack_album;
  /**
   * An array of simplified artist objects.
   */
  artists: PlaylistQuery_playlist_tracks_edges_node_FullTrack_artists[];
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
   * The name of the track
   */
  name: string;
}

export type PlaylistQuery_playlist_tracks_edges_node = PlaylistQuery_playlist_tracks_edges_node_SimpleTrack | PlaylistQuery_playlist_tracks_edges_node_SavedTrack | PlaylistQuery_playlist_tracks_edges_node_FullTrack;

export interface PlaylistQuery_playlist_tracks_edges {
  __typename: "PlaylistTrackEdge";
  /**
   * The track object.
   */
  node: PlaylistQuery_playlist_tracks_edges_node;
}

export interface PlaylistQuery_playlist_tracks_pageInfo {
  __typename: "PageInfo";
  /**
   * The total number of items returned for the page.
   */
  total: number;
}

export interface PlaylistQuery_playlist_tracks {
  __typename: "PlaylistTrackConnection";
  edges: PlaylistQuery_playlist_tracks_edges[];
  pageInfo: PlaylistQuery_playlist_tracks_pageInfo;
}

export interface PlaylistQuery_playlist {
  __typename: "Playlist";
  id: string;
  name: string;
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the playlist.
   */
  uri: string | null;
  images: PlaylistQuery_playlist_images[];
  owner: PlaylistQuery_playlist_owner;
  tracks: PlaylistQuery_playlist_tracks;
}

export interface PlaylistQuery {
  /**
   * Get information about a playlist
   */
  playlist: PlaylistQuery_playlist | null;
}

export interface PlaylistQueryVariables {
  playlistId: string;
}
