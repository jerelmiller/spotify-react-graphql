import React from 'react'
import Track from 'components/Track'
import gql from 'graphql-tag'
import PageTitle from 'components/PageTitle'
import PaginationObserver from 'components/PaginationObserver'
import useBackgroundColor from 'hooks/useBackgroundColor'
import useScrollContainer from 'hooks/useScrollContainer'
import posed, { PoseGroup } from 'react-pose'
import { lensPath } from 'utils/fp'
import { useQuery } from '@apollo/react-hooks'

const tracksEdgesLens = lensPath(['viewer', 'savedTracks', 'edges'])
const pageInfoLens = lensPath(['viewer', 'savedTracks', 'pageInfo'])

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
  const scrollContainer = useScrollContainer()

  const {
    loading,
    fetchMore,
    data: { viewer }
  } = useQuery(
    gql`
      query TracksQuery($limit: Int, $offset: Int) {
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

            pageInfo {
              ...PaginationObserver_pageInfo
            }
          }
        }
      }

      ${PaginationObserver.fragments.pageInfo}
      ${Track.fragments.track}
      ${Track.AlbumLink.fragments.track}
      ${Track.ArtistLink.fragments.track}
      ${Track.Duration.fragments.track}
      ${Track.ExplicitBadge.fragments.track}
      ${Track.Name.fragments.track}
    `,
    { fetchPolicy: 'network-only' }
  )

  return (
    <>
      <PageTitle>Songs</PageTitle>
      <PoseGroup>
        {loading ||
          viewer.savedTracks.edges.map(({ node }, idx) => (
            <TrackContainer key={node.id}>
              <Track track={node} columns="auto 1fr auto auto">
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

      {loading || (
        <PaginationObserver
          threshold="750px"
          scrollContainer={scrollContainer}
          fetchMore={fetchMore}
          pageInfo={viewer.savedTracks.pageInfo}
          edgesLens={tracksEdgesLens}
          pageInfoLens={pageInfoLens}
        />
      )}
    </>
  )
}

export default Tracks
