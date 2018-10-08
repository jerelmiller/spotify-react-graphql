import React from 'react'
import Track from 'components/Track'
import gql from 'graphql-tag'
import PageTitle from 'components/PageTitle'
import { Query } from 'react-apollo'

const Tracks = () => (
  <Query
    query={gql`
      query TracksQuery($limit: Int!, $offset: Int!) {
        viewer {
          savedTracks(limit: $limit, offset: $offset) {
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
        <PageTitle>Songs</PageTitle>
        {loading ||
          viewer.savedTracks.edges.map(({ node }) => (
            <Track track={node} key={node.id} />
          ))}
      </>
    )}
  </Query>
)

export default Tracks
