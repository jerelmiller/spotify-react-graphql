import useQueryParams from 'hooks/useQueryParams'
import useSession from 'hooks/useSession'
import useOnMount from 'hooks/useOnMount'
import { useNavigate } from 'react-router-dom'

const SetToken = () => {
  const navigate = useNavigate()
  const query = useQueryParams()
  const { authenticate, isAuthenticated } = useSession()

  useOnMount(() => {
    if (isAuthenticated) {
      navigate('/browse/featured')
    } else {
      authenticate('spotify', query.get('token')).then(() =>
        navigate('/browse/featured')
      )
    }
  })

  return null
}

export default SetToken
