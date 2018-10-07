import React, { Component } from 'react'
import client from './config/apollo'
import AppLayout from './components/AppLayout'
import Auth from './components/Auth'
import Login from './routes/login'
import GlobalStyle from './styles/global'
import Browse from './routes/browse'
import BrowseDiscover from './routes/browse/discover'
import BrowseFeatured from './routes/browse/featured'
import SetToken from './routes/set-token'
import { ApolloProvider } from 'react-apollo'
import { Redirect, Router } from '@reach/router'

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <GlobalStyle />
        <Auth>
          <AppLayout>
            <Router>
              <Redirect noThrow from="/" to="browse/featured" />
              <SetToken path="set-token" />
              <Browse path="browse">
                <BrowseDiscover path="discover" />
                <BrowseFeatured path="featured" />
              </Browse>
            </Router>
          </AppLayout>
        </Auth>
      </ApolloProvider>
    )
  }
}

export default App
