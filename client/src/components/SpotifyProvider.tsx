import React, { FC } from 'react'
import SpotifyContext from './SpotifyContext'
import useSpotify from '../hooks/useSpotify'

interface Props {
  token: string
}

const SpotifyProvider: FC<Props> = ({ children, token }) => {
  const spotify = useSpotify(token)

  return (
    <SpotifyContext.Provider value={spotify}>
      {children}
    </SpotifyContext.Provider>
  )
}
export default SpotifyProvider
