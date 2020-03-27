import React, { FC } from 'react'
import posed, { PoseGroup } from 'react-pose'
import { useLocation } from '@reach/router'
import { Router, RouterProps } from '@reach/router'

type Props = RouterProps

const FadeContainer = posed.div({
  enter: { opacity: 1, transition: { ease: 'easeOut' } },
  exit: { opacity: 0, transition: { ease: 'easeOut' } }
})

const FadeRouter: FC<Props> = props => {
  const location = useLocation()

  return (
    <PoseGroup>
      <FadeContainer key={location.key}>
        <Router location={location} {...props} />
      </FadeContainer>
    </PoseGroup>
  )
}

export default FadeRouter
