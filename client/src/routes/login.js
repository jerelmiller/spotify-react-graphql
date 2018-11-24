import React from 'react'
import styled from 'styled-components'
import SpotifyLogo from 'components/SpotifyLogo'
import FlexContainer from 'components/FlexContainer'

const Container = styled(FlexContainer).attrs({
  alignItems: 'center',
  justifyContent: 'center'
})`
  height: 100vh;
`

const Logo = styled(SpotifyLogo)`
  display: block;
  margin-bottom: 2.5rem;
`

const Login = () => (
  <Container>
    <FlexContainer alignItems="center" direction="column">
      <Logo size="medium" />
      <a href={`${process.env.REACT_APP_API_HOST}/oauth/init`}>
        Login with Spotify
      </a>
    </FlexContainer>
  </Container>
)

export default Login
