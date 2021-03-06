import React from 'react'
import gql from 'graphql-tag'
import LazyImage from './LazyImage'
import PlaceholderPhoto from './PlaceholderPhoto'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
  text-align: center;
`

const PlaylistTile = ({ playlist }) => {
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

PlaylistTile.fragments = {
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
