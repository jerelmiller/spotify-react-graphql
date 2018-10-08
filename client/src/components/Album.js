import React from 'react'
import gql from 'graphql-tag'
import LazyImage from 'components/LazyImage'
import styled from 'styled-components'

const Container = styled.div`
  text-align: center;
`

const CoverPhoto = styled(LazyImage)`
  display: block;
`

const Album = ({ album }) => {
  // Try to get medium-sized photo first
  const coverPhoto = album.images[1] || album.images[0]

  return (
    <Container>
      <CoverPhoto src={coverPhoto.url} width="100%" placeholderHeight="200px" />
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
