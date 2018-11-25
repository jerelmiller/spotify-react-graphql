import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { branch, compose, defaultTo, prop, noop, value } from 'utils/fp'
import useLazyImage from 'hooks/useLazyImage'

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

const LazyImage = ({ src, ...props }, ref) => {
  const loaded = useLazyImage(src)

  return <Img loaded={loaded} src={src} ref={ref} {...props} />
}

export default forwardRef(LazyImage)
