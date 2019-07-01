import React, { useState } from 'react'
import styled from 'styled-components'
import useBackgroundColor from 'hooks/useBackgroundColor'
import ScrollContainerContext from './ScrollContainerContext'
import { prop } from 'utils/fp'

const Main = styled.main`
  grid-area: main;
  color: #fff;
  padding: 2rem;
  position: relative;
  overflow: auto;
`

const Backdrop = styled.div`
  background: ${prop('backgroundColor')};
  position: fixed;
  transition: background 0.3s ease-in;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(rgba(255, 255, 255, 0), #04060b);
    transition: opacity 0.3s ease-in-out;
    opacity: ${({ usingGradient }) => (usingGradient ? 1 : 0)};
  }
`

const AppMain = ({ children }) => {
  const [scrollContainer, setScrollContainer] = useState(null)
  const { color, usingGradient } = useBackgroundColor()

  return (
    <Main ref={setScrollContainer}>
      <Backdrop backgroundColor={color} usingGradient={usingGradient} />
      <ScrollContainerContext.Provider value={scrollContainer}>
        {children}
      </ScrollContainerContext.Provider>
    </Main>
  )
}

export default AppMain
