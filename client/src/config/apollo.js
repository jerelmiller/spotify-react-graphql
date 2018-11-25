import { ApolloLink } from 'apollo-link'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import { fetch, getSessionData, invalidateSession } from 'redux-simple-auth'
import store from './store'

const cache = new InMemoryCache()

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

const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_API_HOST}/graphql`,
  fetch: (...args) => store.dispatch(fetch(...args))
})

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([retryAuthLink, httpLink])
})

export default client
