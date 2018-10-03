import React, { Component } from 'react'
import AppLayout from './components/AppLayout'
import GlobalStyle from './styles/global'
import Browse from './routes/browse'
import BrowseFeatured from './routes/browse/featured'
import BrowseDiscovered from './routes/browse/discovered'
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
              <BrowseDiscovered path="discovered" />
              <BrowseFeatured path="featured" />
            </Browse>
          </Router>
        </AppLayout>
      </>
    )
  }
}

export default App
