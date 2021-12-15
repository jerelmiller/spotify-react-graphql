import React from 'react'
import gql from 'graphql-tag'
import LazyImage from '../LazyImage'
import { useTrackContext } from './Context'
import PlaceholderPhoto from '../PlaceholderPhoto'

const Image = ({ size }) => {
  const { track } = useTrackContext()
  const album = track.album.images[1]

  return (
    <LazyImage src={album.url} width={size} fallback={<PlaceholderPhoto />} />
  )
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
