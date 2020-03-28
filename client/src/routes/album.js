import React from 'react'
import gql from 'graphql-tag'
import styled, { css } from '../styled'
import ReleaseYear from 'components/ReleaseYear'
import Track from 'components/Track'
import { textColor } from 'styles/utils'
import PlayableCollectionCover from '../components/PlayableCollectionCover'
import PlayCollectionButton from '../components/PlayCollectionButton'
import Button from '../components/Button'
import MoreMenu from '../components/MoreMenu'
import copyToClipboard from '../utils/copyToClipboard'
import useAlbumInLibraryToggle from '../hooks/useAlbumInLibraryToggle'
import useBackgroundFromImage from 'hooks/useBackgroundFromImage'
import useNotifyMutation from '../hooks/useNotifyMutation'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { lensPath, view } from 'utils/fp'

const albumImageUrl = lensPath(['album', 'images', 0, 'url'])

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

const ArtistLink = styled(Link)`
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

const ToggleButton = ({ album }) => {
  const { toggle, message, Icon } = useAlbumInLibraryToggle(album)

  return (
    <Button kind="ghost" size="xs" onClick={toggle}>
      <Icon size="1rem" /> {message}
    </Button>
  )
}

const AlbumMenu = ({ album }) => {
  const notify = useNotifyMutation()
  const { message, toggle } = useAlbumInLibraryToggle(album)

  return (
    <MoreMenu size="1.25rem">
      <MoreMenu.Item onClick={toggle}>{message}</MoreMenu.Item>
      <MoreMenu.Item
        onClick={() =>
          copyToClipboard(album.link).then(() =>
            notify({ message: 'Link copied to clipboard' })
          )
        }
      >
        Copy Album Link
      </MoreMenu.Item>
    </MoreMenu>
  )
}

const Album = () => {
  const { albumId } = useParams()

  const { loading, data, data: { album } = {} } = useQuery(
    gql`
      query AlbumQuery($albumId: ID!) {
        album(id: $albumId) {
          id
          name
          type
          uri
          savedToLibrary
          link @client

          releaseDate {
            ...ReleaseYear_releaseDate
          }

          primaryArtist {
            id
            name
          }

          images {
            url
            width
          }

          tracks {
            edges {
              node {
                id
                ...Track_track
                ...TrackArtistLink_track
                ...TrackDuration_track
                ...TrackName_track
              }
            }
            pageInfo {
              total
            }
          }

          ...PlayableCollectionCover_collection
        }
      }

      ${Track.fragments.track}
      ${Track.ArtistLink.fragments.track}
      ${Track.Duration.fragments.track}
      ${Track.Name.fragments.track}
      ${ReleaseYear.fragments.releaseDate}
      ${PlayableCollectionCover.fragments.collection}
    `,
    { variables: { albumId } }
  )

  useBackgroundFromImage(view(albumImageUrl, data))

  return (
    loading || (
      <Container>
        <Info>
          <PlayableCollectionCover
            href={`/albums/${album.id}`}
            collection={album}
            marginBottom="1rem"
            width="300px"
          />
          <h2>{album.name}</h2>
          <div>
            <ArtistLink to={`/artists/${album.primaryArtist.id}`}>
              {album.primaryArtist.name}
            </ArtistLink>
          </div>
          <div>
            <Typography>
              <ReleaseYear releaseDate={album.releaseDate} /> &middot;{' '}
              {album.tracks.pageInfo.total} Songs
            </Typography>
          </div>
          <div
            css={css`
              margin-top: 1.5rem;
            `}
          >
            <PlayCollectionButton size="sm" uri={album.uri} />
          </div>
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: space-around;
              margin-top: 1.5rem;
            `}
          >
            <ToggleButton album={album} />
            <AlbumMenu album={album} />
          </div>
        </Info>
        <div>
          {album.tracks.edges.map(({ node }) => (
            <Track
              key={node.id}
              columns="auto 1fr auto auto"
              track={node}
              playContext={album.uri}
            >
              <Track.Name />
              <Track.More />
              <Track.Duration />
              {album.type === 'COMPILATION' && (
                <Track.Details>
                  <Track.ExplicitBadge /> <Track.ArtistLink />
                </Track.Details>
              )}
            </Track>
          ))}
        </div>
      </Container>
    )
  )
}

export default Album
