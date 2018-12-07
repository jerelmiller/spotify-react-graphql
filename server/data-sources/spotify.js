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
}

export default SpotifyAPI
