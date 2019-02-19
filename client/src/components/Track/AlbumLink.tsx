import React from 'react'
import gql from 'graphql-tag'
import Link from './Link'
import { useTrackContext } from './Context'
import { FragmentComponent } from '../../types/shared'
import { TrackAlbumLink_track } from './types/TrackAlbumLink_track'

interface Props {}

const AlbumLink: FragmentComponent<Props> = () => {
  const { track }: { track: TrackAlbumLink_track } = useTrackContext()

  if (track.__typename === 'SimpleTrack') {
    return null
  }

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
