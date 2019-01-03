import React, { useState } from 'react'
import Duration from './Duration'
import FlexContainer from './FlexContainer'
import LazyImage from './LazyImage'
import PlayIcon from './PlayIcon'
import PlayTrackMutation from './PlayTrackMutation'
import gql from 'graphql-tag'
import styled from 'styled-components'
import MusicIcon from './MusicIcon'
import MoreIcon from './MoreIcon'
import ExplicitBadge from './ExplicitBadge'
import useSpotifyContext from 'hooks/useSpotifyContext'
import PauseIcon from './PauseIcon'
import SpeakerIcon from './SpeakerIcon'
import { Link } from '@reach/router'
import { textColor } from 'styles/utils'

export const TRACK_VARIANTS = {
  FULL: 'full',
  POPULAR: 'popular',
  SIMPLE: 'simple',
  VARIOUS_ARTIST: 'various'
}

const GRID_COLUMNS = {
  [TRACK_VARIANTS.POPULAR]: 'auto auto 1fr auto auto',
  default: 'auto 1fr auto auto'
}

const Container = styled.div`
  display: grid;
  grid-template-columns: ${({ variant }) =>
    GRID_COLUMNS[variant] || GRID_COLUMNS.default};
  grid-column-gap: 1rem;
  align-items: center;
  border-radius: 2px;
  padding: 0.75rem;
  transition: background 0.2s ease-in-out;
  color: ${({ isCurrent }) => isCurrent && textColor('highlight')};

  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`

const TrackName = styled.span`
  font-weight: 300;
`

const TrackDuration = styled(Duration)`
  font-weight: 300;
  width: 3rem;
  text-align: right;
  color: ${textColor('muted')};
  font-size: 0.9rem;
`

const Info = styled.div`
  grid-column: 2 / -1;
  color: ${textColor('muted')};
`

const ItemLink = styled(Link)`
  border-bottom: 1px solid transparent;
  transition: all 0.2s ease-in-out;
  font-size: 0.85rem;
  font-weight: 300;

  &:hover {
    color: #fff;
    border-bottom-color: #fff;
  }
`

const InlineExplicitBadge = styled(ExplicitBadge)`
  align-self: flex-start;
`

const renderVariant = (variant, track) => {
  switch (variant) {
    case TRACK_VARIANTS.FULL:
      return (
        <>
          <TrackName>{track.name}</TrackName>
          <MoreIcon size="1.25rem" stroke="white" />
          <TrackDuration duration={track.duration} />
          <Info>
            {track.explicit && <ExplicitBadge />}{' '}
            <ItemLink to={`/artists/${track.artists[0].id}`}>
              {track.artists[0].name}
            </ItemLink>{' '}
            &middot;{' '}
            <ItemLink to={`/albums/${track.album.id}`}>
              {track.album.name}
            </ItemLink>
          </Info>
        </>
      )
    case TRACK_VARIANTS.SIMPLE:
      return (
        <>
          <TrackName>{track.name}</TrackName>
          <MoreIcon size="1.25rem" stroke="white" />
          <TrackDuration duration={track.duration} />
        </>
      )
    case TRACK_VARIANTS.POPULAR:
      const { album } = track
      const { url } = album.images[1]

      return (
        <>
          <LazyImage src={url} width="50px" height="50px" />
          <FlexContainer direction="column">
            <TrackName>{track.name}</TrackName>
            {track.explicit && <InlineExplicitBadge />}
          </FlexContainer>
          <MoreIcon size="1.25rem" stroke="white" />
          <TrackDuration duration={track.duration} />
        </>
      )
    case TRACK_VARIANTS.VARIOUS_ARTIST:
      return (
        <>
          <TrackName>{track.name}</TrackName>
          <MoreIcon size="1.25rem" />
          <TrackDuration duration={track.duration} />
          <Info>
            {track.explicit && <ExplicitBadge />}{' '}
            <ItemLink to={`/artists/${track.artists[0].id}`}>
              {track.artists[0].name}
            </ItemLink>{' '}
          </Info>
        </>
      )

    default:
      throw new Error(`Track: ${variant} is not a valid variant`)
  }
}

const Track = ({ track, variant }) => {
  const [hovered, setHovered] = useState(false)
  const { currentTrack, pause, play, paused } = useSpotifyContext()
  const isCurrent = Boolean(currentTrack) && currentTrack.id === track.id
  const iconProps = { size: '1.25rem', strokeWidth: 1 }

  return (
    <PlayTrackMutation>
      {({ playTrack }) => (
        <Container
          variant={variant}
          onMouseOver={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onDoubleClick={() => playTrack(track.uri)}
          isCurrent={isCurrent}
        >
          {isCurrent && hovered && paused ? (
            <PlayIcon
              {...iconProps}
              fill="white"
              stroke="white"
              cursor="pointer"
              onClick={play}
            />
          ) : isCurrent && hovered && !paused ? (
            <PauseIcon
              {...iconProps}
              fill="white"
              stroke="white"
              cursor="pointer"
              onClick={pause}
            />
          ) : hovered ? (
            <PlayIcon
              {...iconProps}
              fill="currentColor"
              cursor="pointer"
              onClick={() => playTrack(track.uri)}
            />
          ) : isCurrent ? (
            <SpeakerIcon stroke="green" {...iconProps} />
          ) : (
            <MusicIcon {...iconProps} />
          )}
          {renderVariant(variant, track)}
        </Container>
      )}
    </PlayTrackMutation>
  )
}

Track.fragments = {
  track: gql`
    fragment Track_track on Track {
      id
      name
      duration
      explicit
      uri
      __typename

      artists {
        id
        name
      }

      ... on SavedTrack {
        album {
          id
          name
        }
      }

      ... on FullTrack {
        album {
          id
          name
          images {
            url
          }
        }
      }
    }
  `
}

export default Track
