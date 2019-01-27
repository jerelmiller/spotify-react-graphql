import React from 'react'
import AlbumGroup, {
  fragments as AlbumGroupFragments
} from 'components/AlbumGroup'
import gql from 'graphql-tag'
import Track, {
  TRACK_VARIANTS,
  fragments as TrackFragments
} from 'components/Track'
import styled from 'styled-components'
import { Query } from 'react-apollo'

const groupAlbumsByType = ({ edges }) =>
  edges.reduce(
    (types, { node: album }) => ({
      ...types,
      [album.group]: [...(types[album.group] || []), album]
    }),
    {}
  )

const TopTracksContainer = styled.div`
  margin-bottom: 2rem;
`

const Overview = ({ artistId }) => (
  <Query
    query={gql`
      query ArtistOverviewQuery($artistId: ID!, $limit: Int!) {
        artist(id: $artistId) {
          id
          uri

          albums {
            edges {
              node {
                id
                group
                ...AlbumGroup_album
              }
            }
          }

          topTracks(limit: $limit) {
            id

            ...Track_track
          }
        }
      }

      ${TrackFragments.track}
      ${AlbumGroupFragments.album}
    `}
    variables={{ artistId, limit: 5 }}
  >
    {({ loading, data: { artist } }) => {
      const albumsByType = loading ? {} : groupAlbumsByType(artist.albums)

      return (
        <>
          <h1>Popular</h1>
          {loading || (
            <>
              <TopTracksContainer>
                {artist.topTracks.map(track => (
                  <Track
                    key={track.id}
                    track={track}
                    variant={TRACK_VARIANTS.POPULAR}
                    playContext={artist.uri}
                  />
                ))}
              </TopTracksContainer>
              {albumsByType.ALBUM && (
                <AlbumGroup title="Albums" albums={albumsByType.ALBUM} />
              )}
              {albumsByType.SINGLE && (
                <AlbumGroup
                  title="Singles and EPs"
                  albums={albumsByType.SINGLE}
                />
              )}
              {albumsByType.APPEARS_ON && (
                <AlbumGroup
                  title="Appears On"
                  albums={albumsByType.APPEARS_ON}
                />
              )}
            </>
          )}
        </>
      )
    }}
  </Query>
)

export default Overview
