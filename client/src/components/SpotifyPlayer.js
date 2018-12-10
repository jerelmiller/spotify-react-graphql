import { useEffect } from 'react'
import useScript from 'hooks/useScript'

const SpotifyPlayer = ({ token }) => {
  useEffect(
    () => {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: 'spotify player',
          getOAuthToken: fn => fn(token)
        })

        player.addListener('initialization_error', ({ message }) =>
          console.error(message)
        )

        player.addListener('authentication_error', ({ message }) =>
          console.error(message)
        )

        player.addListener('account_error', ({ message }) =>
          console.error(message)
        )

        player.addListener('playback_error', ({ message }) =>
          console.error(message)
        )

        player.addListener('player_state_changed', state =>
          console.log({ state })
        )

        player.addListener('ready', ({ device_id }) =>
          console.log('Ready with Device ID', device_id)
        )

        player.addListener('not_ready', ({ device_id }) =>
          console.log('Device ID has gone offline', device_id)
        )

        player.connect()
      }

      return () => (window.onSpotifyWebPlaybackSDKReady = null)
    },
    [token]
  )
  useScript('https://sdk.scdn.co/spotify-player.js')

  return null
}

export default SpotifyPlayer
