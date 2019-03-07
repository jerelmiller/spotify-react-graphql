import React from 'react'
import gql from 'graphql-tag'
import LazyImage from './LazyImage'
import PlaceholderPhoto from './PlaceholderPhoto'
import styled from 'styled-components'
import { Link } from '@reach/router'
import { textColor } from '../styles/utils'
import { FragmentComponent, GQLFragment } from '../types/shared'
import { Album_album } from './types/Album_album'
import PlayButton from './PlayButton'
import useHover from '../hooks/useHover'
import { ifElse, prop, value } from '../utils/fp'

interface Props {
  album: Album_album
}

const Container = styled.div`
  text-align: center;
`

const CoverPhoto = styled(LazyImage)`
  display: block;
  margin-bottom: 0.5rem;
  position: relative;
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

const CoverPhotoContainer = styled.div`
  position: relative;
`

const AlbumLink = styled(Link)<{ visible: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.75);
  opacity: ${ifElse(prop('visible'), value(1), value(0))};
  transition: opacity 0.15s ease-in-out;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const AlbumTile: FragmentComponent<Props, { album: GQLFragment }> = ({
  album
}) => {
  // Try to get medium-sized photo first
  const coverPhoto = album.images[1] || album.images[0]
  const { hovered, bind } = useHover()

  return (
    <Container>
      {coverPhoto ? (
        <CoverPhotoContainer {...bind}>
          <CoverPhoto
            src={coverPhoto.url}
            width="100%"
            fallback={<PlaceholderPhoto />}
          />
          <AlbumLink visible={hovered} to={`/albums/${album.id}`}>
            <PlayButton
              size="30%"
              onClick={e => {
                e.preventDefault()
              }}
            />
          </AlbumLink>
        </CoverPhotoContainer>
      ) : (
        <PlaceholderPhoto marginBottom="0.5rem" />
      )}
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
      uri
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

export default AlbumTile
