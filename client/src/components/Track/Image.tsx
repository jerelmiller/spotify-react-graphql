import React from 'react'
import gql from 'graphql-tag'
import LazyImage from '../LazyImage'
import { useTrackContext } from './Context'
import { FragmentComponent } from '../../types/shared'

interface Props {
  size: string
}

const Image: FragmentComponent<Props> = ({ size }) => {
  const { track } = useTrackContext()
  const album = track.album.images[1]

  return <LazyImage src={album.url} height={size} width={size} />
}

Image.fragments = {
  track: gql`
    fragment TrackImage_track on Track {
      ... on FullTrack {
        album {
          images {
            url
          }
        }
      }
    }
  `
}

export default Image
