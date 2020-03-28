import { useLocation, useResolvedLocation } from 'react-router-dom'

const usePartialMatch = (to, { exact = false } = {}) => {
  const location = useLocation()
  const resolvedLocation = useResolvedLocation(to)

  return exact
    ? location.pathname === resolvedLocation.pathname
    : location.pathname.startsWith(resolvedLocation.pathname)
}

export default usePartialMatch
