import React, { useState, memo } from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import useSpotifyContext from 'hooks/useSpotifyContext'
import { textColor } from 'styles/utils'
import { prop } from 'utils/fp'

import AlbumLink from './AlbumLink'
import ArtistLink from './ArtistLink'
import Details from './Details'
import Duration from './Duration'
import ExplicitBadge from './ExplicitBadge'
import Image from './Image'
import More from './More'
import MusicIcon from '../MusicIcon'
import Name from './Name'
import PauseIcon from '../PauseIcon'
import PlayIcon from '../PlayIcon'
import PlayTrackMutation from '../PlayTrackMutation'
import SpeakerIcon from '../SpeakerIcon'
import TrackContext from './Context'

const Container = styled.div`
  display: grid;
  grid-template-columns: ${prop('columns')};
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

const Track = memo(({ children, columns, track, playContext }) => {
  const [hovered, setHovered] = useState(false)
  const { currentTrack, pause, paused, play } = useSpotifyContext()
  const isCurrent = Boolean(currentTrack) && currentTrack.id === track.id
  const iconProps = { size: '1.25rem', strokeWidth: 1 }

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
                onClick={() => playTrack(track.uri, { context: playContext })}
              />
            ) : isCurrent ? (
              <SpeakerIcon stroke="green" {...iconProps} />
            ) : (
              <MusicIcon {...iconProps} />
            )}
            {children}
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
Track.Image = Image
Track.Name = Name
Track.More = More

Track.fragments = {
  track: gql`
    fragment Track_track on Track {
      id
      uri
    }
  `
}

export default Track
