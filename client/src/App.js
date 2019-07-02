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
import BrowseFeatured from './routes/browse/featured'
import BrowseGenres from './routes/browse/genres'
import BrowseNewReleases from './routes/browse/new-releases'
import LoggedOut from './routes/logged-out'
import SetToken from './routes/set-token'
import Tracks from './routes/collection/tracks'
import RelatedArtists from './routes/artist/related-artists'
import Playlist from './routes/playlist'
import Genre from './routes/genre'
import useSession from './hooks/useSession'
import SpotifyProvider from './components/SpotifyProvider'
import Notifications from './components/Notifications'
import { Redirect, Router } from '@reach/router'

const App = () => {
  const { data, isAuthenticated } = useSession()

  return isAuthenticated ? (
    <SpotifyProvider token={data.token}>
      <AppLayout>
        <Notifications />
        <Router primary={false}>
          <Redirect noThrow from="/" to="browse/featured" />
          <Album path="albums/:albumId" />
          <Artist path="artists/:artistId">
            <ArtistOverview path="/" />
            <RelatedArtists path="related-artists" />
          </Artist>
          <Browse path="browse">
            <Redirect noThrow from="/" to="browse/featured" />
            {/*
            <BrowseDiscover path="discover" />
            */}
            <BrowseFeatured path="featured" />
            <BrowseGenres path="genres" />
            <BrowseNewReleases path="new-releases" />
          </Browse>
          <Albums path="collection/albums" />
          <Artists path="collection/artists" />
          <Tracks path="collection/tracks" />
          <Playlist path="playlists/:playlistId" />
          <Genre path="genres/:genreId" />
          <Logout path="logout" />
        </Router>
      </AppLayout>
    </SpotifyProvider>
  ) : (
    <Router primary={false}>
      <Login path="login" />
      <SetToken path="set-token" />
      <LoggedOut default />
    </Router>
  )
}

export default App
