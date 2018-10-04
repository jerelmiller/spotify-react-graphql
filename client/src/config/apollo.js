import { ApolloLink } from 'apollo-link'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

const cache = new InMemoryCache()

const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_API_HOST}/graphql`
})

const setAuthorizationLink = setContext(() => {
  const token = localStorage.getItem('token')

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : null
    }
  }
})

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([setAuthorizationLink, httpLink])
})

export default client
