/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AlbumGroup } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: ArtistOverviewQuery
// ====================================================

export interface ArtistOverviewQuery_artist_albums_edges_node_artists {
  __typename: "SimpleArtist";
  id: string;
  name: string;
}

export interface ArtistOverviewQuery_artist_albums_edges_node_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface ArtistOverviewQuery_artist_albums_edges_node {
  __typename: "Album";
  id: string;
  /**
   * The field is present when getting an artist’s albums. Compare to type
   * this field represents relationship between the artist and the album.
   */
  group: AlbumGroup | null;
  /**
   * The name of the album. In case of an album takedown, the value may be an
   * empty string
   */
  name: string;
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the album.
   */
  uri: string | null;
  /**
   * The artists of the album.
   */
  artists: ArtistOverviewQuery_artist_albums_edges_node_artists[];
  /**
   * The cover art for the album in various sizes, widest first.
   */
  images: ArtistOverviewQuery_artist_albums_edges_node_images[];
}

export interface ArtistOverviewQuery_artist_albums_edges {
  __typename: "AlbumEdge";
  node: ArtistOverviewQuery_artist_albums_edges_node;
}

export interface ArtistOverviewQuery_artist_albums {
  __typename: "AlbumConnection";
  edges: ArtistOverviewQuery_artist_albums_edges[];
}

export interface ArtistOverviewQuery_artist_topTracks_album_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface ArtistOverviewQuery_artist_topTracks_album {
  __typename: "SimpleAlbum";
  /**
   * The cover art for the album in various sizes, widest first.
   */
  images: ArtistOverviewQuery_artist_topTracks_album_images[];
}

export interface ArtistOverviewQuery_artist_topTracks {
  __typename: "FullTrack";
  id: string;
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the artist.
   */
  uri: string | null;
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
   * A simplified album object.
   */
  album: ArtistOverviewQuery_artist_topTracks_album;
  /**
   * The name of the track
   */
  name: string;
}

export interface ArtistOverviewQuery_artist {
  __typename: "Artist";
  /**
   * The [Spotify ID](https:  // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the artist.
   */
  id: string;
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the artist.
   */
  uri: string | null;
  /**
   * A list of albums created by the artist.
   */
  albums: ArtistOverviewQuery_artist_albums;
  /**
   * Top tracks for the artist.
   */
  topTracks: ArtistOverviewQuery_artist_topTracks[];
}

export interface ArtistOverviewQuery {
  artist: ArtistOverviewQuery_artist | null;
}

export interface ArtistOverviewQueryVariables {
  artistId: string;
  limit: number;
}
