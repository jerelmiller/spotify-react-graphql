import { useContext } from 'react'
import { LocationContext } from '@reach/router'

const useQueryParams = () => {
  const { location } = useContext(LocationContext)

  return new URLSearchParams(location.search)
}

export default useQueryParams
