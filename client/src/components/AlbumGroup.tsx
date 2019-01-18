import * as React from 'react'
import AlbumTile, { fragments as AlbumTileFragments } from './AlbumTile'
import gql from 'graphql-tag'
import TileGrid from './TileGrid'
import styled from 'styled-components'
import { Album_album } from './types/Album_album'

export interface Props {
  title: string
  albums: Album_album[]
}

const Container = styled.div`
  &:not(:last-child) {
    margin-bottom: 4rem;
  }
`

const Title = styled.h1`
  margin-bottom: 1rem;
`

const AlbumGroup: React.SFC<Props> = ({ title, albums }) => (
  <Container>
    <Title>{title}</Title>
    <TileGrid fill={false} minWidth="175px">
      {albums.map(album => (
        <AlbumTile key={album.id} album={album} />
      ))}
    </TileGrid>
  </Container>
)

export const fragments = {
  album: gql`
    fragment AlbumGroup_album on Album {
      id
      ...Album_album
    }

    ${AlbumTileFragments.album}
  `
}

export default AlbumGroup
