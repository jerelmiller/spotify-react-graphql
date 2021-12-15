import useSpotifyContext from './useSpotifyContext'
import usePlayCollectionMutation from './usePlayCollectionMutation'

const usePlayableCollection = (uri: string) => {
  const { contextUri, play, pause, playing } = useSpotifyContext()
  const isCurrentContext = contextUri === uri
  const playCollection = usePlayCollectionMutation(uri)

  let action

  if (isCurrentContext) {
    action = playing ? pause : play
  } else {
    action = playCollection
  }

  return { playing: isCurrentContext && playing, toggle: action }
}

export default usePlayableCollection
