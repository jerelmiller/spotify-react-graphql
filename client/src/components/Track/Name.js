import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { useTrackContext } from './Context'

const TrackName = styled.span`
  font-weight: 300;
`

const Name = () => {
  const { track } = useTrackContext()

  return <TrackName>{track.name}</TrackName>
}

Name.fragments = {
  track: gql`
    fragment TrackName_track on Track {
      name
    }
  `
}

export default Name
