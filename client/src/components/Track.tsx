import React, { useState, memo } from 'react'
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
import useSpotifyContext from '../hooks/useSpotifyContext'
import PauseIcon from './PauseIcon'
import SpeakerIcon from './SpeakerIcon'
import { Link } from '@reach/router'
import { textColor } from '../styles/utils'
import { Track_track, Track_track_FullTrack } from './types/Track_track'

export enum TrackVariant {
  FULL = 'full',
  POPULAR = 'popular',
  SIMPLE = 'simple',
  VARIOUS_ARTIST = 'various'
}

interface Props {
  track: Track_track
  variant: TrackVariant
  playContext?: string | null
}

export const TRACK_VARIANTS = {
  FULL: 'full',
  POPULAR: 'popular',
  SIMPLE: 'simple',
  VARIOUS_ARTIST: 'various'
}

type GridColumns = { [key in TrackVariant]: string }

const GRID_COLUMNS: GridColumns = {
  [TrackVariant.POPULAR]: 'auto auto 1fr auto auto',
  [TrackVariant.FULL]: 'auto 1fr auto auto',
  [TrackVariant.SIMPLE]: 'auto 1fr auto auto',
  [TrackVariant.VARIOUS_ARTIST]: 'auto 1fr auto auto'
}

const Container = styled.div<{ isCurrent: boolean; variant: TrackVariant }>`
  display: grid;
  grid-template-columns: ${({ variant }) => GRID_COLUMNS[variant]};
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

const renderVariant = (variant: TrackVariant, track: Track_track) => {
  switch (variant) {
    case TrackVariant.FULL: {
      const {
        album,
        artists,
        explicit,
        duration
      } = track as Track_track_FullTrack
      return (
        <>
          <TrackName>{track.name}</TrackName>
          <MoreIcon size="1.25rem" stroke="white" />
          <TrackDuration duration={duration} />
          <Info>
            {explicit && <ExplicitBadge />}{' '}
            <ItemLink to={`/artists/${track.artists[0].id}`}>
              {artists[0].name}
            </ItemLink>{' '}
            &middot;{' '}
            <ItemLink
              to={`/albums/${(track as Track_track_FullTrack).album.id}`}
            >
              {album.name}
            </ItemLink>
          </Info>
        </>
      )
    }
    case TrackVariant.SIMPLE:
      return (
        <>
          <TrackName>{track.name}</TrackName>
          <MoreIcon size="1.25rem" stroke="white" />
          <TrackDuration duration={track.duration} />
        </>
      )
    case TrackVariant.POPULAR:
      const { album } = track as Track_track_FullTrack
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
    case TrackVariant.VARIOUS_ARTIST:
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
  }
}

const Track = memo<Props>(({ track, variant, playContext }) => {
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
          onDoubleClick={() =>
            track.uri && playTrack(track.uri, { context: playContext })
          }
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
              onClick={() =>
                track.uri && playTrack(track.uri, { context: playContext })
              }
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
})

export const fragments = {
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
