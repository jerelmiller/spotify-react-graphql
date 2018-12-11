import React from 'react'
import gql from 'graphql-tag'

const PlaylistTile = ({ playlist }) => <div>{playlist.name}</div>

PlaylistTile.fragments = {
  playlist: gql`
    fragment PlaylistTile_playlist on Playlist {
      id
      name
    }
  `
}

export default PlaylistTile
