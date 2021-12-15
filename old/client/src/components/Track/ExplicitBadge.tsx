import React from 'react'
import gql from 'graphql-tag'
import ExplicitBadge from '../ExplicitBadge'
import { useTrackContext } from './Context'
import { TrackExplicitBadge_track } from './types/TrackExplicitBadge_track'
import { FragmentComponent, GQLFragment } from '../../types/shared'

interface Props {
  className?: string
}

const TrackExplicitBadge: FragmentComponent<Props, { track: GQLFragment }> = ({
  className
}) => {
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
