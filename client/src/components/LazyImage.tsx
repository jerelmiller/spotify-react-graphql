import React, { FC, forwardRef } from 'react'
import styled from './styled-components'
import { branch, compose, defaultTo, prop, noop, value } from '../utils/fp'
import useLazyImage from '../hooks/useLazyImage'

interface Props {
  // TODO: Fix the types so that I don't have to include this. This should come
  // from the style comp
  alt?: string
  src: string
  block?: boolean
  width?: string
  height?: string
}

type ImageProps = {
  loaded?: boolean
}

const Img = styled.img<ImageProps>`
  display: ${branch(prop('block'), value('block'), noop)};
  width: ${compose(
    defaultTo('100%'),
    prop('width')
  )};
  height: ${branch(
    prop('loaded'),
    compose(
      defaultTo('auto'),
      prop('height')
    ),
    value(0)
  )};
  opacity: ${branch(prop('loaded'), value(1), value(0))};
  padding-bottom: ${branch(prop('loaded'), noop, value('100%'))};
  transition: opacity 0.3s ease-out;
  object-fit: cover;
`

const LazyImage = forwardRef<HTMLImageElement, Props>(
  ({ src, ...props }, ref) => {
    const loaded = useLazyImage(src)

    return <Img loaded={loaded} src={src} ref={ref as any} {...props} />
  }
)

export default LazyImage
