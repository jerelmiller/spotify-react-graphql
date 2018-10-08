import { Component } from 'react'

class State extends Component {
  state = this.props.initialState || {}

  render() {
    return this.props.children({
      state: this.state,
      setState: this.setState.bind(this)
    })
  }
}

export default State
