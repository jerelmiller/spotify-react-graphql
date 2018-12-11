import React from 'react'
import LazyImage from 'components/LazyImage'
import PlayIcon from 'components/PlayIcon'
import PauseIcon from 'components/PauseIcon'
import NextTrackIcon from 'components/NextTrackIcon'
import PrevTrackIcon from 'components/PrevTrackIcon'
import ShuffleIcon from 'components/ShuffleIcon'
import useSpotify from 'hooks/useSpotify'
import RepeatIcon from 'components/RepeatIcon'
import styled from 'styled-components/macro'
import Timestamp from 'components/Timestamp'
import Typography from 'components/Typography'
import posed, { PoseGroup } from 'react-pose'
import { color, typography } from 'styles/utils'

const PLAYBAR_SIZE = '4px'
const ICON_SIZE = '1.1rem'

const TimeInfo = styled(Timestamp)`
  ${typography('xs')};
`

const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const Info = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: auto 1fr;
  height: 64px;
  color: ${color('offWhite')};
  align-items: center;
`

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const TimeControls = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  color: ${color('offWhite')};
`

const ControlButton = styled.button.attrs(({ fill, icon: Icon }) => ({
  children: Icon && (
    <Icon size={ICON_SIZE} fill={fill ? 'currentColor' : 'none'} />
  )
}))`
  color: ${color('offWhite')};
  background: none;
  padding: 0;
  border: none;
  cursor: pointer;
  transition: 0.15s ease-in-out;

  &:hover {
    color: ${color('white')};
  }
  &:focus {
    outline: none;
  }
`

const PlayButton = styled(ControlButton).attrs(({ paused }) => ({
  children: paused ? (
    <PlayIcon size={ICON_SIZE} fill="currentColor" />
  ) : (
    <PauseIcon size={ICON_SIZE} fill="currentColor" />
  )
}))`
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  border: 1px solid currentColor;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    margin-left: ${({ paused }) => (paused ? '3px' : null)};
  }
`

const ControlButtons = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: auto;
  grid-gap: 1rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
`

const Playbar = styled.div`
  height: ${PLAYBAR_SIZE};
  background: #393939;
  border-radius: ${PLAYBAR_SIZE};
  position: relative;

  &:after {
    content: '';
    position: absolute;
    background: ${color('offWhite')};
    top: 0;
    bottom: 0;
    left: 0;
    width: ${({ progress }) => progress * 100}%;
    border-radius: ${PLAYBAR_SIZE};
  }
`

const Container = styled(
  posed.footer({
    enter: {
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 14, mass: 0.9 }
    },
    exit: { y: '100%' }
  })
)`
  grid-area: footer;
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  background: #282828;
  padding: 1.25rem;
  color: ${color('offWhite')};
`

const SpotifyPlayer = ({ token }) => {
  const {
    isPlayingThroughPlayer,
    currentTrack,
    currentTime,
    paused,
    duration
  } = useSpotify(token)

  const { album, name: trackName, artists } = currentTrack || {}

  return (
    <PoseGroup>
      {isPlayingThroughPlayer && (
        <Container key="player">
          <Info>
            <LazyImage width="64px" height="64px" src={album.images[0].url} />
            <SongInfo>
              <Typography kind="sm" color="white">
                {trackName}
              </Typography>
              <Typography kind="xs">{artists[0].name}</Typography>
            </SongInfo>
          </Info>
          <Controls>
            <ControlButtons>
              <ControlButton icon={ShuffleIcon} />
              <ControlButton icon={PrevTrackIcon} fill />
              <PlayButton paused={paused} />
              <ControlButton icon={NextTrackIcon} fill />
              <ControlButton icon={RepeatIcon} />
            </ControlButtons>
            <TimeControls>
              <TimeInfo milliseconds={currentTime}>{currentTime}</TimeInfo>
              <Playbar progress={currentTime / duration} />
              <TimeInfo milliseconds={duration}>{duration}</TimeInfo>
            </TimeControls>
          </Controls>
          <div />
        </Container>
      )}
    </PoseGroup>
  )
}

export default SpotifyPlayer
