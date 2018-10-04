import React from 'react'

const Login = () => (
  <div>
    <a href={`${process.env.REACT_APP_API_HOST}/oauth/init`}>
      Login with Spotify
    </a>
  </div>
)

export default Login
