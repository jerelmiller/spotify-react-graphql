import React from 'react'
import AlbumTile from './AlbumTile'
import gql from 'graphql-tag'
import TileGrid from './TileGrid'
import styled from 'styled-components'

const Container = styled.div`
  &:not(:last-child) {
    margin-bottom: 4rem;
  }
`

const Title = styled.h1`
  margin-bottom: 2rem;
`

const AlbumGroup = ({ title, albums }) => (
  <Container>
    <Title>{title}</Title>
    <TileGrid fill={false} minWidth="175px">
      {albums.map(album => (
        <AlbumTile key={album.id} album={album} />
      ))}
    </TileGrid>
  </Container>
)

AlbumGroup.fragments = {
  album: gql`
    fragment AlbumGroup_album on Album {
      id
      ...Album_album
    }

    ${AlbumTile.fragments.album}
  `
}

export default AlbumGroup
