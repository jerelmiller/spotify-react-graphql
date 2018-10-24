import React from 'react'
import { Redirect } from '@reach/router'

const LoggedOut = () => <Redirect noThrow to="/login" />

export default LoggedOut
