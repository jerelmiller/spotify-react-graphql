import React from 'react'
import FeatherSVG from './FeatherSVG'
import { IconComponent } from './types/IconComponent'

const MinusIcon: IconComponent = props => (
  <FeatherSVG {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
  </FeatherSVG>
)

export default MinusIcon
