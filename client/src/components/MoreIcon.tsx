import React from 'react'
import FeatherSVG from './FeatherSVG'
import { IconComponent } from './types/IconComponent'

interface Props {}

const MoreIcon: IconComponent<Props> = props => (
  <FeatherSVG {...props}>
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </FeatherSVG>
)

export default MoreIcon
