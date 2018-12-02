import React from 'react'
import Track, { TRACK_VARIANTS } from 'components/Track'
import gql from 'graphql-tag'
import PageTitle from 'components/PageTitle'
import useBackgroundColor from 'hooks/useBackgroundColor'
import { Query } from 'react-apollo'

const Tracks = () => {
  useBackgroundColor('#1F3363')

  return (
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
      fetchPolicy="network-only"
    >
      {({ loading, data: { viewer } }) => (
        <>
          <PageTitle>Songs</PageTitle>
          {loading ||
            viewer.savedTracks.edges.map(({ node }) => (
              <Track track={node} key={node.id} variant={TRACK_VARIANTS.FULL} />
            ))}
        </>
      )}
    </Query>
  )
}

export default Tracks
