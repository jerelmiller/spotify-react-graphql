import React from 'react'
import LazyImage from './LazyImage'
import gql from 'graphql-tag'
import { css } from '@emotion/core'

const Avatar = ({ image }) => (
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
