import React from 'react'
import styled from 'styled-components'
import { prop } from 'utils/fp'

const Svg = styled.svg`
  width: ${prop('size')};
  height: ${prop('size')};
`

const PlayIcon = props => (
  <Svg viewBox="0 0 85 100" {...props}>
    <path
      fill="currentColor"
      d="M81 44.6c5 3 5 7.8 0 10.8L9 98.7c-5 3-9 .7-9-5V6.3c0-5.7 4-8 9-5l72 43.3z"
    >
      <title>PLAY</title>
    </path>
  </Svg>
)

export default PlayIcon
