import React from 'react'
import AlbumGroup from 'components/AlbumGroup'
import FlexContainer from 'components/FlexContainer'
import gql from 'graphql-tag'
import Track from 'components/Track'
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

const InlineExplicitBadge = styled(Track.ExplicitBadge)`
  align-self: flex-start;
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
            ...TrackDuration_track
            ...TrackExplicitBadge_track
            ...TrackImage_track
            ...TrackName_track
          }
        }
      }

      ${Track.fragments.track}
      ${Track.Duration.fragments.track}
      ${Track.ExplicitBadge.fragments.track}
      ${Track.Image.fragments.track}
      ${Track.Name.fragments.track}
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
              <TopTracksContainer>
                {artist.topTracks.map(track => (
                  <Track
                    key={track.id}
                    track={track}
                    playContext={artist.uri}
                    columns="auto auto 1fr auto auto"
                  >
                    <Track.Image size="50px" />
                    <FlexContainer direction="column">
                      <Track.Name />
                      <InlineExplicitBadge />
                    </FlexContainer>
                    <Track.More />
                    <Track.Duration />
                  </Track>
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
