import React from 'react'
import PlayIcon from 'components/PlayIcon'
import PauseIcon from 'components/PauseIcon'
import NextTrackIcon from 'components/NextTrackIcon'
import PrevTrackIcon from 'components/PrevTrackIcon'
import ShuffleIcon from 'components/ShuffleIcon'
import useSpotify from 'hooks/useSpotify'
import RepeatIcon from 'components/RepeatIcon'
import styled from 'styled-components/macro'
import posed, { PoseGroup } from 'react-pose'
import { color } from 'styles/utils'

const PLAYBAR_SIZE = '4px'
const ICON_SIZE = '1.1rem'

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const ControlButton = styled.button.attrs(({ fill, icon: Icon }) => ({
  children: Icon && <Icon size={ICON_SIZE} fill={fill ? 'offWhite' : null} />
}))`
  color: ${color('offWhite')};
  background: none;
  padding: 0;
  border: none;
`

const PlayButton = styled(ControlButton).attrs(({ paused }) => ({
  children: paused ? (
    <PlayIcon size={ICON_SIZE} fill="offWhite" />
  ) : (
    <PauseIcon size={ICON_SIZE} fill="offWhite" />
  )
}))`
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  border: 1px solid currentColor;
  display: flex;
  align-items: center;
  justify-content: center;

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
  padding: 1.25rem 0;
`

const SpotifyPlayer = ({ token }) => {
  const { isPlayingThroughPlayer, currentTime, paused, duration } = useSpotify(
    token
  )

  return (
    <PoseGroup>
      {isPlayingThroughPlayer && (
        <Container key="player">
          <div />
          <Controls>
            <ControlButtons>
              <ControlButton icon={ShuffleIcon} />
              <ControlButton icon={PrevTrackIcon} fill />
              <PlayButton paused={paused} />
              <ControlButton icon={NextTrackIcon} fill />
              <ControlButton icon={RepeatIcon} />
            </ControlButtons>
            <Playbar progress={currentTime / duration} />
          </Controls>
          <div />
        </Container>
      )}
    </PoseGroup>
  )
}

export default SpotifyPlayer
