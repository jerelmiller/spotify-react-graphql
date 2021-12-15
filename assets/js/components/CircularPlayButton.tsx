import React, { FC } from 'react'
import PlayIcon from './PlayIcon'
import styled from '../styled'
import { prop } from '../utils/fp'
import { MouseEvent } from 'react'
import { rgba } from 'polished'
import PauseIcon from './PauseIcon'

interface Props {
  size: string
  playing: boolean
  onClick?(e: MouseEvent): void
}

const Container = styled.div<{ size: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${prop('size')};
  height: ${prop('size')};
  border-radius: 50%;
  border: 2px solid ${rgba('#fff', 0.5)};
  transition: 0.1s ease-in-out;
  background: none;
  padding: 0;
  backface-visibility: hidden;
  transform: translateZ(0) scale(1, 1);
  cursor: pointer;

  &:hover {
    transform: scale(1.1, 1.1);
    border-color: #fff;
  }
`

const CenteredPlayIcon = styled(PlayIcon)`
  position: relative;
  left: 5%;
`

const CircularPlayButton: FC<Props> = ({ size, onClick, playing }) => (
  <Container size={size} onClick={onClick}>
    {playing ? (
      <PauseIcon size="60%" fill="white" strokeWidth={0} />
    ) : (
      <CenteredPlayIcon size="60%" fill="white" />
    )}
  </Container>
)

export default CircularPlayButton
