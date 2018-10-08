import React from 'react'
import gql from 'graphql-tag'
import LazyImage from 'components/LazyImage'
import styled from 'styled-components'

const Container = styled.div`
  text-align: center;
`

const Album = ({ album }) => {
  // Try to get medium-sized photo first
  const coverPhoto = album.images[1] || album.images[0]

  return (
    <Container>
      <LazyImage src={coverPhoto.url} width={180} height={180} />
      <span>{album.name}</span>
    </Container>
  )
}

Album.fragments = {
  album: gql`
    fragment Album_album on Album {
      id
      name
      images {
        url
      }
    }
    `
}

export default Album
