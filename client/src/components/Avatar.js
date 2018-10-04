import React from 'react'
import styled from 'styled-components'

const Img = styled.img`
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
`

const Avatar = ({ image }) => <Img src={image.url} alt="avatar" />

export default Avatar
