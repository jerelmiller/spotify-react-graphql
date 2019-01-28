import { createAuthenticator } from 'redux-simple-auth'

interface Data {
  token: string
}

export default createAuthenticator<Data>({
  name: 'spotify',
  restore: data => Promise.resolve(data),
  authenticate: token => {
    if (Boolean(token)) {
      return Promise.resolve({ token })
    }

    return Promise.reject('token is missing')
  }
})
