import React, { forwardRef, ReactNode } from 'react'
import styled from '../styled'
import useLazyImage from '../hooks/useLazyImage'
import posed, { PoseGroup } from 'react-pose'
import { Omit } from '../types/shared'

interface ImgProps {
  block?: boolean
  width?: string
}

const Img = styled(
  posed.img({
    enter: { opacity: 1 },
    exit: { opacity: 0 }
  })
)<ImgProps>`
  display: ${({ block }) => (block ? 'block' : null)};
  width: ${({ width }) => width || '100%'};
  height: auto;
  transition: opacity 0.3s ease-out;
  object-fit: cover;
`

interface FallbackContainerProps {
  children: ReactNode
  width?: string
}

const FallbackContainer = styled(
  posed.div({
    enter: { opacity: 1 },
    exit: { opacity: 0 }
  })
)<FallbackContainerProps>`
  padding-bottom: ${({ children }) => (children ? null : '100%')};
  width: ${({ width }) => width || '100%'};
`

type LazyImageProps = {
  src: string
  fallback?: FallbackContainerProps['children']
  width?: string
} & ImgProps &
  Omit<FallbackContainerProps, 'children'>

const LazyImage = forwardRef<HTMLImageElement, LazyImageProps>(
  ({ src, fallback, ...props }, ref) => {
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
  }
)

export default LazyImage
