import React, { FC } from 'react'
import FeatherSVG, { Props as FeatherSVGProps } from './FeatherSVG'

interface OwnProps {}

type Props = OwnProps & FeatherSVGProps

const MusicIcon: FC<Props> = props => (
  <FeatherSVG {...props}>
    <path d="M9 17H5a2 2 0 0 0-2 2 2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm12-2h-4a2 2 0 0 0-2 2 2 2 0 0 0 2 2h2a2 2 0 0 0 2-2z" />
    <polyline points="9 17 9 5 21 3 21 15" />
  </FeatherSVG>
)

export default MusicIcon
