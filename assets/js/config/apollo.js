import * as AbsintheSocket from '@absinthe/socket'
import { createAbsintheSocketLink } from '@absinthe/socket-apollo-link'
import { Socket } from 'phoenix'
import { ApolloLink, Observable, split } from 'apollo-link'
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
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import { getMainDefinition } from 'apollo-utilities'

let isRefreshingToken = false
let tokenSubscribers = []

const subscribeToRefresh = fn => tokenSubscribers.push(fn)
const onTokenRefreshed = token => tokenSubscribers.forEach(fn => fn(token))

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

const absintheSocketLink = createAbsintheSocketLink(
  AbsintheSocket.create(
    new Socket(`${process.env.REACT_APP_SOCKET_HOST}/socket`, {
      params: {
        get token() {
          return getToken()
        }
      }
    })
  )
)

const retryAuthLink = onError(
  ({ graphQLErrors, networkErrors, operation, forward, response }) => {
    if (!graphQLErrors) {
      return
    }

    return new Observable(observer => {
      graphQLErrors.forEach(error => {
        switch (error.extensions.code) {
          case 'UNAUTHENTICATED':
            const retryRequest = token => {
              operation.setContext(({ headers = {} }) => ({
                headers: {
                  ...headers,
                  Authorization: `Bearer ${token}`
                }
              }))

              return forward(operation).subscribe({
                next: observer.next.bind(observer),
                error: observer.next.bind(observer),
                complete: observer.next.bind(observer)
              })
            }

            if (isRefreshingToken) {
              return subscribeToRefresh(retryRequest)
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

                onTokenRefreshed(token)
                await store.dispatch(authenticate('spotify', token))

                return retryRequest(token)
              })
              .catch(() => {
                store.dispatch(invalidateSession())
                observer.error(error)
              })
              .finally(() => {
                isRefreshingToken = false
                tokenSubscribers = []
              })

            break
          default:
            return observer.next(response)
        }
      })
    })
  }
)

const setAuthorizationLink = setContext(() => ({
  headers: { Authorization: `Bearer ${getToken()}` }
}))

const httpLink = new HttpLink({
  uri: API_URI
})

const requestLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)

    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  absintheSocketLink,
  httpLink
)

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([setAuthorizationLink, retryAuthLink, requestLink]),
  typeDefs,
  resolvers
})

cache.writeData({
  data: {
    notifications: []
  }
})

export default client
