import React from 'react'
import gql from 'graphql-tag'
import Duration from '../Duration'
import styled from 'styled-components'
import { textColor } from 'styles/utils'
import { useTrackContext } from './Context'

const StyledDuration = styled(Duration)`
  font-weight: 300;
  width: 3rem;
  text-align: right;
  color: ${textColor('muted')};
  font-size: 0.9rem;
`

const TrackDuration = () => {
  const { track } = useTrackContext()

  return <StyledDuration duration={track.duration} />
}

TrackDuration.fragments = {
  track: gql`
    fragment TrackDuration_track on Track {
      duration
    }
  `
}

export default TrackDuration
