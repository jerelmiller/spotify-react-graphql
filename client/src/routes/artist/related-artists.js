import React from 'react'
import ArtistTile from 'components/ArtistTile'
import gql from 'graphql-tag'
import TileGrid from 'components/TileGrid'
import { useQuery } from '@apollo/react-hooks'

const RelatedArtists = ({ artistId, children }) => {
  const {
    loading,
    data: { artist }
  } = useQuery(
    gql`
      query RelatedArtistQuery($artistId: ID!) {
        artist(id: $artistId) {
          id
          relatedArtists {
            id
            ...Artist_artist
          }
        }
      }

      ${ArtistTile.fragments.artist}
    `,
    { variables: { artistId } }
  )

  return (
    <TileGrid minWidth="160px">
      {loading ||
        artist.relatedArtists.map(artist => (
          <ArtistTile key={artist.id} artist={artist} />
        ))}
    </TileGrid>
  )
}

export default RelatedArtists
