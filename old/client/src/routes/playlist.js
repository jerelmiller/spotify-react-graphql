import React from 'react'
import BackgroundFromImage from 'components/BackgroundFromImage'
import gql from 'graphql-tag'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import Track from 'components/Track'
import { textColor } from 'styles/utils'
import PlayableCollectionCover from '../components/PlayableCollectionCover'
import PlayCollectionButton from '../components/PlayCollectionButton'
import { useQuery } from '@apollo/react-hooks'
import usePaginationObserver, {
  usePaginationObserver_pageInfo
} from 'hooks/usePaginationObserver'
import { lensPath } from 'utils/fp'
import { useParams, Link } from 'react-router-dom'

const edgesLens = lensPath(['playlist', 'tracks', 'edges'])
const pageInfoLens = lensPath(['playlist', 'tracks', 'pageInfo'])

// TODO: Abstract all these components to share with album
const Container = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-gap: 1rem;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`

const UserLink = styled(Link)`
  font-size: 0.9rem;
  color: ${textColor('muted')};
  border-bottom: 1px solid transparent;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${textColor('primary')};
    border-bottom-color: ${textColor('primary')};
  }
`

const Typography = styled.span`
  font-size: 0.8rem;
  font-weight: 300;
  color: ${textColor('muted')};
  text-transform: uppercase;
`

const Playlist = () => {
  const { playlistId } = useParams()

  const result = useQuery(
    gql`
      query PlaylistQuery($playlistId: ID!, $limit: Int, $offset: Int) {
        playlist(id: $playlistId) {
          id
          name
          uri
          images {
            url
          }
          owner {
            id
            displayName
          }

          tracks(limit: $limit, offset: $offset) {
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
              total
              ...usePaginationObserver_pageInfo
            }
          }

          ...PlayableCollectionCover_collection
        }
      }

      ${Track.fragments.track}
      ${Track.AlbumLink.fragments.track}
      ${Track.ArtistLink.fragments.track}
      ${Track.Duration.fragments.track}
      ${Track.ExplicitBadge.fragments.track}
      ${Track.Name.fragments.track}
      ${PlayableCollectionCover.fragments.collection}
      ${usePaginationObserver_pageInfo}
    `,
    { variables: { playlistId } }
  )

  const { loading, data: { playlist } = {} } = result

  const ref = usePaginationObserver(result, {
    threshold: '750px',
    edgesLens,
    pageInfoLens
  })

  return (
    loading || (
      <Container>
        {playlist.images.length > 0 && (
          <BackgroundFromImage src={playlist.images[0].url} />
        )}
        <Info>
          <PlayableCollectionCover
            href={`/playlists/${playlist.id}`}
            collection={playlist}
            marginBottom="1rem"
          />
          <h2>{playlist.name}</h2>
          <div>
            <UserLink to={`/users/${playlist.owner.id}`}>
              {playlist.owner.displayName}
            </UserLink>
          </div>
          <div>
            <Typography>{playlist.tracks.pageInfo.total} Songs</Typography>
          </div>
          <div
            css={css`
              margin-top: 1.5rem;
            `}
          >
            <PlayCollectionButton size="sm" uri={playlist.uri} />
          </div>
        </Info>
        <div>
          {playlist.tracks.edges.map(({ node }) => (
            <Track
              key={node.id}
              columns="auto 1fr auto auto"
              track={node}
              playContext={playlist.uri}
            >
              <Track.Name />
              <Track.More />
              <Track.Duration />
              <Track.Details>
                <Track.ExplicitBadge /> <Track.ArtistLink /> &middot;{' '}
                <Track.AlbumLink />
              </Track.Details>
            </Track>
          ))}
          <div ref={ref} />
        </div>
      </Container>
    )
  )
}

export default Playlist
