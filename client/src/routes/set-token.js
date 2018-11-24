import { useEffect } from 'react'
import useQueryParams from 'hooks/useQueryParams'
import useSession from 'hooks/useSession'

const SetToken = ({ navigate }) => {
  const query = useQueryParams()
  const { authenticate, isAuthenticated } = useSession()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/browse/featured')
    } else {
      authenticate('spotify', query.get('token')).then(() =>
        navigate('/browse/featured')
      )
    }
  }, [])

  return null
}

export default SetToken
