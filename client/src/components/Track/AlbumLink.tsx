import React from 'react'
import gql from 'graphql-tag'
import Link from './Link'
import { useTrackContext } from './Context'
import { FragmentComponent } from '../../types/shared'

interface Props {}

const AlbumLink: FragmentComponent<Props> = () => {
  const { track } = useTrackContext()

  return <Link to={`/albums/${track.album.id}`}>{track.album.name}</Link>
}

AlbumLink.fragments = {
  track: gql`
    fragment TrackAlbumLink_track on Track {
      ... on SavedTrack {
        album {
          id
          name
        }
      }

      ... on FullTrack {
        album {
          id
          name
        }
      }
    }
  `
}

export default AlbumLink
