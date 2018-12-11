import { useEffect, useState } from 'react'
import { compose, prop } from 'utils/fp'
import useScript from './useScript'
import useTimer from './useTimer'

const DEFAULT_STATE = {
  paused: true,
  position: 0,
  duration: 0
}

const useSpotify = token => {
  const [player, setPlayer] = useState(null)
  const [state, setState] = useState(null)
  const [error, setError] = useState(null)
  const setSpotifyError = compose(
    setError,
    prop('message')
  )
  const [currentTime, setCurrentTime] = useState(0)

  const parseState = state =>
    state
      ? {
          paused: state.paused,
          position: state.position,
          duration: state.duration,
          currentTrack: state.track_window.current_track
        }
      : DEFAULT_STATE

  const isAllowed = action => Boolean(state) && !state.disallows[action]

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

  useTimer(
    () => {
      setCurrentTime(currentTime + 1000)
    },
    { on: Boolean(state) && !state.paused },
    [currentTime]
  )

  useEffect(
    () => {
      if (state && state.position != null) {
        setCurrentTime(state.position)
      }
    },
    [state && state.position]
  )

  return {
    error,
    currentTime,
    isPlayingThroughPlayer: Boolean(state),
    pause: () => player.pause(),
    play: () => player.resume(),
    playNextTrack: () => player.nextTrack(),
    playPreviousTrack: () => player.previousTrack(),
    togglePlayback: () => player.togglePlay(),
    allowedActions: {
      play: !isAllowed('pausing'),
      pause: isAllowed('pausing'),
      playPrevTrack: isAllowed('skipping_prev'),
      playNextTrack: isAllowed('skipping_next')
    },
    ...parseState(state)
  }
}

export default useSpotify
