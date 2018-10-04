import { RESTDataSource } from 'apollo-datasource-rest'

class SpotifyAPI extends RESTDataSource {
  baseURL = 'https://api.spotify.com/v1'

  willSendRequest(request) {
    request.headers.set('Authorization', this.context.accessToken)
  }

  async getCurrentUser() {
    return this.get('/me')
  }
}

export default SpotifyAPI
