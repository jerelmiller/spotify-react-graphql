import React, { Component } from 'react'
import Login from '../routes/login'

interface Props {}
interface State {
  isAuthenticated: boolean
}

class Auth extends Component<Props, State> {
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
