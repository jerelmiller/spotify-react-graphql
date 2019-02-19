import { FC } from 'react'
import { Props as FeatherSVGProps } from '../FeatherSVG'

export type IconComponent<OwnProps = {}> = FC<OwnProps & FeatherSVGProps>
