import React from 'react'
import styled from 'styled-components'
import useBackgroundColor from 'hooks/useBackgroundColor'
import { prop } from 'utils/fp'
import { Location } from '@reach/router'

const DEFAULT_BACKGROUND = '#181818'
const BACKGROUND_COLORS = {
  '/browse/featured': '#1A101C',
  '/browse/discover': '#474E52',
  '/browse/podcasts': '#673239',
  '/browse/charts': '#224F6A',
  '/browse/genres': '#272527',
  '/browse/new-releases': '#283A6A',
  '/collection/tracks': '#1F3363',
  '/collection/artists': '#4E361C',
  '/collection/albums': '#090B0F'
}

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
  }
`

const AppMain = ({ children }) => {
  const color = useBackgroundColor()

  return (
    <Location>
      {({ location }) => (
        <Main>
          <Backdrop path={location.pathname} backgroundColor={color} />
          {children}
        </Main>
      )}
    </Location>
  )
}

export default AppMain
