import React, { Component } from 'react'
import GlobalStyle from 'styles/global'
import logo from './logo.svg'
import styled, { keyframes } from 'styled-components'

const logoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Container = styled.div`
  text-align: center;
`

const Logo = styled.img`
  animation: ${logoSpin} infinite 20s linear;
  height: 40vmin;
`

const Header = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

const Link = styled.a`
  color: #61dafb;
`

class App extends Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <Container>
          <Header className="App-header">
            <Logo src={logo} alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <Link
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </Link>
          </Header>
        </Container>
      </>
    )
  }
}

export default App
