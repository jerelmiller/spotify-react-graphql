import React, { FC } from 'react'
import gql from 'graphql-tag'
import ExplicitBadge from '../ExplicitBadge'
import { useTrackContext } from './Context'
import { TrackExplicitBadge_track } from './types/TrackExplicitBadge_track'
import { FragmentComponent } from '../../types/shared'

interface Props {
  className?: string
}

const TrackExplicitBadge: FragmentComponent<Props> = ({ className }) => {
  const { track }: { track: TrackExplicitBadge_track } = useTrackContext()

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
