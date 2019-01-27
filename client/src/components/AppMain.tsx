import React, { FC } from 'react'
import styled from './styled-components'
import useBackgroundColor from '../hooks/useBackgroundColor'
import { prop } from '../utils/fp'

// const BACKGROUND_COLORS = {
//   '/browse/podcasts': '#673239',
//   '/browse/charts': '#224F6A',
// }

interface Props {}

interface BackdropProps {
  backgroundColor: string
  usingGradient?: boolean
}

const Main = styled.main`
  grid-area: main;
  color: #fff;
  padding: 2rem;
  position: relative;
  overflow: auto;
`

const Backdrop = styled.div<BackdropProps>`
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

const AppMain: FC<Props> = ({ children }) => {
  const { color, usingGradient } = useBackgroundColor()

  return (
    <Main>
      <Backdrop backgroundColor={color} usingGradient={usingGradient} />
      {children}
    </Main>
  )
}

export default AppMain
