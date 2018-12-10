import React from 'react'
import Album from './routes/album'
import Albums from './routes/collection/albums'
import Artist from './routes/artist'
import ArtistOverview from './routes/artist/overview'
import Artists from './routes/collection/artists'
import AppLayout from './components/AppLayout'
import Login from './routes/login'
import Logout from './routes/logout'
import Browse from './routes/browse'
import BrowseDiscover from './routes/browse/discover'
import BrowseFeatured from './routes/browse/featured'
import LoggedOut from './routes/logged-out'
import SetToken from './routes/set-token'
import Tracks from './routes/collection/tracks'
import RelatedArtists from './routes/artist/related-artists'
import Playlist from './routes/playlist'
import SpotifyPlayer from './components/SpotifyPlayer'
import useSession from './hooks/useSession'
import { Redirect, Router } from '@reach/router'

const App = () => {
  const { data, isAuthenticated } = useSession()

  return isAuthenticated ? (
    <AppLayout>
      <Router primary={false}>
        <Redirect noThrow from="/" to="browse/featured" />
        <Album path="albums/:albumId" />
        <Artist path="artists/:artistId">
          <ArtistOverview path="/" />
          <RelatedArtists path="related-artists" />
        </Artist>
        <Browse path="browse">
          <Redirect noThrow from="/" to="browse/featured" />
          <BrowseDiscover path="discover" />
          <BrowseFeatured path="featured" />
        </Browse>
        <Albums path="collection/albums" />
        <Artists path="collection/artists" />
        <Tracks path="collection/tracks" />
        <Playlist path="playlists/:playlistId" />
        <Logout path="logout" />
      </Router>
      <SpotifyPlayer token={data.token} />
    </AppLayout>
  ) : (
    <Router primary={false}>
      <Login path="login" />
      <SetToken path="set-token" />
      <LoggedOut default />
    </Router>
  )
}

export default App
