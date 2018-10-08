import React, { Component } from 'react'
import gql from 'graphql-tag'
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

class Image extends Component {
  static fragments = {
    image: gql`
      fragment Image_image on Image {
        url
        width
        height
      }
    `
  }

  state = {
    loaded: false
  }

  componentDidMount() {
    const { image } = this.props
    const img = new window.Image()

    img.onload = () => this.setState({ loaded: true })
    img.src = image.url
  }

  render() {
    const { loaded } = this.state
    const { className, image, width, height } = this.props

    return (
      <Img
        className={className}
        loaded={loaded}
        src={image.url}
        width={width || image.width}
        height={height || image.height}
      />
    )
  }
}

export default Image
