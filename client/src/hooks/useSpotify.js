import { useEffect, useState } from 'react'
import useScript from './useScript'
import { compose, prop } from 'utils/fp'

const useSpotify = token => {
  const [player, setPlayer] = useState(null)
  const [state, setState] = useState(null)
  const [error, setError] = useState(null)
  const setSpotifyError = compose(
    setError,
    prop('message')
  )

  useEffect(
    () => {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: 'React Spotify Player',
          getOAuthToken: fn => fn(token)
        })
        setPlayer(player)
      }
      return () => {
        window.onSpotifyWebPlaybackSDKReady = null
      }
    },
    [token]
  )
  useEffect(
    () => {
      if (!player) {
        return
      }
      player.addListener('initialization_error', setSpotifyError)
      player.addListener('authentication_error', setSpotifyError)
      player.addListener('account_error', setSpotifyError)
      player.addListener('playback_error', setSpotifyError)
      player.addListener('player_state_changed', setState)
      player
        .connect()
        .then(() => player.getCurrentState())
        .then(setState)
      return () => player && player.disconnect()
    },
    [player]
  )
  useScript('https://sdk.scdn.co/spotify-player.js')

  return { error, state }
}

export default useSpotify
