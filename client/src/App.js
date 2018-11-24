import React from 'react'
import Album from './routes/album'
import Albums from './routes/collection/albums'
import Artist from './routes/artist'
import Artists from './routes/collection/artists'
import AppLayout from './components/AppLayout'
import Login from './routes/login'
import Logout from './routes/logout'
import Browse from './routes/browse'
import BrowseDiscover from './routes/browse/discover'
import BrowseFeatured from './routes/browse/featured'
import LoggedOut from './routes/logged-out'
import Session from './components/Session'
import SetToken from './routes/set-token'
import Tracks from './routes/collection/tracks'
import { Redirect, Router } from '@reach/router'

const App = () => (
  <Session>
    {({ authenticated }) =>
      authenticated ? (
        <AppLayout>
          <Router primary={false}>
            <Redirect noThrow from="/" to="browse/featured" />
            <Album path="albums/:albumId" />
            <Artist path="artists/:artistId" />
            <Browse path="browse">
              <Redirect noThrow from="/" to="browse/featured" />
              <BrowseDiscover path="discover" />
              <BrowseFeatured path="featured" />
            </Browse>
            <Albums path="collection/albums" />
            <Artists path="collection/artists" />
            <Tracks path="collection/tracks" />
            <Logout path="logout" />

            <SetToken path="set-token" />
          </Router>
        </AppLayout>
      ) : (
        <Router primary={false}>
          <Login path="login" />
          <SetToken path="set-token" />
          <LoggedOut default />
        </Router>
      )
    }
  </Session>
)

export default App
