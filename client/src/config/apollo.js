import { ApolloLink } from 'apollo-link'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'

const TOKEN_KEY = 'token'

const cache = new InMemoryCache()

const retryAuthLink = onError(
  ({ graphQLErrors, networkErrors, operation, forward }) => {
    // don't handle unauthenticated when there is no token or a network error
    if (Boolean(networkErrors) || !localStorage.getItem(TOKEN_KEY)) {
      return
    }

    for (let err of graphQLErrors) {
      switch (err.extensions.code) {
        case 'UNAUTHENTICATED':
          // TODO refresh the token
          localStorage.removeItem(TOKEN_KEY)
          return forward(operation)
        default:
          return
      }
    }
  }
)

const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_API_HOST}/graphql`
})

const setAuthorizationLink = setContext(() => {
  const token = localStorage.getItem(TOKEN_KEY)

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : null
    }
  }
})

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([setAuthorizationLink, retryAuthLink, httpLink])
})

export default client
