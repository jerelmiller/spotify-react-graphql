import React, { FC } from 'react'
import FeatherSVG, { Props as FeatherSVGProps } from './FeatherSVG'

interface Props {}

const PauseIcon: FC<Props & FeatherSVGProps> = props => (
  <FeatherSVG {...props}>
    <title>pause</title>
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </FeatherSVG>
)

export default PauseIcon
