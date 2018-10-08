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
`

const Artist = ({ artist }) => {
  const image = artist.images[0]

  return (
    <Container>
      <ArtistImage src={image.url} />
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
