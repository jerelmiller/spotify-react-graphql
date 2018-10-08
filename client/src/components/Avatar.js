import React from 'react'
import LazyImage from './LazyImage'
import gql from 'graphql-tag'
import styled from 'styled-components'

const Img = styled(LazyImage)`
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  padding-bottom: 0;
`

const Avatar = ({ image }) => <Img src={image.url} alt="avatar" />

Avatar.fragments = {
  image: gql`
    fragment Avatar_image on Image {
      url
    }
  `
}

export default Avatar
