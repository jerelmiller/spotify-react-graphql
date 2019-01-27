import { FC } from 'react'
import useQueryParams from '../hooks/useQueryParams'
import useSession from '../hooks/useSession'
import useOnMount from '../hooks/useOnMount'
import { RouteComponentProps } from '@reach/router'

interface Props {}

const SetToken: FC<RouteComponentProps<Props>> = ({ navigate }) => {
  const query = useQueryParams()
  const { authenticate, isAuthenticated } = useSession()

  useOnMount(() => {
    if (isAuthenticated) {
      navigate!('/browse/featured')
    } else {
      authenticate('spotify', query.get('token')).then(() =>
        navigate!('/browse/featured')
      )
    }
  })

  return null
}

export default SetToken
