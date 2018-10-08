import React from 'react'
import gql from 'graphql-tag'
import Image from 'components/Image'
import styled from 'styled-components'

const Container = styled.div`
  text-align: center;
`

const Album = ({ album }) => (
  <Container>
    <Image
      image={album.images[1] || album.images[0]}
      width={180}
      height={180}
    />
    <span>{album.name}</span>
  </Container>
)

Album.fragments = {
  album: gql`
    fragment Album_album on Album {
      id
      name
      images {
        ...Image_image
      }
    }

    ${Image.fragments.image}
  `
}

export default Album
