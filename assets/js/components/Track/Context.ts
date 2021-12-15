import { createContext, useContext } from 'react'

interface PlayTrackOptions {
  context?: string
}

interface Context {
  hovered: boolean
  track: any
  playTrack(uri: string, options: PlayTrackOptions): Promise<any>
}

const TrackContext = createContext<Context>({
  hovered: false,
  playTrack: () => Promise.reject(),
  track: {}
})

export const useTrackContext = () => useContext(TrackContext)
export default TrackContext
