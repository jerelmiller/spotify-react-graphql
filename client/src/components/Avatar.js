import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'

const Img = styled.img`
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
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
