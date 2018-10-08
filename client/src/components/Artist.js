import React from 'react'
import gql from 'graphql-tag'
import LazyImage from 'components/LazyImage'
import styled from 'styled-components'

const Container = styled.div`
  text-align: center;
`

const ArtistImage = styled(LazyImage)`
  display: block;
  margin-bottom: 0.5rem;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
`

const ImageContainer = styled.div`
  height: 0;
  position: relative;
  padding-top: 100%;
`

const Artist = ({ artist }) => {
  const image = artist.images[0]

  return (
    <Container>
      <ImageContainer>
        <ArtistImage src={image.url} />
      </ImageContainer>
      {artist.name}
    </Container>
  )
}

Artist.fragments = {
  artist: gql`
    fragment Artist_artist on Artist {
      id
      name

      images {
        url
      }
    }
  `
}

export default Artist
