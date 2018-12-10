import { useEffect, useState } from 'react'
import { compose, prop } from 'utils/fp'
import useScript from './useScript'
import useTimer from './useTimer'

const DEFAULT_STATE = {
  isPlayingThroughPlayer: false,
  paused: true,
  position: 0,
  duration: 0
}

const useSpotify = token => {
  const [player, setPlayer] = useState(null)
  const [state, setState] = useState(DEFAULT_STATE)
  const [error, setError] = useState(null)
  const setSpotifyError = compose(
    setError,
    prop('message')
  )
  const [currentTime, setCurrentTime] = useState(0)

  const parseState = state =>
    state
      ? {
          isPlayingThroughPlayer: true,
          paused: state.paused,
          position: state.position,
          duration: state.duration
        }
      : DEFAULT_STATE

  const setPlayerState = compose(
    setState,
    parseState
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
      player.addListener('player_state_changed', setPlayerState)
      player
        .connect()
        .then(() => player.getCurrentState())
        .then(setPlayerState)
      return () => player && player.disconnect()
    },
    [player]
  )
  useScript('https://sdk.scdn.co/spotify-player.js')

  useTimer(
    () => {
      setCurrentTime(currentTime + 1000)
    },
    { on: !state.paused },
    [currentTime]
  )

  useEffect(
    () => {
      if (state.position != null) {
        setCurrentTime(state.position)
      }
    },
    [state.position]
  )

  return {
    error,
    currentTime,
    ...state
  }
}

export default useSpotify
