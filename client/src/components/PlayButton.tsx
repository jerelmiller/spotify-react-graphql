import React, { FC } from 'react'
import Button, { Props as ButtonProps } from './Button'

interface OwnProps {
  playing: boolean
}

export type Props = OwnProps & Pick<ButtonProps, 'size' | 'onClick'>

const PlayButton: FC<Props> = ({ playing, onClick, size }) => (
  <Button size={size} kind="primary" onClick={onClick}>
    {playing ? 'Pause' : 'Play'}
  </Button>
)

export default PlayButton
