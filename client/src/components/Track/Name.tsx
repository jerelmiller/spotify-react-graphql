import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { useTrackContext } from './Context'
import { FragmentComponent, GQLFragment } from '../../types/shared'
import { TrackName_track } from './types/TrackName_track'

interface Props {}

const TrackName = styled.span`
  font-weight: 300;
`

const Name: FragmentComponent<Props, { track: GQLFragment }> = () => {
  const { track }: { track: TrackName_track } = useTrackContext()

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
