import React, { Component } from 'react'
import { Redirect } from '@reach/router'

class Auth extends Component {
  state = {
    isAuthenticated: Boolean(localStorage.getItem('token'))
  }

  render() {
    const { isAuthenticated } = this.state

    return isAuthenticated ? null : <Redirect noThrow to="/login" />
  }
}

export default Auth
