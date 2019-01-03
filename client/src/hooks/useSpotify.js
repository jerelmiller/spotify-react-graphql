import { useEffect, useState } from 'react'
import { compose, prop } from 'utils/fp'
import useScript from './useScript'
import useTimer from './useTimer'
import parseSpotifyId from 'utils/parseSpotifyId'

const DEFAULT_STATE = {
  paused: true,
  position: 0,
  duration: 0
}

const useSpotify = token => {
  const [timestamp, setTimestamp] = useState(null)
  const [player, setPlayer] = useState(null)
  const [deviceId, setDeviceId] = useState(null)
  const [state, setState] = useState(null)
  const [error, setError] = useState(null)
  const setSpotifyError = compose(
    setError,
    prop('message')
  )
  const [currentTime, setCurrentTime] = useState(0)

  const parseState = state => {
    if (!state) {
      return DEFAULT_STATE
    }

    const { current_track: currentTrack } = state.track_window

    return {
      paused: state.paused,
      position: state.position,
      duration: state.duration,
      currentTrack: {
        ...currentTrack,
        album: {
          ...currentTrack.album,
          id: parseSpotifyId(currentTrack.album.uri).id
        },
        artists: currentTrack.artists.map(artist => ({
          ...artist,
          id: parseSpotifyId(artist.uri).id
        }))
      }
    }
  }

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
      player.addListener('ready', ({ device_id: deviceId }) =>
        setDeviceId(deviceId)
      )
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
      if (state && timestamp) {
        // Ensure a more accurate `currentTime` in case the timer doesn't fire
        // exactly 1 second later.
        setCurrentTime(state.position + (Date.now() - timestamp))
      }
    },
    { on: Boolean(state) && !state.paused },
    [timestamp, state && state.position]
  )

  useEffect(
    () => {
      if (state && state.position != null) {
        setCurrentTime(state.position)
      }
    },
    [state && state.position]
  )

  useEffect(
    () => {
      if (state && state.timestamp) {
        setTimestamp(state.timestamp)
      }
    },
    [state && state.timestamp]
  )

  return {
    deviceId,
    error,
    currentTime,
    isPlayingThroughPlayer: Boolean(state),
    pause: () => player.pause(),
    play: () => player.resume(),
    playNextTrack: () => player.nextTrack(),
    playPreviousTrack: () => player.previousTrack(),
    togglePlayback: () => player.togglePlay(),
    seek: milliseconds => player.seek(milliseconds),
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
