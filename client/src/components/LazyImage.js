import React, { Component } from 'react'
import styled from 'styled-components'
import { branch, compose, defaultTo, prop, noop, value } from 'utils/fp'

const Img = styled.img`
  display: ${branch(prop('block'), value('block'), noop)};
  width: ${compose(
    defaultTo('100%'),
    prop('width')
  )};
  height: ${branch(prop('loaded'), value('auto'), value(0))};
  opacity: ${branch(prop('loaded'), value(1), value(0))};
  padding-bottom: ${branch(prop('loaded'), noop, value('100%'))};
  transition: opacity 0.3s ease-out;
  object-fit: cover;
`

class LazyImage extends Component {
  state = {
    loaded: false
  }

  componentDidMount() {
    this.loadImage()
  }

  componentDidUpdate({ src: prevSrc }) {
    const { src } = this.props

    if (prevSrc !== src) {
      this.setState({ loaded: false })
      this.loadImage()
    }
  }

  loadImage = () => {
    const { src } = this.props

    if (!src) {
      return
    }

    const img = new window.Image()

    img.onload = () => this.setState({ loaded: true })
    img.src = this.props.src
  }

  render() {
    return <Img loaded={this.state.loaded} {...this.props} />
  }
}

export default LazyImage
