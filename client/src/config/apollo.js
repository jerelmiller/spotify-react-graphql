import { ApolloLink, Observable } from 'apollo-link'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import {
  authenticate,
  getSessionData,
  invalidateSession
} from 'redux-simple-auth'
import { setContext } from 'apollo-link-context'
import introspectionQueryResultData from './fragmentTypes.json'
import store from './store'
import { compose, prop } from 'utils/fp'

let isRefreshingToken = false

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
  ({ graphQLErrors, networkErrors, operation, forward, ...rest }) => {
    if (!graphQLErrors) {
      return
    }

    for (let err of graphQLErrors) {
      switch (err.extensions.code) {
        case 'UNAUTHENTICATED':
          // eslint-disable-next-line no-loop-func
          return new Observable(observer => {
            if (isRefreshingToken) {
              return
            }

            isRefreshingToken = true

            fetch(API_URI, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                operationName: 'RefreshSessionMutation',
                query: `
                  mutation RefreshSessionMutation($input: RefreshSessionInput!) {
                    refreshSession(input: $input) {
                      token
                    }
                  }
                `.trim(),
                variables: { input: { token: getToken() } }
              })
            })
              .then(res => res.json())
              .then(async ({ errors, data }) => {
                if (errors) {
                  throw new Error(errors[0].message)
                }

                const { token } = data.refreshSession

                await store.dispatch(authenticate('spotify', token))

                operation.setContext(({ headers = {} }) => ({
                  headers: {
                    ...headers,
                    Authorization: `Bearer ${token}`
                  }
                }))

                forward(operation).subscribe({
                  next: observer.next.bind(observer),
                  error: observer.next.bind(observer),
                  complete: observer.next.bind(observer)
                })

                isRefreshingToken = false
              })
              .catch(error => {
                isRefreshingToken = false
                store.dispatch(invalidateSession())
                observer.error(error)
              })
          })

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
