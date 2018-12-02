import React from 'react'
import AlbumGroup from 'components/AlbumGroup'
import gql from 'graphql-tag'
import Track, { TRACK_VARIANTS } from 'components/Track'
import { Query } from 'react-apollo'

const groupAlbumsByType = ({ edges }) =>
  edges.reduce(
    (types, { node: album }) => ({
      ...types,
      [album.type]: [...(types[album.type] || []), album]
    }),
    {}
  )

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

      ${Track.fragments.track}
      ${AlbumGroup.fragments.album}
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
              {artist.topTracks.map(track => (
                <Track
                  key={track.id}
                  track={track}
                  variant={TRACK_VARIANTS.POPULAR}
                />
              ))}
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
