import useSession from 'hooks/useSession'
import useOnMount from 'hooks/useOnMount'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const navigate = useNavigate()
  const { invalidateSession } = useSession()

  useOnMount(() => {
    invalidateSession().then(() => navigate('/login'))
  })

  return null
}

export default Logout
