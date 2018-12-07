import React from 'react'
import Track, { TRACK_VARIANTS } from 'components/Track'
import gql from 'graphql-tag'
import PageTitle from 'components/PageTitle'
import useBackgroundColor from 'hooks/useBackgroundColor'
import posed, { PoseGroup } from 'react-pose'
import { Query } from 'react-apollo'

const TrackContainer = posed.div({
  enter: {
    opacity: 1,
    transition: ({ idx }) => ({ delay: idx * 10 })
  },
  exit: {
    opacity: 0
  }
})

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
          <PoseGroup>
            {loading ||
              viewer.savedTracks.edges.map(({ node }, idx) => (
                <TrackContainer key={node.id} idx={idx}>
                  <Track track={node} variant={TRACK_VARIANTS.FULL} />
                </TrackContainer>
              ))}
          </PoseGroup>
        </>
      )}
    </Query>
  )
}

export default Tracks
