import React from 'react'
import SpotifyContext from './SpotifyContext'
import useSpotify from 'hooks/useSpotify'

const SpotifyProvider = ({ children, token }) => {
  const spotify = useSpotify(token)

  return (
    <SpotifyContext.Provider value={spotify}>
      {children}
    </SpotifyContext.Provider>
  )
}
export default SpotifyProvider
