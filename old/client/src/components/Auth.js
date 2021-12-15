import React, { Component } from 'react'
import Login from 'routes/login'

class Auth extends Component {
  state = {
    isAuthenticated: Boolean(localStorage.getItem('token'))
  }

  render() {
    const { children } = this.props
    const { isAuthenticated } = this.state

    return isAuthenticated ? children : <Login />
  }
}

export default Auth
