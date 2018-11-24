import { connect } from 'react-redux'
import { getIsAuthenticated, getIsRestored } from 'redux-simple-auth'

const Session = ({ children, restored, ...props }) =>
  restored ? children(props) : null

const mapStateToProps = state => ({
  authenticated: getIsAuthenticated(state),
  restored: getIsRestored(state)
})

export default connect(mapStateToProps)(Session)
