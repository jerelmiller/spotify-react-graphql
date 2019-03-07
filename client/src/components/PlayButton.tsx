import React, { FC } from 'react'
import PlayIcon from './PlayIcon'
import styled from 'styled-components'
import { prop } from '../utils/fp'
import { MouseEvent } from 'react'
import { rgba } from 'polished'

interface Props {
  size: string
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

const PlayButton: FC<Props> = ({ size, onClick }) => (
  <Container size={size} onClick={onClick}>
    <CenteredPlayIcon size="60%" fill="white" />
  </Container>
)

export default PlayButton