/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RoutePlaylistQuery
// ====================================================

export interface RoutePlaylistQuery_playlist_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface RoutePlaylistQuery_playlist_owner {
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

export interface RoutePlaylistQuery_playlist_tracks_edges_node_SimpleTrack_artists {
  __typename: "SimpleArtist";
  id: string;
  name: string;
}

export interface RoutePlaylistQuery_playlist_tracks_edges_node_SimpleTrack {
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
  artists: RoutePlaylistQuery_playlist_tracks_edges_node_SimpleTrack_artists[];
}

export interface RoutePlaylistQuery_playlist_tracks_edges_node_SavedTrack_artists {
  __typename: "SimpleArtist";
  id: string;
  name: string;
}

export interface RoutePlaylistQuery_playlist_tracks_edges_node_SavedTrack_album {
  __typename: "SimpleAlbum";
  id: string;
  /**
   * The name of the album. In case of an album takedown, the value may be an
   * empty string.
   */
  name: string;
}

export interface RoutePlaylistQuery_playlist_tracks_edges_node_SavedTrack {
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
  artists: RoutePlaylistQuery_playlist_tracks_edges_node_SavedTrack_artists[];
  /**
   * A simplified album object.
   */
  album: RoutePlaylistQuery_playlist_tracks_edges_node_SavedTrack_album;
}

export interface RoutePlaylistQuery_playlist_tracks_edges_node_FullTrack_artists {
  __typename: "SimpleArtist";
  id: string;
  name: string;
}

export interface RoutePlaylistQuery_playlist_tracks_edges_node_FullTrack_album_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface RoutePlaylistQuery_playlist_tracks_edges_node_FullTrack_album {
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
  images: RoutePlaylistQuery_playlist_tracks_edges_node_FullTrack_album_images[];
}

export interface RoutePlaylistQuery_playlist_tracks_edges_node_FullTrack {
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
  artists: RoutePlaylistQuery_playlist_tracks_edges_node_FullTrack_artists[];
  /**
   * A simplified album object.
   */
  album: RoutePlaylistQuery_playlist_tracks_edges_node_FullTrack_album;
}

export type RoutePlaylistQuery_playlist_tracks_edges_node = RoutePlaylistQuery_playlist_tracks_edges_node_SimpleTrack | RoutePlaylistQuery_playlist_tracks_edges_node_SavedTrack | RoutePlaylistQuery_playlist_tracks_edges_node_FullTrack;

export interface RoutePlaylistQuery_playlist_tracks_edges {
  __typename: "PlaylistTrackEdge";
  /**
   * The track object.
   */
  node: RoutePlaylistQuery_playlist_tracks_edges_node;
}

export interface RoutePlaylistQuery_playlist_tracks_pageInfo {
  __typename: "PageInfo";
  /**
   * The total number of items returned for the page.
   */
  total: number;
}

export interface RoutePlaylistQuery_playlist_tracks {
  __typename: "PlaylistTrackConnection";
  edges: RoutePlaylistQuery_playlist_tracks_edges[];
  pageInfo: RoutePlaylistQuery_playlist_tracks_pageInfo;
}

export interface RoutePlaylistQuery_playlist {
  __typename: "Playlist";
  id: string;
  name: string;
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the playlist.
   */
  uri: string | null;
  images: RoutePlaylistQuery_playlist_images[];
  owner: RoutePlaylistQuery_playlist_owner;
  tracks: RoutePlaylistQuery_playlist_tracks;
}

export interface RoutePlaylistQuery {
  /**
   * Get information about a playlist
   */
  playlist: RoutePlaylistQuery_playlist | null;
}

export interface RoutePlaylistQueryVariables {
  playlistId: string;
}
