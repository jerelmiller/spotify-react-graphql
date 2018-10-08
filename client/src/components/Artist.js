import React from 'react'
import gql from 'graphql-tag'
import LazyImage from 'components/LazyImage'
import styled from 'styled-components'
import { Link } from '@reach/router'

const Container = styled.div`
  text-align: center;
`

const ArtistImage = styled(LazyImage)`
  display: block;
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
  margin-bottom: 0.5rem;
`

const ArtistLink = styled(Link)`
  font-size: 0.9rem;
`

const Artist = ({ artist }) => {
  // try to use medium size image first
  const image = artist.images[1] || artist.images[0]

  return (
    <Container>
      <ImageContainer>
        <ArtistImage src={image.url} />
      </ImageContainer>
      <ArtistLink to={`/artists/${artist.id}`}>{artist.name}</ArtistLink>
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
