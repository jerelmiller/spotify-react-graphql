import React, { FC } from 'react'
import Button, { Props as ButtonProps } from './Button'
import { Omit } from '../types/shared'

interface OwnProps {
  playing: boolean
}

export type Props = OwnProps & Omit<ButtonProps, 'kind'>

const PlayButton: FC<Props> = ({ playing, ...props }) => (
  <Button kind="primary" {...props}>
    {playing ? 'Pause' : 'Play'}
  </Button>
)

export default PlayButton
