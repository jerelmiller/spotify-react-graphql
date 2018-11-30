import { RESTDataSource } from 'apollo-datasource-rest'
import { URLSearchParams } from 'url'

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

  async getCurrentUser() {
    return this.get('/me')
  }

  async getPlaylistTracks(id, { limit, offset }) {
    const params = new URLSearchParams()
    params.set('limit', limit)
    params.set('offset', offset)

    return this.get(`/playlists/${id}/tracks?${params}`)
  }

  async getViewerAlbums({ limit, offset }) {
    const params = new URLSearchParams()
    params.set('limit', limit)
    params.set('offset', offset)
    params.set('aggregate_tracks', true)

    return this.get(`/me/albums?${params}`)
  }

  async getViewerArtists({ limit, after }) {
    const params = new URLSearchParams()
    params.set('type', 'artist')
    params.set('limit', limit)

    if (after) {
      params.set('after', after)
    }

    return this.get(`/me/following?${params}`)
  }

  async getViewerPlaylists({ limit, offset }) {
    const params = new URLSearchParams()
    params.set('limit', limit)
    params.set('offset', offset)

    return this.get(`/me/playlists?${params}`)
  }

  async getViewerTracks({ limit, offset }) {
    const params = new URLSearchParams()
    params.set('limit', limit)
    params.set('offset', offset)

    return this.get(`/me/tracks?${params}`)
  }

  async getAlbumTracks(id) {
    return this.get(`/albums/${id}/tracks`)
  }

  async getTopTracksByArtist(id) {
    const params = new URLSearchParams()
    params.set('market', 'from_token')

    return this.get(`/artists/${id}/top-tracks?${params}`)
  }
}

export default SpotifyAPI
