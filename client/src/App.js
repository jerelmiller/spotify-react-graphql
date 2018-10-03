import React, { Component } from 'react'
import AppLayout from './components/AppLayout'
import GlobalStyle from './styles/global'
import Browse from './routes/browse'
import BrowseDiscover from './routes/browse/discover'
import BrowseFeatured from './routes/browse/featured'
import { Redirect, Router } from '@reach/router'

class App extends Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <AppLayout>
          <Router>
            <Redirect noThrow from="/" to="browse/featured" />
            <Browse path="browse">
              <BrowseDiscover path="discover" />
              <BrowseFeatured path="featured" />
            </Browse>
          </Router>
        </AppLayout>
      </>
    )
  }
}

export default App
