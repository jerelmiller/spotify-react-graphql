import React, { forwardRef, ReactNode } from 'react'
import styled from '../styled'
import useLazyImage from '../hooks/useLazyImage'
import posed, { PoseGroup } from 'react-pose'

interface LazyImageProps {
  src: string
  block?: boolean
  fallback?: ReactNode
  width?: string
}

type ImgProps = Pick<LazyImageProps, 'block' | 'width'>

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

type FallbackContainerProps = Pick<LazyImageProps, 'width'> & {
  children: ReactNode
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

const LazyImage = forwardRef<HTMLImageElement, LazyImageProps>(
  ({ src, width, fallback, ...props }, ref) => {
    const loaded = useLazyImage(src)

    return (
      <PoseGroup>
        {loaded ? (
          <Img key="img" src={src} width={width} ref={ref} {...props} />
        ) : (
          <FallbackContainer key="fallback" width={width} {...props}>
            {fallback}
          </FallbackContainer>
        )}
      </PoseGroup>
    )
  }
)

export default LazyImage
