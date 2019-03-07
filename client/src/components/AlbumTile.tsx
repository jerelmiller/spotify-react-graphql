import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Link } from '@reach/router'
import { textColor } from '../styles/utils'
import { FragmentComponent, GQLFragment } from '../types/shared'
import { Album_album } from './types/Album_album'
import PlayableCollectionCover from './PlayableCollectionCover'

interface Props {
  album: Album_album
}

const Container = styled.div`
  text-align: center;
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

const AlbumTile: FragmentComponent<Props, { album: GQLFragment }> = ({
  album
}) => {
  return (
    <Container>
      <PlayableCollectionCover
        href={`/albums/${album.id}`}
        collection={album}
        marginBottom="0.5rem"
      />
      <Title to={`/albums/${album.id}`}>{album.name}</Title>
      <ArtistLink to={`/artists/${album.artists[0].id}`}>
        {album.artists[0].name}
      </ArtistLink>
    </Container>
  )
}

AlbumTile.fragments = {
  album: gql`
    fragment Album_album on Album {
      id
      name
      artists {
        id
        name
      }

      ...PlayableCollectionCover_collection
    }

    ${PlayableCollectionCover.fragments!.collection}
  `
}

export default AlbumTile
