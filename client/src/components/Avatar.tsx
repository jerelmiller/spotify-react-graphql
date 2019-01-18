import * as React from 'react'
import LazyImage from './LazyImage'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Avatar_image } from './types/Avatar_image'

export interface Props {
  image: Avatar_image
}

const Img = styled(LazyImage)`
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  padding-bottom: 0;
`

const Avatar: React.SFC<Props> = ({ image }) => (
  <Img src={image.url} alt="avatar" />
)

export const fragments = {
  image: gql`
    fragment Avatar_image on Image {
      url
    }
  `
}

export default Avatar
