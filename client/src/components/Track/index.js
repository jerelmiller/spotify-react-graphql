import React, { useState, memo } from 'react'
import FlexContainer from '../FlexContainer'
import LazyImage from '../LazyImage'
import gql from 'graphql-tag'
import styled from 'styled-components'
import MoreIcon from '../MoreIcon'
import useSpotifyContext from 'hooks/useSpotifyContext'
import { Link } from '@reach/router'
import { textColor } from 'styles/utils'
import { compose, defaultTo, prop } from 'utils/fp'

import AlbumLink from './AlbumLink'
import ArtistLink from './ArtistLink'
import Details from './Details'
import Duration from './Duration'
import ExplicitBadge from './ExplicitBadge'
import Icon from './Icon'
import More from './More'
import Name from './Name'
import PlayTrackMutation from '../PlayTrackMutation'
import TrackContext from './Context'

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
  grid-template-columns: ${compose(
    defaultTo('auto 1fr auto auto'),
    prop('columns')
  )};
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
    default:
      return null
  }
}

const Track = memo(({ children, columns, track, variant, playContext }) => {
  const [hovered, setHovered] = useState(false)
  const { currentTrack } = useSpotifyContext()
  const isCurrent = Boolean(currentTrack) && currentTrack.id === track.id

  return (
    <PlayTrackMutation>
      {({ playTrack }) => (
        <TrackContext.Provider
          value={{ track, hovered, playContext, playTrack }}
        >
          <Container
            columns={columns}
            onMouseOver={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onDoubleClick={() => playTrack(track.uri, { context: playContext })}
            isCurrent={isCurrent}
          >
            {children}
            {renderVariant(variant, track)}
          </Container>
        </TrackContext.Provider>
      )}
    </PlayTrackMutation>
  )
})

Track.AlbumLink = AlbumLink
Track.ArtistLink = ArtistLink
Track.Details = Details
Track.Duration = Duration
Track.ExplicitBadge = ExplicitBadge
Track.Icon = Icon
Track.Name = Name
Track.More = More

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
