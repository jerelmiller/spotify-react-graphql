import React from 'react'
import useSpotify from 'hooks/useSpotify'
import styled from 'styled-components'
import posed, { PoseGroup } from 'react-pose'

const Container = styled(
  posed.footer({
    enter: {
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 14, mass: 0.9 }
    },
    exit: { y: '100%' }
  })
)`
  grid-area: footer;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100px;
  background: #282828;
`

const SpotifyPlayer = ({ token }) => {
  const { error, state } = useSpotify(token)

  console.log({ error, state })

  return <PoseGroup>{state && <Container key="player" />}</PoseGroup>
}

export default SpotifyPlayer
