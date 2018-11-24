import React, { useEffect } from 'react'
import useQueryParams from 'hooks/useQueryParams'
import Session from 'components/Session'
import { authenticate } from 'redux-simple-auth'
import { Redirect } from '@reach/router'
import { connect } from 'react-redux'

const SetToken = ({ authenticate, navigate }) => {
  const query = useQueryParams()
  useEffect(() => {
    authenticate('spotify', query.get('token')).then(() =>
      navigate('/browse/featured')
    )
  }, [])

  return (
    <Session>
      {({ authenticated }) =>
        authenticated ? <Redirect noThrow to="/browse/featured" /> : null
      }
    </Session>
  )
}

export default connect(
  null,
  { authenticate }
)(SetToken)
