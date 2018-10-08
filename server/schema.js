import { gql } from 'apollo-server'

/**
 * The term `Collection` used in this schema is heavily-inspired by Relay
 * connections, but does not use cursor based pagination as defined by the spec.
 */

export default gql`
  type Query {
    artist(id: ID!): Artist

    "Get information for the current logged-in user"
    viewer: Viewer
  }

  type Album {
    id: ID!

    "The artists of the album."
    artists: [SimpleArtist!]!

    """
    A list of the genres used to classify the album. For example: "Prog Rock",
    "Post-Grunge". (If not yet classified, the array is empty.)
    """
    genres: [String!]!

    "The cover art for the album in various sizes, widest first."
    images: [Image!]!

    "The label for the album."
    label: String

    """
    The name of the album. In case of an album takedown, the value may be an
    empty string
    """
    name: String!

    "Information about the release date of the album."
    releaseDate: ReleaseDate

    "The tracks of the album"
    tracks: TrackConnection

    "The type of album"
    type: AlbumType!
  }

  type AlbumEdge {
    "The date and time the album was saved."
    addedAt: String

    node: Album!
  }

  type AlbumConnection {
    edges: [AlbumEdge!]!

    pageInfo: PageInfo!
  }

  enum AlbumType {
    ALBUM
    SINGLE
    COMPILATION
  }

  type Artist {
    """
    The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
    for the artist.
    """
    id: ID!

    "Known external URLs for this artist."
    externalUrls: ExternalUrl

    """
    A list of the genres the artist is associated with. For example
    "Prog Rock", "Post-Grunge". (If not yet classified, the array is empty.)
    """
    genres: [String]

    "A link to the Web API endpoint providing full details of the artist."
    href: String!

    "Images of the artist in various sizes, widest first."
    images: [Image!]!

    "The name of the artist."
    name: String!

    """
    The popularity of the artist. The value will be between 0 and 100, with 100
    being the most popular. The artist's popularity is calculated from the
    popularity of all the artist's tracks.
    """
    popularity: Int!

    """
    The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
    for the artist.
    """
    uri: String
  }

  type ExternalUrl {
    """
    The type of the URL, for example:

    SPOTIFY - The [Spotify URL](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
    for the object.
    """
    kind: ExternalUrlType!

    "An external, public URL to the object."
    url: String!
  }

  type Followers {
    "The total number of followers."
    total: Int!
  }

  type Image {
    "The image height in pixels. If unknown, null is returned."
    height: Int

    "The source URL of the image."
    url: String!

    "The image width in pixels. If unknown, null is returned."
    width: Int
  }

  enum ExternalUrlType {
    SPOTIFY
  }

  type PageInfo {
    "Whether there is a next page of items."
    hasNext: Boolean!

    "Whether there is a previous page of items."
    hasPrevious: Boolean!

    """
    The maximum number of items in the response (as set in the query or default)
    """
    limit: Int!

    "The offset of the items returned (as set in the query or default)"
    offset: Int!

    "The total number of items returned for the page."
    total: Int!
  }

  type ReleaseDate {
    """
    The date the album was first released, for example 1981. Depending on the
    precision, it might be shown as 1981-12, or 1981-12-15.
    """
    date: String

    "The precision with which the release date value is known."
    precision: ReleaseDatePrecision
  }

  enum ReleaseDatePrecision {
    YEAR
    MONTH
    DAY
  }

  type User {
    """
    The [Spotify user ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
    for the user.
    """
    id: ID!

    "The name displayed on the user’s profile. null if not available."
    displayName: String

    "The user’s profile image."
    images: [Image!]!
  }

  type Track {
    id: ID!

    "A simplified album object."
    album: SimpleAlbum!

    "An array of simplified artist objects."
    artists: [SimpleArtist!]!

    """
    The disc number (usually 1 unless the album consists of more than one disc).
    """
    discNumber: Int!

    "The track length in milliseconds"
    duration: Int!

    """
    Whether or not the track has explicit lyrics (true = yes it does;
    false = no it does not OR unknown)
    """
    explicit: Boolean!

    "The name of the track"
    name: String!

    """
    The number of the track. If an album has several discs, the track number is
    the number on the specified disc.
    """
    trackNumber: Int
  }

  type TrackConnection {
    edges: [TrackEdge!]!
    pageInfo: PageInfo!
  }

  type TrackEdge {
    "The date and time the track was saved."
    addedAt: String

    "The track object."
    node: Track!
  }

  "Simplified representation of an album."
  type SimpleAlbum {
    id: ID!

    name: String!
  }

  "Simplified representation of an artist."
  type SimpleArtist {
    id: ID!

    name: String!
  }

  "Info about the current logged-in user"
  type Viewer {
    "The collection of saved albums in the current user's Spotify library."
    albums(limit: Int, offset: Int): AlbumConnection

    "Info about the user"
    user: User

    "The collection of saved songs in the current user's Spotify library."
    tracks(limit: Int, offset: Int): TrackConnection
  }
`
