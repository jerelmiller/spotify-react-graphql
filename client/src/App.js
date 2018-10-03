import React, { Component } from 'react'
import AppLayout from './components/AppLayout'
import GlobalStyle from './styles/global'
import RouteBrowse from './routes/browse'
import RouteBrowseFeatured from './routes/browse/featured'
import { Redirect, Router } from '@reach/router'

class App extends Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <AppLayout>
          <Router>
            <Redirect noThrow from="/" to="browse/featured" />
            <RouteBrowse path="browse">
              <RouteBrowseFeatured path="featured" />
            </RouteBrowse>
          </Router>
        </AppLayout>
      </>
    )
  }
}

export default App
