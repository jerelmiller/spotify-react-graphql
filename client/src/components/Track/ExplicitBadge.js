import React from 'react'
import gql from 'graphql-tag'
import ExplicitBadge from '../ExplicitBadge'
import { useTrackContext } from './Context'

const TrackExplicitBadge = ({ className }) => {
  const { track } = useTrackContext()

  return track.explicit ? <ExplicitBadge className={className} /> : null
}

TrackExplicitBadge.fragments = {
  track: gql`
    fragment TrackExplicitBadge_track on Track {
      explicit
    }
  `
}

export default TrackExplicitBadge
