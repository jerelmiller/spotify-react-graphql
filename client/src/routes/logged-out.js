import React from 'react'
import Session from 'components/Session'
import { Redirect } from '@reach/router'

const LoggedOut = () => (
  <Session>
    {({ authenticated }) => authenticated || <Redirect noThrow to="/login" />}
  </Session>
)

export default LoggedOut
