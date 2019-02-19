import React from 'react'
import Track from 'components/Track'
import gql from 'graphql-tag'
import PageTitle from 'components/PageTitle'
import useBackgroundColor from 'hooks/useBackgroundColor'
import posed, { PoseGroup } from 'react-pose'
import { Query } from 'react-apollo'

const TrackContainer = posed.div({
  enter: {
    opacity: 1
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
                  ...TrackAlbumLink_track
                  ...TrackArtistLink_track
                  ...TrackDuration_track
                  ...TrackExplicitBadge_track
                  ...TrackName_track
                }
              }
            }
          }
        }

        ${Track.fragments.track}
        ${Track.AlbumLink.fragments.track}
        ${Track.ArtistLink.fragments.track}
        ${Track.Duration.fragments.track}
        ${Track.ExplicitBadge.fragments.track}
        ${Track.Name.fragments.track}
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
                <TrackContainer key={node.id}>
                  <Track track={node}>
                    <Track.Name />
                    <Track.More />
                    <Track.Duration />
                    <Track.Details>
                      <Track.ExplicitBadge /> <Track.ArtistLink /> &middot;{' '}
                      <Track.AlbumLink />
                    </Track.Details>
                  </Track>
                </TrackContainer>
              ))}
          </PoseGroup>
        </>
      )}
    </Query>
  )
}

export default Tracks
