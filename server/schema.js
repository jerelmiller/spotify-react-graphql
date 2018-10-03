import { gql } from 'apollo-server'

export default gql`
  type Query {
    artist(id: ID!): Artist
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
`
