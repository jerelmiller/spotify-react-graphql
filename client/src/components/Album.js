import React from 'react'
import gql from 'graphql-tag'
import LazyImage from 'components/LazyImage'
import styled from 'styled-components'

const Container = styled.div`
  text-align: center;
`

const CoverPhoto = styled(LazyImage)`
  display: block;
  margin-bottom: 0.5rem;
`

const Title = styled.span`
  font-size: 0.9rem;
`

const Album = ({ album }) => {
  // Try to get medium-sized photo first
  const coverPhoto = album.images[1] || album.images[0]

  return (
    <Container>
      <CoverPhoto src={coverPhoto.url} width="100%" placeholderHeight="200px" />
      <Title>{album.name}</Title>
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
