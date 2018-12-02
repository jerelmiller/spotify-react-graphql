import React from 'react'
import AlbumTile from 'components/AlbumTile'
import TileGrid from 'components/TileGrid'
import gql from 'graphql-tag'
import Track, { TRACK_VARIANTS } from 'components/Track'
import { Query } from 'react-apollo'

const Overview = ({ artistId }) => (
  <Query
    query={gql`
      query ArtistOverviewQuery($artistId: ID!, $limit: Int!) {
        artist(id: $artistId) {
          id

          albums {
            edges {
              node {
                id
                type
                ...Album_album
              }
            }
          }

          topTracks(limit: $limit) {
            id

            ...Track_track
          }
        }
      }

      ${Track.fragments.track}
      ${AlbumTile.fragments.album}
    `}
    variables={{ artistId, limit: 5 }}
  >
    {({ loading, data: { artist } }) => {
      const { ALBUM, SINGLE, COMPILATION } = loading
        ? {}
        : artist.albums.edges.reduce(
            (types, { node: album }) => ({
              ...types,
              [album.type]: [...(types[album.type] || []), album]
            }),
            {}
          )

      return (
        <>
          <h1>Popular</h1>
          {loading || (
            <>
              {artist.topTracks.map(track => (
                <Track
                  key={track.id}
                  track={track}
                  variant={TRACK_VARIANTS.POPULAR}
                />
              ))}
              {ALBUM && (
                <>
                  <h1>Albums</h1>
                  <TileGrid fill={false} minWidth="180px">
                    {ALBUM.map(album => (
                      <AlbumTile key={album.id} album={album} />
                    ))}
                  </TileGrid>
                </>
              )}
            </>
          )}
        </>
      )
    }}
  </Query>
)

export default Overview
