import { createStore, applyMiddleware } from 'redux'
import { createAuthMiddleware } from 'redux-simple-auth'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from 'reducers'

const authMiddleware = createAuthMiddleware({
  authenticator: () => {}
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(authMiddleware))
)

export default store
