import React from 'react'
import FeatherSVG, { Props as FeatherSVGProps } from './FeatherSVG'
import { FC } from 'react'

interface OwnProps {}

type Props = OwnProps & FeatherSVGProps

const MoreIcon: FC<Props> = props => (
  <FeatherSVG {...props}>
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </FeatherSVG>
)

export default MoreIcon
