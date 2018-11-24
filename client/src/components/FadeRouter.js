import React from 'react'
import posed, { PoseGroup } from 'react-pose'
import useLocation from 'hooks/useLocation'
import { Router } from '@reach/router'

const FadeContainer = posed.div({
  enter: { opacity: 1, transition: { ease: 'easeOut' } },
  exit: { opacity: 0, transition: { ease: 'easeOut' } }
})

const FadeRouter = props => {
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
