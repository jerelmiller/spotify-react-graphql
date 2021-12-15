import React from 'react'
import FeatherSVG from './FeatherSVG'
import { IconComponent } from './types/IconComponent'

const PlayIcon: IconComponent = props => (
  <FeatherSVG {...props}>
    <title>play</title>
    <polygon points="5 3 19 12 5 21 5 3" />
  </FeatherSVG>
)

export default PlayIcon
