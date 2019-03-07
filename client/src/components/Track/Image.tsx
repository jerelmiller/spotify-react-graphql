import React from 'react'
import gql from 'graphql-tag'
import LazyImage from '../LazyImage'
import { useTrackContext } from './Context'
import { FragmentComponent, GQLFragment } from '../../types/shared'
import PlaceholderPhoto from '../PlaceholderPhoto'

interface Props {
  size: string
}

const Image: FragmentComponent<Props, { track: GQLFragment }> = ({ size }) => {
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
