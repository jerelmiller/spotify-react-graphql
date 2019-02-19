import React from 'react'
import FeatherSVG from './FeatherSVG'
import { IconComponent } from './types/IconComponent'

const NextTrackIcon: IconComponent = props => (
  <FeatherSVG {...props}>
    <title>next-track</title>
    <polygon points="5 4 15 12 5 20 5 4" />
    <line x1="19" y1="5" x2="19" y2="19" />
  </FeatherSVG>
)

export default NextTrackIcon
