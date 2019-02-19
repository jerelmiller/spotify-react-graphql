import React, { forwardRef } from 'react'
import styled from 'styled-components'
import useLazyImage from 'hooks/useLazyImage'
import { ifElse, prop, value } from 'utils/fp'

const BackgroundImage = styled.div`
  background-image: url(${prop('src')});
  transition: opacity 0.3s ease-out;
  opacity: ${ifElse(prop('loaded'), value(1), value(0))};
`

const LazyBackgroundImage = ({ component, src, ...props }, ref) => {
  const loaded = useLazyImage(src)

  return (
    <BackgroundImage
      as={component}
      src={src}
      loaded={loaded}
      ref={ref}
      {...props}
    />
  )
}

export default forwardRef(LazyBackgroundImage)
