import { useContext } from 'react'
import { LocationContext } from '@reach/router'

const useLocation = () => {
  const { location } = useContext(LocationContext)

  return location
}

export default useLocation
