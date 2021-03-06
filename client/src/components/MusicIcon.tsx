import React from 'react'
import FeatherSVG from './FeatherSVG'
import { IconComponent } from './types/IconComponent'

const MusicIcon: IconComponent = props => (
  <FeatherSVG {...props}>
    <path d="M9 17H5a2 2 0 0 0-2 2 2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm12-2h-4a2 2 0 0 0-2 2 2 2 0 0 0 2 2h2a2 2 0 0 0 2-2z" />
    <polyline points="9 17 9 5 21 3 21 15" />
  </FeatherSVG>
)

export default MusicIcon
