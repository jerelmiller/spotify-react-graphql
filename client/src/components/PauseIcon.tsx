import React from 'react'
import FeatherSVG from './FeatherSVG'
import { IconComponent } from './types/IconComponent'

const PauseIcon: IconComponent = props => (
  <FeatherSVG {...props}>
    <title>pause</title>
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </FeatherSVG>
)

export default PauseIcon
