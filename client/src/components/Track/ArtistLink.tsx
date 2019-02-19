import React from 'react'
import gql from 'graphql-tag'
import Link from './Link'
import { useTrackContext } from './Context'
import { FragmentComponent } from '../../types/shared'
import { TrackArtistLink_track } from './types/TrackArtistLink_track'

interface Props {}

const ArtistLink: FragmentComponent<Props> = () => {
  const { track }: { track: TrackArtistLink_track } = useTrackContext()
  const artist = track.artists[0]

  return <Link to={`/artists/${artist.id}`}>{artist.name}</Link>
}

ArtistLink.fragments = {
  track: gql`
    fragment TrackArtistLink_track on Track {
      artists {
        id
        name
      }
    }
  `
}

export default ArtistLink