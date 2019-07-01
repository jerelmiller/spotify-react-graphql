import React, { forwardRef, HTMLProps, ReactNode } from 'react'
import styled from '@emotion/styled'
import useLazyImage from '../hooks/useLazyImage'
import posed, { PoseGroup } from 'react-pose'

const Img = styled(
  posed.img({
    enter: { opacity: 1 },
    exit: { opacity: 0 }
  })
)`
  display: ${({ block }) => (block ? 'block' : null)};
  width: ${({ width }) => width || '100%'};
  height: auto;
  transition: opacity 0.3s ease-out;
  object-fit: cover;
`

const FallbackContainer = styled(
  posed.div({
    enter: { opacity: 1 },
    exit: { opacity: 0 }
  })
)`
  padding-bottom: ${({ children }) => (children ? null : '100%')};
  width: ${({ width }) => width || '100%'};
`

const LazyImage = forwardRef(({ src, fallback, ...props }, ref) => {
  const loaded = useLazyImage(src)

  return (
    <PoseGroup>
      {loaded ? (
        <Img key="img" src={src} ref={ref} {...props} />
      ) : (
        <FallbackContainer key="fallback" {...props}>
          {fallback}
        </FallbackContainer>
      )}
    </PoseGroup>
  )
})

export default LazyImage
