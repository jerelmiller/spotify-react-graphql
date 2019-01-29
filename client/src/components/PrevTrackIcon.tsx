import React, { FC } from 'react'
import FeatherSVG, { Props as FeatherSVGProps } from './FeatherSVG'

interface Props {}

const PrevTrackIcon: FC<Props & FeatherSVGProps> = props => (
  <FeatherSVG {...props}>
    <title>prev-track</title>
    <polygon points="19 20 9 12 19 4 19 20" />
    <line x1="5" y1="19" x2="5" y2="5" />
  </FeatherSVG>
)

export default PrevTrackIcon
