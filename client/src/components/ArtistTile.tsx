import React from 'react'
import gql from 'graphql-tag'
import LazyImage from './LazyImage'
import styled from 'styled-components'
import { Link } from '@reach/router'
import { FragmentComponent, GQLFragment } from '../types/shared'
import { Artist_artist } from './types/Artist_artist'

interface Props {
  artist: Artist_artist
}

const Container = styled.div`
  text-align: center;
`

const ArtistImage = styled(LazyImage)`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;

  && {
    height: 100%;
  }
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

const ArtistTile: FragmentComponent<Props, { artist: GQLFragment }> = ({
  artist
}) => {
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

ArtistTile.fragments = {
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

export default ArtistTile
