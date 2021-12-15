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
import { Redirect, Routes, Route } from 'react-router-dom'

const Routes = () => {
  const { data, isAuthenticated, isRestored } = useSession()

  return isAuthenticated ? (
    <SpotifyProvider token={data.token}>
      <AppLayout>
        <Notifications />
        <Routes>
          <Redirect from="/" to="browse/featured" />
          <Redirect from="/login" to="browse/featured" />
          <Route path="albums/:albumId" element={<Album />} />
          <Route path="artists/:artistId" element={<Artist />}>
            <Route path="/" element={<ArtistOverview />} />
            <Route path="related-artists" element={<RelatedArtists />} />
          </Route>
          <Route path="browse" element={<Browse />}>
            <Redirect from="/" to="browse/featured" />
            <Route path="featured" element={<BrowseFeatured />} />
            <Route path="genres" element={<BrowseGenres />} />
            <Route path="new-releases" element={<BrowseNewReleases />} />
          </Route>
          <Route path="collection/albums" element={<Albums />} />
          <Route path="collection/artists" element={<Artists />} />
          <Route path="collection/tracks" element={<Tracks />} />
          <Route path="genres/:genreId" element={<Genre />} />
          <Route path="logout" element={<Logout />} />
          <Route path="playlists/:playlistId" element={<Playlist />} />
        </Routes>
      </AppLayout>
    </SpotifyProvider>
  ) : isRestored ? (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="set-token" element={<SetToken />} />
      <Route path="*" element={<LoggedOut />} />
    </Routes>
  ) : null
}

export default Routes
