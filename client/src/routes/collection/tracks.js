import React from 'react'
import Track from 'components/Track'
import gql from 'graphql-tag'
import PageTitle from 'components/PageTitle'
import useBackgroundColor from 'hooks/useBackgroundColor'
import usePaginationObserver, {
  usePaginationObserver_pageInfo
} from 'hooks/usePaginationObserver'
import posed, { PoseGroup } from 'react-pose'
import { lensPath, view } from 'utils/fp'
import { useQuery } from '@apollo/react-hooks'

const edgesLens = lensPath(['viewer', 'savedTracks', 'edges'])
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

  const result = useQuery(
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
              ...usePaginationObserver_pageInfo
            }
          }
        }
      }

      ${usePaginationObserver_pageInfo}
      ${Track.fragments.track}
      ${Track.AlbumLink.fragments.track}
      ${Track.ArtistLink.fragments.track}
      ${Track.Duration.fragments.track}
      ${Track.ExplicitBadge.fragments.track}
      ${Track.Name.fragments.track}
    `,
    { fetchPolicy: 'network-only' }
  )

  const { loading, data } = result

  const ref = usePaginationObserver(result, {
    threshold: '750px',
    edgesLens: edgesLens,
    pageInfoLens
  })

  return (
    <>
      <PageTitle>Songs</PageTitle>
      <PoseGroup>
        {loading ||
          view(edgesLens, data).map(({ node }, idx) => (
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

      <div ref={ref} />
    </>
  )
}

export default Tracks
