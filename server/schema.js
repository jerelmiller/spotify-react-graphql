import { gql } from 'apollo-server'

export default gql`
  type Query {
    artist(id: ID!): Artist

    "Get information for the current logged-in user"
    viewer: Viewer
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

  "Info about the current logged-in user"
  type Viewer {
    "Info about the user"
    user: User

    "The collection of saved songs in the current user's Spotify library."
    tracks(limit: Int, offset: Int): [Track]
  }
`
