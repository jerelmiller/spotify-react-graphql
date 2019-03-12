import React from 'react'
import FeatherSVG from './FeatherSVG'
import { IconComponent } from './types/IconComponent'

const CloseIcon: IconComponent = props => (
  <FeatherSVG {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </FeatherSVG>
)

export default CloseIcon
