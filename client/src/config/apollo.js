import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_API_HOST}/graphql`
})

export default client
