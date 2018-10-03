import React, { Component } from 'react'
import GlobalStyle from 'styles/global'
import styled from 'styled-components'

const Container = styled.div`
  text-align: center;
  height: 100vh;
  display: grid;
  grid-template-columns: 220px 1fr;
`

const Sidebar = styled.aside`
  background: #121212;
`

const Main = styled.main`
  background: #181818;
`

class App extends Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <Container>
          <Sidebar />
          <Main />
        </Container>
      </>
    )
  }
}

export default App
