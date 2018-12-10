import React from 'react'
import MusicIcon from './MusicIcon'
import styled from 'styled-components'
import { prop } from 'utils/fp'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 50% 0;
  background: #282828;
  position: relative;
  margin-bottom: ${prop('marginBottom')};

  svg {
    position: absolute;
    stroke-width: 1;
  }
`

const PlaceholderPhoto = ({ marginBottom }) => (
  <Container marginBottom={marginBottom}>
    <MusicIcon size="30%" />
  </Container>
)

export default PlaceholderPhoto
