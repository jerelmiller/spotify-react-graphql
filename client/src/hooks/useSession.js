import { useContext } from 'react'
import { ReactReduxContext } from 'react-redux'
import {
  authenticate,
  getIsAuthenticated,
  getIsRestored,
  invalidateSession
} from 'redux-simple-auth'

const useSession = () => {
  const { storeState: state, store } = useContext(ReactReduxContext)

  return {
    authenticate: (...args) => store.dispatch(authenticate(...args)),
    isAuthenticated: getIsAuthenticated(state),
    isRestored: getIsRestored(state),
    invalidateSession: () => store.dispatch(invalidateSession())
  }
}

export default useSession
