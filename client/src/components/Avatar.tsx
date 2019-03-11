import React from 'react'
import LazyImage from './LazyImage'
import gql from 'graphql-tag'
import { css } from '../styled'
import { Avatar_image } from './types/Avatar_image'
import { FragmentComponent, GQLFragment } from '../types/shared'

interface Props {
  image: Avatar_image
}

const Avatar: FragmentComponent<Props, { image: GQLFragment }> = ({
  image
}) => (
  <LazyImage
    src={image.url}
    alt="avatar"
    css={css`
      border-radius: 50%;
      width: 2rem;
      height: 2rem;
      padding-bottom: 0;
    `}
  />
)

Avatar.fragments = {
  image: gql`
    fragment Avatar_image on Image {
      url
    }
  `
}

export default Avatar
