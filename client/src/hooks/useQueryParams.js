import useLocation from './useLocation'

const useQueryParams = () => {
  const location = useLocation()

  return new URLSearchParams(location.search)
}

export default useQueryParams
