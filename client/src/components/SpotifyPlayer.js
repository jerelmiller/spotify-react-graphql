import React from 'react'
import PlayIcon from 'components/PlayIcon'
import PauseIcon from 'components/PauseIcon'
import useSpotify from 'hooks/useSpotify'
import styled, { css } from 'styled-components'
import posed, { PoseGroup } from 'react-pose'
import { color } from 'styles/utils'

const PLAYBAR_SIZE = '4px'

const controlButton = css`
  background: none;
  padding: 0;
`

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const buttonProps = {
  size: '1.1rem',
  strokeWidth: 0,
  fill: 'offWhite'
}

const PlayButton = styled.button.attrs(({ paused }) => ({
  children: paused ? (
    <PauseIcon {...buttonProps} />
  ) : (
    <PlayIcon {...buttonProps} />
  )
}))`
  ${controlButton};
  color: ${color('offWhite')};
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  border: 1px solid currentColor;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-left: ${({ paused }) => (paused ? null : '3px')};
  }
`

const ControlButtons = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-column: auto;
  grid-gap: 1rem;
  justify-content: center;
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
  const { isPlayingThoughPlayer } = useSpotify(token)

  return (
    <PoseGroup>
      {isPlayingThoughPlayer || (
        <Container key="player">
          <div />
          <Controls>
            <ControlButtons>
              <PlayButton />
            </ControlButtons>
            <Playbar progress={0.5} />
          </Controls>
          <div />
        </Container>
      )}
    </PoseGroup>
  )
}

export default SpotifyPlayer
