import React from 'react'
import gql from 'graphql-tag'
import LazyImage from '../LazyImage'
import { useTrackContext } from './Context'

const Image = ({ size }) => {
  const { track } = useTrackContext()
  const album = track.album.images[1]

  return <LazyImage src={album.url} height={size} width={size} />
}

Image.fragments = {
  album: gql`
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
