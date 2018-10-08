import React, { Component } from 'react'
import styled from 'styled-components'
import { branch, compose, noop, prop, value } from 'utils/fp'
import { addUnits } from 'styles/utils'

const valueFor = propName =>
  compose(
    branch(Boolean, addUnits('px'), noop),
    prop(propName)
  )

const Img = styled.img`
  width: ${valueFor('width')};
  height: ${valueFor('height')};
  opacity: ${branch(prop('loaded'), value(1), value(0))};
  transition: opacity 0.3s ease-out;
  object-fit: cover;
`

class LazyImage extends Component {
  state = {
    loaded: false
  }

  componentDidMount() {
    const img = new window.Image()

    img.onload = () => this.setState({ loaded: true })
    img.src = this.props.src
  }

  render() {
    return <Img loaded={this.state.loaded} {...this.props} />
  }
}

export default LazyImage
