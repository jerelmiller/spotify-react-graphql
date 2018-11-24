import useQueryParams from 'hooks/useQueryParams'
import useSession from 'hooks/useSession'
import useOnMount from 'hooks/useOnMount'

const SetToken = ({ navigate }) => {
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
