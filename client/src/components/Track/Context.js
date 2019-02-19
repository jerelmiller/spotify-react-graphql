import { createContext, useContext } from 'react'

const TrackContext = createContext()

export const useTrackContext = () => useContext(TrackContext)
export default TrackContext
