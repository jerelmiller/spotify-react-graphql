import { FC } from 'react'
import useSession from '../hooks/useSession'
import useOnMount from '../hooks/useOnMount'
import { RouteComponentProps } from '@reach/router'

interface Props {}

const Logout: FC<RouteComponentProps<Props>> = ({ navigate }) => {
  const { invalidateSession } = useSession()
  useOnMount(() => {
    invalidateSession().then(() => navigate!('/login'))
  })

  return null
}

export default Logout
