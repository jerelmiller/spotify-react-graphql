import { useContext } from 'react'
import { ReactReduxContext } from 'react-redux'
import {
  authenticate,
  getIsAuthenticated,
  getIsRestored,
  getSessionData,
  invalidateSession
} from 'redux-simple-auth'

const useSession = () => {
  const { storeState: state, store } = useContext(ReactReduxContext)

  return {
    authenticate: <Data = any>(name: string, data: Data) =>
      store.dispatch(authenticate(name, data)),
    isAuthenticated: getIsAuthenticated(state),
    isRestored: getIsRestored(state),
    invalidateSession: () => store.dispatch(invalidateSession()),
    data: getSessionData(state)
  }
}

export default useSession
