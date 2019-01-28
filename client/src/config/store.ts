import { createStore, applyMiddleware } from 'redux'
import { createAuthMiddleware } from 'redux-simple-auth'
import { composeWithDevTools } from 'redux-devtools-extension'
import spotify from '../authenticators/spotify'
import rootReducer from '../reducers'

interface Data {
  token: string
}

const authMiddleware = createAuthMiddleware<Data>({
  authenticators: [spotify],
  authorize: ({ token }, header) => {
    if (token) {
      header('Authorization', `Bearer ${token}`)
    }
  }
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(authMiddleware))
)

export default store
