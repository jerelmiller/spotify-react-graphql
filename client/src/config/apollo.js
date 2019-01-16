import { ApolloLink } from 'apollo-link'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import { getSessionData, invalidateSession } from 'redux-simple-auth'
import { setContext } from 'apollo-link-context'
import introspectionQueryResultData from './fragmentTypes.json'
import store from './store'
import { compose, prop } from 'utils/fp'

const API_URI = `${process.env.REACT_APP_API_HOST}/graphql`

const getToken = compose(
  prop('token'),
  getSessionData,
  store.getState
)

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
})

const cache = new InMemoryCache({ fragmentMatcher })

const retryAuthLink = onError(
  ({ graphQLErrors, networkErrors, operation, forward }) => {
    const { token } = getSessionData(store.getState())
    // don't handle unauthenticated when there is no token or a network error
    if (Boolean(networkErrors) || !token) {
      return
    }

    for (let err of graphQLErrors) {
      switch (err.extensions.code) {
        case 'UNAUTHENTICATED':
          // TODO refresh the token
          return store.dispatch(invalidateSession())
        default:
          return
      }
    }
  }
)

const setAuthorizationLink = setContext(() => ({
  headers: { Authorization: `Bearer ${getToken()}` }
}))

const httpLink = new HttpLink({
  uri: API_URI
})

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([setAuthorizationLink, retryAuthLink, httpLink])
})

export default client
