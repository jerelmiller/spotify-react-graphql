import { RESTDataSource } from 'apollo-datasource-rest'
import { URLSearchParams } from 'url'

class SpotifyAPI extends RESTDataSource {
  baseURL = 'https://api.spotify.com/v1'

  willSendRequest(request) {
    request.headers.set('Authorization', this.context.accessToken)
  }

  async getCurrentUser() {
    return this.get('/me')
  }

  async getViewerAlbums({ limit, offset }) {
    const params = new URLSearchParams()
    params.set('limit', limit)
    params.set('offset', offset)
    params.set('aggregate_tracks', true)

    return this.get(`/me/albums?${params}`)
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
}

export default SpotifyAPI
