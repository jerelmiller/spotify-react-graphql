import React, { forwardRef, FC } from 'react'
import styled, { AnyStyledComponent } from 'styled-components'
import useLazyImage from '../hooks/useLazyImage'
import { branch, prop, value } from '../utils/fp'

interface Props {
  component?: AnyStyledComponent
  src: string
}

const BackgroundImage = styled.div<{ src: string; loaded: boolean }>`
  background-image: url(${prop('src')});
  transition: opacity 0.3s ease-out;
  opacity: ${branch(prop('loaded'), value(1), value(0))};
`

const LazyBackgroundImage = forwardRef<HTMLDivElement, Props>(
  ({ component, src, ...props }, ref) => {
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
)

export default LazyBackgroundImage
