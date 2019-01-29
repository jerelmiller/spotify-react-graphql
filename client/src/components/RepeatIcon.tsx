import React, { FC } from 'react'
import FeatherSVG, { Props as FeatherSVGProps } from './FeatherSVG'

interface Props {}

const RepeatIcon: FC<Props & FeatherSVGProps> = props => (
  <FeatherSVG {...props}>
    <title>repeat</title>
    <polyline points="17 1 21 5 17 9" />
    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <polyline points="7 23 3 19 7 15" />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </FeatherSVG>
)

export default RepeatIcon
