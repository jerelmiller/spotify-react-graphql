import { gql } from 'apollo-server'

/**
 * The term `Collection` used in this schema is heavily-inspired by Relay
 * connections, but does not use cursor based pagination as defined by the spec.
 */

export default gql`
  type Query {
    artist(id: ID!): Artist

    "Get a category by its ID"
    category(id: ID!): Category

    "Get information about an album"
    album(id: ID!): Album

    "Get information for the current logged-in user"
    viewer: Viewer

    "Get information about a playlist"
    playlist(id: ID!): Playlist

    "Get new releases"
    newReleases(limit: Int, offset: Int): AlbumConnection

    "Get a list of Spotify featured playlists"
    featuredPlaylists(limit: Int, offset: Int): PlaylistConnection

    categories(limit: Int, offset: Int): CategoryConnection

    "Get a set of playlists for a category"
    playlistsByCategory(
      categoryId: ID!
      limit: Int
      offset: Int
    ): PlaylistConnection
  }

  type Mutation {
    "Play a track or set of tracks"
    playTrack(input: PlayTrackInput!): PlayTrackPayload

    "Refresh the current session"
    refreshSession(input: RefreshSessionInput!): RefreshSessionPayload
  }

  type PlayTrackPayload {
    success: Boolean
  }

  input PlayTrackInput {
    "Track URI to play"
    track: String!

    "The device in which to play the track"
    deviceId: ID

    """
    Spotify URI of the context to play. Valid contexts are albums, artists,
    playlists. Example: 'spotify:album:1Je1IMUlBXcx1Fz0WE7oPT'
    """
    contextUri: String
  }

  input RefreshSessionInput {
    "The token used to previously authenticate the request"
    token: String!
  }

  type RefreshSessionPayload {
    "The new access token"
    token: String
  }

  type Album {
    id: ID!

    "The artists of the album."
    artists: [SimpleArtist!]!

    primaryArtist: SimpleArtist

    """
    A list of the genres used to classify the album. For example: "Prog Rock",
    "Post-Grunge". (If not yet classified, the array is empty.)
    """
    genres: [String!]!

    """
    The field is present when getting an artist’s albums. Compare to type
    this field represents relationship between the artist and the album.
    """
    group: AlbumGroup

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

    """
    The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
    for the album.
    """
    uri: String
  }

  type AlbumEdge {
    node: Album!
  }

  type AlbumConnection {
    edges: [AlbumEdge!]!

    pageInfo: PageInfo!
  }

  enum AlbumType {
    ALBUM
    COMPILATION
    SINGLE
  }

  enum AlbumGroup {
    ALBUM
    APPEARS_ON
    COMPILATION
    SINGLE
  }

  type Artist {
    """
    The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
    for the artist.
    """
    id: ID!

    "A list of albums created by the artist."
    albums(limit: Int, offset: Int): AlbumConnection!

    "Information about the followers of the artist."
    followers: Followers

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
    Top tracks for the artist.
    """
    topTracks(limit: Int): [FullTrack!]!

    """
    The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
    for the artist.
    """
    uri: String

    "Artists similar to the artist."
    relatedArtists: [Artist!]!
  }

  type ArtistConnection {
    edges: [ArtistEdge!]!
    pageInfo: CursorInfo!
  }

  type ArtistEdge {
    node: Artist!
  }

  type Category {
    id: ID!
    icons: [Image!]!
    name: String!
  }

  type CategoryConnection {
    edges: [CategoryEdge!]!
    pageInfo: CursorInfo!
  }

  type CategoryEdge {
    node: Category!
  }

  type CursorInfo {
    "The cursor used to find the next set of items."
    cursor: String

    hasNextPage: Boolean!

    """
    The maximum number of items in the response (as set in the query or by
    default)
    """
    limit: Int!

    "The total number of items available to return."
    total: Int!
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

  type PageInfo {
    "Whether there is a next page of items."
    hasNextPage: Boolean!

    "Whether there is a previous page of items."
    hasPreviousPage: Boolean!

    """
    The maximum number of items in the response (as set in the query or default)
    """
    limit: Int!

    "The offset of the items returned (as set in the query or default)"
    offset: Int!

    "The total number of items returned for the page."
    total: Int!
  }

  type Playlist {
    id: ID!
    collaborative: Boolean!
    images: [Image!]!
    name: String!
    owner: User!
    public: Boolean!
    tracks: PlaylistTrackConnection!
  }

  type PlaylistTrackConnection {
    edges: [PlaylistTrackEdge!]!
    pageInfo: PageInfo!
  }

  type PlaylistTrackEdge {
    addedAt: String
    addedBy: User

    "The track object."
    node: Track!
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

    """
    The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
    for the user.
    """
    uri: String
  }

  interface Track {
    id: ID!

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

    """
    The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
    for the track.
    """
    uri: String
  }

  type TrackConnection {
    edges: [TrackEdge!]!
    pageInfo: PageInfo!
  }

  type TrackEdge {
    "The track object."
    node: Track!
  }

  type FullTrack implements Track {
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

    "A link to a 30 second preview (MP3 format) of the track."
    previewUrl: String

    """
    The popularity of a track is a value between 0 and 100, with 100 being the
    most popular. The popularity is calculated by algorithm and is based, in
    the most part, on the total number of plays the track has had and how
    recent those plays are. Generally speaking, songs that are being played a
    lot now will have a higher popularity than songs that were played a lot in
    the past. Duplicate tracks (e.g. the same track from a single and an album)
    are rated independently. Artist and album popularity is derived
    mathematically from track popularity. Note that the popularity value may
    lag actual popularity by a few days: the value is not updated in real time.
    """
    popularity: Int!

    """
    The number of the track. If an album has several discs, the track number is
    the number on the specified disc.
    """
    trackNumber: Int

    """
    The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
    for the artist.
    """
    uri: String
  }

  type SavedTrack implements Track {
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

    """
    The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
    for the artist.
    """
    uri: String
  }

  type SimpleTrack implements Track {
    id: ID!

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

    """
    The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
    for the artist.
    """
    uri: String
  }

  type SavedAlbumConnection {
    edges: [SavedAlbumEdge!]!
    pageInfo: PageInfo!
  }

  type SavedAlbumEdge {
    "The date and time the album was saved."
    addedAt: String

    "The album object."
    node: Album!
  }

  type SavedTrackConnection {
    edges: [SavedTrackEdge!]!
    pageInfo: PageInfo!
  }

  type SavedTrackEdge {
    "The date and time the track was saved."
    addedAt: String

    "The track object."
    node: SavedTrack!
  }

  "Simplified representation of an album."
  type SimpleAlbum {
    id: ID!

    "The type of album"
    type: AlbumType!

    "The cover art for the album in various sizes, widest first."
    images: [Image!]!

    """
    The name of the album. In case of an album takedown, the value may be an
    empty string.
    """
    name: String!
  }

  "Simplified representation of an artist."
  type SimpleArtist {
    id: ID!

    name: String!
  }

  type PlaylistConnection {
    edges: [PlaylistEdge!]!
    pageInfo: PageInfo!
  }

  type PlaylistEdge {
    node: Playlist!
  }

  "Info about the current logged-in user"
  type Viewer {
    "The list of the current user's followed artists."
    followedArtists(limit: Int, after: String): ArtistConnection

    "The list of the current user's owned or followed playlists"
    playlists(limit: Int, offset: Int): PlaylistConnection

    "The collection of saved albums in the current user's Spotify library."
    savedAlbums(limit: Int, offset: Int): SavedAlbumConnection

    "Info about the user"
    user: User

    "The collection of saved songs in the current user's Spotify library."
    savedTracks(limit: Int, offset: Int): SavedTrackConnection
  }
`
