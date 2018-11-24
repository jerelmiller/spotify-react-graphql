import React from 'react'
import styled from 'styled-components'
import SpotifyLogo from 'components/SpotifyLogo'
import FlexContainer from 'components/FlexContainer'
import Button from 'components/Button'

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
      <Button as="a" href={`${process.env.REACT_APP_API_HOST}/oauth/init`}>
        Login with Spotify
      </Button>
    </FlexContainer>
  </Container>
)

export default Login
