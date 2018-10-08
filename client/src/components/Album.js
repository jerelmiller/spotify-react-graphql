import React from 'react'
import gql from 'graphql-tag'
import LazyImage from 'components/LazyImage'
import styled from 'styled-components'
import { Link } from '@reach/router'
import { textColor } from 'styles/utils'

const Container = styled.div`
  text-align: center;
`

const CoverPhoto = styled(LazyImage)`
  display: block;
  margin-bottom: 0.5rem;
`

const Title = styled(Link)`
  display: block;
  font-size: 0.9rem;
`

const ArtistLink = styled(Link)`
  font-size: 0.8rem;
  color: ${textColor('muted')};
  transition: all 0.2s ease-in-out;
  border-bottom: 1px solid transparent;

  &:hover {
    color: ${textColor('primary')};
    border-bottom-color: ${textColor('primary')};
  }
`

const Album = ({ album }) => {
  // Try to get medium-sized photo first
  const coverPhoto = album.images[1] || album.images[0]

  return (
    <Container>
      <CoverPhoto src={coverPhoto.url} width="100%" />
      <Title to={`/albums/${album.id}`}>{album.name}</Title>
      <ArtistLink to={`/artists/${album.artists[0].id}`}>
        {album.artists[0].name}
      </ArtistLink>
    </Container>
  )
}

Album.fragments = {
  album: gql`
    fragment Album_album on Album {
      id
      name
      artists {
        id
        name
      }
      images {
        url
      }
    }
  `
}

export default Album