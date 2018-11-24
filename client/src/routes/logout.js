import { useEffect } from 'react'
import { connect } from 'react-redux'
import { invalidateSession } from 'redux-simple-auth'

const Logout = ({ invalidateSession, navigate }) => {
  useEffect(() => {
    invalidateSession().then(() => navigate('/login'))
  }, [])

  return null
}

export default connect(
  null,
  { invalidateSession }
)(Logout)
