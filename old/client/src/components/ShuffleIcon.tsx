import React from 'react'
import FeatherSVG from './FeatherSVG'
import { IconComponent } from './types/IconComponent'

const ShuffleIcon: IconComponent = props => (
  <FeatherSVG {...props}>
    <title>shuffle</title>
    <polyline points="16 3 21 3 21 8" />
    <line x1="4" y1="20" x2="21" y2="3" />
    <polyline points="21 16 21 21 16 21" />
    <line x1="15" y1="15" x2="21" y2="21" />
    <line x1="4" y1="4" x2="9" y2="9" />
  </FeatherSVG>
)

export default ShuffleIcon
