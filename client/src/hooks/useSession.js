import { useContext } from 'react'
import { ReactReduxContext } from 'react-redux'
import { getIsAuthenticated, getIsRestored } from 'redux-simple-auth'

const useSession = () => {
  const { storeState: state } = useContext(ReactReduxContext)

  return {
    isAuthenticated: getIsAuthenticated(state),
    isRestored: getIsRestored(state)
  }
}

export default useSession
