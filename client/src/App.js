import React, { Component } from 'react'
import client from './config/apollo'
import Albums from './routes/collection/albums'
import Artists from './routes/collection/artists'
import AppLayout from './components/AppLayout'
import Auth from './components/Auth'
import Login from './routes/login'
import Browse from './routes/browse'
import BrowseDiscover from './routes/browse/discover'
import BrowseFeatured from './routes/browse/featured'
import SetToken from './routes/set-token'
import Tracks from './routes/collection/tracks'
import theme from './styles/theme'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'styled-components'
import { Redirect, Router } from '@reach/router'

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <Auth>
            <AppLayout>
              <Router primary={false}>
                <Redirect noThrow from="/" to="browse/featured" />
                <Login path="login" />
                <SetToken path="set-token" />
                <Browse path="browse">
                  <Redirect noThrow from="/" to="browse/featured" />
                  <BrowseDiscover path="discover" />
                  <BrowseFeatured path="featured" />
                </Browse>
                <Albums path="collection/albums" />
                <Artists path="collection/artists" />
                <Tracks path="collection/tracks" />
              </Router>
            </AppLayout>
          </Auth>
        </ApolloProvider>
      </ThemeProvider>
    )
  }
}

export default App
