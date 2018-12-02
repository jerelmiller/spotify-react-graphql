import React from 'react'
import gql from 'graphql-tag'
import Track, { TRACK_VARIANTS } from 'components/Track'
import { Query } from 'react-apollo'

const Overview = ({ artistId }) => (
  <Query
    query={gql`
      query ArtistOverviewQuery($artistId: ID!, $limit: Int!) {
        artist(id: $artistId) {
          id
          topTracks(limit: $limit) {
            id

            ...Track_track
          }
        }
      }

      ${Track.fragments.track}
    `}
    variables={{ artistId, limit: 5 }}
  >
    {({ loading, data: { artist } }) => (
      <>
        <h1>Popular</h1>
        {loading ||
          artist.topTracks.map(track => (
            <Track
              key={track.id}
              track={track}
              variant={TRACK_VARIANTS.POPULAR}
            />
          ))}
      </>
    )}
  </Query>
)

export default Overview
