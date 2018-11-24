import React from 'react'
import { connect } from 'react-redux'
import { getIsAuthenticated, getIsRestored } from 'redux-simple-auth'
import SessionContext from './SessionContext'

const Session = ({ children, restored, ...props }) => (
  <SessionContext.Provider value={{ ...props, restored }}>
    {restored ? children(props) : null}
  </SessionContext.Provider>
)

const mapStateToProps = state => ({
  authenticated: getIsAuthenticated(state),
  restored: getIsRestored(state)
})

export default connect(mapStateToProps)(Session)
