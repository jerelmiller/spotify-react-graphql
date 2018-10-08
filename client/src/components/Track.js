import React from 'react'
import Duration from './Duration'
import gql from 'graphql-tag'
import styled from 'styled-components'
import MusicIcon from './MusicIcon'
import MoreIcon from './MoreIcon'
import ExplicitBadge from './ExplicitBadge'
import { Link } from '@reach/router'
import { textColor } from 'styles/utils'

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  grid-column-gap: 1rem;
  align-items: center;
  border-radius: 2px;
  padding: 0.75rem;
  transition: background 0.2s ease-in-out;

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

const Track = ({ track }) => (
  <Container>
    <MusicIcon size="1.25rem" strokeWidth={1} />
    <TrackName>{track.name}</TrackName>
    <MoreIcon size="1.25rem" />
    <TrackDuration duration={track.duration} />
    {track.__typename === 'SavedTrack' && (
      <Info>
        {track.explicit && <ExplicitBadge />}{' '}
        <ItemLink to={`/artists/${track.artists[0].id}`}>
          {track.artists[0].name}
        </ItemLink>{' '}
        &middot;{' '}
        <ItemLink to={`/albums/${track.album.id}`}>{track.album.name}</ItemLink>
      </Info>
    )}
  </Container>
)

Track.fragments = {
  track: gql`
    fragment Track_track on Track {
      id
      name
      duration
      explicit
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
    }
  `
}

export default Track
