/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TracksQuery
// ====================================================

export interface TracksQuery_viewer_savedTracks_edges_node_album {
  __typename: "SimpleAlbum";
  id: string;
  /**
   * The name of the album. In case of an album takedown, the value may be an
   * empty string.
   */
  name: string;
}

export interface TracksQuery_viewer_savedTracks_edges_node_artists {
  __typename: "SimpleArtist";
  id: string;
  name: string;
}

export interface TracksQuery_viewer_savedTracks_edges_node {
  __typename: "SavedTrack";
  id: string;
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the artist.
   */
  uri: string | null;
  /**
   * A simplified album object.
   */
  album: TracksQuery_viewer_savedTracks_edges_node_album;
  /**
   * An array of simplified artist objects.
   */
  artists: TracksQuery_viewer_savedTracks_edges_node_artists[];
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

export interface TracksQuery_viewer_savedTracks_edges {
  __typename: "SavedTrackEdge";
  /**
   * The track object.
   */
  node: TracksQuery_viewer_savedTracks_edges_node;
}

export interface TracksQuery_viewer_savedTracks {
  __typename: "SavedTrackConnection";
  edges: TracksQuery_viewer_savedTracks_edges[];
}

export interface TracksQuery_viewer {
  __typename: "Viewer";
  /**
   * The collection of saved songs in the current user's Spotify library.
   */
  savedTracks: TracksQuery_viewer_savedTracks | null;
}

export interface TracksQuery {
  /**
   * Get information for the current logged-in user
   */
  viewer: TracksQuery_viewer | null;
}

export interface TracksQueryVariables {
  limit: number;
  offset: number;
}
