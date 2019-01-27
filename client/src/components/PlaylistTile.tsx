import React, { FC } from 'react'
import gql from 'graphql-tag'
import LazyImage from './LazyImage'
import PlaceholderPhoto from './PlaceholderPhoto'
import styled from 'styled-components'
import { Link } from '@reach/router'
import { PlaylistTile_playlist } from './types/PlaylistTile_playlist'

interface Props {
  playlist: PlaylistTile_playlist
}

const Container = styled.div`
  text-align: center;
`

const PlaylistTile: FC<Props> = ({ playlist }) => {
  const photo = playlist.images[0]
  const href = `/playlists/${playlist.id}`

  return (
    <Container>
      <Link to={href}>
        {photo ? (
          <LazyImage src={photo.url} width="100%" />
        ) : (
          <PlaceholderPhoto />
        )}
      </Link>
      <Link to={href}>{playlist.name}</Link>
    </Container>
  )
}

export const fragments = {
  playlist: gql`
    fragment PlaylistTile_playlist on Playlist {
      id
      name
      images {
        url
      }
    }
  `
}

export default PlaylistTile
