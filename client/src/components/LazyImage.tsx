import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { ifElse, compose, defaultTo, prop, noop, value } from '../utils/fp'
import useLazyImage from '../hooks/useLazyImage'
import { Omit } from '../types/shared'

interface LazyImageProps {
  src: string
}

interface ImgProps {
  loaded: boolean
  block?: boolean
  width?: string
}

const Img = styled.img<ImgProps>`
  display: ${ifElse(prop('block'), value('block'), noop)};
  width: ${compose(
    defaultTo('100%'),
    prop('width')
  )};
  height: ${ifElse(prop('loaded'), value('auto'), value(0))};
  opacity: ${ifElse(prop('loaded'), value(1), value(0))};
  padding-bottom: ${ifElse(prop('loaded'), noop, value('100%'))};
  transition: opacity 0.3s ease-out;
  object-fit: cover;
`

type Props = LazyImageProps & Omit<ImgProps, 'loaded'>

const LazyImage = forwardRef<HTMLImageElement, Props>(
  ({ src, ...props }, ref) => {
    const loaded = useLazyImage(src)

    return <Img loaded={loaded} src={src} ref={ref} {...props} />
  }
)

export default LazyImage
