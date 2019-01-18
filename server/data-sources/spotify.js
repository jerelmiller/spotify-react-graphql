import { AuthenticationError } from 'apollo-server'
import { RESTDataSource } from 'apollo-datasource-rest'
import { URLSearchParams } from 'url'
import { filterNullValues, prop } from '../utils/fp'
import { session as Session } from '../models'
import fetch from 'node-fetch'

class SpotifyAPI extends RESTDataSource {
  baseURL = 'https://api.spotify.com/v1'

  willSendRequest(request) {
    request.headers.set('Authorization', this.context.accessToken)
  }

  getAlbum(id) {
    return this.get(`/albums/${id}`)
  }

  getArtist(id) {
    return this.get(`/artists/${id}`)
  }

  getArtistAlbums(id, { limit, offset }) {
    const params = new URLSearchParams()
    params.set('limit', limit)
    params.set('offset', offset)

    return this.get(`/artists/${id}/albums?${params}`)
  }

  getCurrentUser() {
    return this.get('/me')
  }

  getPlaylistTracks(id, { limit, offset }) {
    const params = new URLSearchParams()
    params.set('limit', limit)
    params.set('offset', offset)

    return this.get(`/playlists/${id}/tracks?${params}`)
  }

  getViewerAlbums({ limit, offset }) {
    const params = new URLSearchParams()
    params.set('limit', limit)
    params.set('offset', offset)
    params.set('aggregate_tracks', true)

    return this.get(`/me/albums?${params}`)
  }

  getViewerArtists({ limit, after }) {
    const params = new URLSearchParams()
    params.set('type', 'artist')
    params.set('limit', limit)

    if (after) {
      params.set('after', after)
    }

    return this.get(`/me/following?${params}`)
  }

  getViewerPlaylists({ limit, offset }) {
    const params = new URLSearchParams()
    params.set('limit', limit)
    params.set('offset', offset)

    return this.get(`/me/playlists?${params}`)
  }

  getViewerTracks({ limit, offset }) {
    const params = new URLSearchParams()
    params.set('limit', limit)
    params.set('offset', offset)

    return this.get(`/me/tracks?${params}`)
  }

  getAlbumTracks(id) {
    return this.get(`/albums/${id}/tracks`)
  }

  getTopTracksByArtist(id) {
    const params = new URLSearchParams()
    params.set('market', 'from_token')

    return this.get(`/artists/${id}/top-tracks?${params}`)
  }

  getRelatedArtists(id) {
    return this.get(`/artists/${id}/related-artists`)
  }

  getPlaylist(id) {
    return this.get(`/playlists/${id}`)
  }

  getNewReleases({ limit, offset }) {
    const params = new URLSearchParams()
    params.set('limit', limit)
    params.set('offset', offset)

    return this.get(`/browse/new-releases?${params}`)
  }

  getFeaturedPlaylists({ limit, offset }) {
    const params = new URLSearchParams()
    params.set('limit', limit)
    params.set('offset', offset)

    return this.get(`/browse/featured-playlists?${params}`)
  }

  getCategories({ limit, offset }) {
    const params = new URLSearchParams()
    params.set('limit', limit)
    params.set('offset', offset)

    return this.get(`/browse/categories?${params}`)
  }

  getCategory(id) {
    return this.get(`/browse/categories/${id}`)
  }

  getPlaylistsByCategory(categoryId, { limit, offset }) {
    const params = new URLSearchParams()
    params.set('limit', limit)
    params.set('offset', offset)

    return this.get(`/browse/categories/${categoryId}/playlists?${params}`)
  }

  playTrack(uri, { deviceId, contextUri }) {
    const params = new URLSearchParams()
    deviceId && params.set('device_id', deviceId)

    return this.put(
      `/me/player/play?${params}`,
      filterNullValues({
        uris: !contextUri && [uri],
        context_uri: contextUri,
        offset: contextUri && {
          uri
        }
      })
    )
  }

  async refreshSession(accessToken) {
    try {
      const session = await Session.findOne({ where: { accessToken } })
      const body = new URLSearchParams()

      body.append('grant_type', 'refresh_token')
      body.append('refresh_token', session.get('refreshToken'))

      const { error, access_token, scope, expires_in } = await fetch(
        'https://accounts.spotify.com/api/token',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body
        }
      ).then(res => res.json())

      if (error) {
        throw new Error(error)
      }

      await session.update({
        accessToken: access_token,
        scopes: scope,
        expiresAt: new Date(Date.now() + expires_in + 1000)
      })

      return { token: access_token }
    } catch (e) {
      throw new AuthenticationError(e.message)
    }
  }
}

export default SpotifyAPI
