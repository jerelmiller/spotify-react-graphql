import React, { FC } from 'react'
import posed, { PoseGroup } from 'react-pose'
import useLocation from '../hooks/useLocation'
import { Router, RouterProps } from '@reach/router'

interface Props {}

const FadeContainer = posed.div({
  enter: { opacity: 1, transition: { ease: 'easeOut' } },
  exit: { opacity: 0, transition: { ease: 'easeOut' } }
})

const FadeRouter: FC<Props & RouterProps> = props => {
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
