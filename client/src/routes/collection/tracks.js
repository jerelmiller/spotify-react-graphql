import React from 'react'
import Track from 'components/Track'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const Tracks = () => (
  <Query
    query={gql`
      query TracksQuery($limit: Int!, $offset: Int!) {
        viewer {
          tracks(limit: $limit, offset: $offset) {
            edges {
              node {
                id

                ...Track_track
              }
            }
          }
        }
      }

      ${Track.fragments.track}
    `}
    variables={{ limit: 50, offset: 0 }}
  >
    {({ loading, data: { viewer } }) => (
      <>
        <h1>Songs</h1>
        {loading ||
          viewer.tracks.edges.map(({ node }) => <Track track={node} />)}
      </>
    )}
  </Query>
)

export default Tracks
