import useSpotify from 'hooks/useSpotify'

const SpotifyPlayer = ({ token }) => {
  const { error, state } = useSpotify(token)

  console.log({ error, state })

  return null
}

export default SpotifyPlayer
