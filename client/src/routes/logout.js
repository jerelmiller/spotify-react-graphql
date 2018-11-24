import useSession from 'hooks/useSession'
import useOnMount from 'hooks/useOnMount'

const Logout = ({ navigate }) => {
  const { invalidateSession } = useSession()
  useOnMount(() => {
    invalidateSession().then(() => navigate('/login'))
  })

  return null
}

export default Logout
