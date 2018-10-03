import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  text-align: center;
  height: 100vh;
  display: grid;
  grid-template-areas:
    'sidebar main'
    'footer footer';
  grid-template-columns: 220px 1fr;
  grid-template-rows: 1fr auto;
`

const Sidebar = styled.aside`
  grid-area: sidebar;
  background: #121212;
`

const Main = styled.main`
  grid-area: main;
  background: #181818;
`

const Footer = styled.footer`
  grid-area: footer;
  background: #282828;
`

const AppLayout = ({ children }) => (
  <Container>
    <Sidebar />
    <Main>{children}</Main>
    <Footer />
  </Container>
)

export default AppLayout
