import React from 'react'
import gql from 'graphql-tag'

import MusicIcon from '../MusicIcon'
import PauseIcon from '../PauseIcon'
import PlayIcon from '../PlayIcon'
import SpeakerIcon from '../SpeakerIcon'
import useSpotifyContext from 'hooks/useSpotifyContext'
import { useTrackContext } from './Context'

const Icon = () => {
  const { track, hovered, playContext, playTrack } = useTrackContext()
  const { currentTrack, pause, paused, play } = useSpotifyContext()
  const isCurrent = Boolean(currentTrack) && currentTrack.id === track.id
  const iconProps = { size: '1.25rem', strokeWidth: 1 }

  return isCurrent && hovered && paused ? (
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
  )
}

Icon.fragments = {
  track: gql`
    fragment TrackIcon_track on Track {
      id
      uri
    }
  `
}

export default Icon
