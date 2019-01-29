import React, { FC } from 'react'
import FeatherSVG, { Props as FeatherSVGProps } from './FeatherSVG'

interface Props {}

const NextTrackIcon: FC<Props & FeatherSVGProps> = props => (
  <FeatherSVG {...props}>
    <title>next-track</title>
    <polygon points="5 4 15 12 5 20 5 4" />
    <line x1="19" y1="5" x2="19" y2="19" />
  </FeatherSVG>
)

export default NextTrackIcon
