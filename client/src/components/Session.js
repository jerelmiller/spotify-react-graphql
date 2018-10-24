import { connect } from 'react-redux'
import { getIsAuthenticated } from 'redux-simple-auth'

const Session = ({ children, ...props }) => children(props)

const mapStateToProps = state => ({
  authenticated: getIsAuthenticated(state)
})

export default connect(mapStateToProps)(Session)
