import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import MusicIcon from './MusicIcon'

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  grid-gap: 1rem;
  align-items: center;
  border-radius: 2px;
  padding: 0.75rem;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`

const Track = ({ track }) => (
  <Container>
    <MusicIcon size="1.25rem" strokeWidth={1} />
    {track.name}
  </Container>
)

Track.fragments = {
  track: gql`
    fragment Track_track on Track {
      id
      name
      album {
        id
        name
      }
      artists {
        id
        name
      }
    }
  `
}

export default Track
