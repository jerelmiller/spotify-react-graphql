import React from 'react'
import ArtistTile, {
  fragments as ArtistTileFragments
} from 'components/ArtistTile'
import gql from 'graphql-tag'
import TileGrid from 'components/TileGrid'
import { Query } from 'react-apollo'

const RelatedArtists = ({ artistId, children }) => (
  <Query
    query={gql`
      query RelatedArtistQuery($artistId: ID!) {
        artist(id: $artistId) {
          id
          relatedArtists {
            id
            ...Artist_artist
          }
        }
      }

      ${ArtistTileFragments.artist}
    `}
    variables={{ artistId }}
  >
    {({ loading, data: { artist } }) => (
      <TileGrid minWidth="160px">
        {loading ||
          artist.relatedArtists.map(artist => (
            <ArtistTile key={artist.id} artist={artist} />
          ))}
      </TileGrid>
    )}
  </Query>
)

export default RelatedArtists
