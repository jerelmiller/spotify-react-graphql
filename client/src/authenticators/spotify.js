import { createAuthenticator } from 'redux-simple-auth'

export default createAuthenticator({
  name: 'spotify',
  restore: data => (data.token ? Promise.resolve(data) : Promise.reject()),
  authenticate: token => {
    if (Boolean(token)) {
      return Promise.resolve({ token })
    }

    return Promise.reject('token is missing')
  }
})
