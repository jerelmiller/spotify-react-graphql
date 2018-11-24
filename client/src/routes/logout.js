import { useEffect } from 'react'
import useSession from 'hooks/useSession'

const Logout = ({ navigate }) => {
  const { invalidateSession } = useSession()
  useEffect(() => {
    invalidateSession().then(() => navigate('/login'))
  }, [])

  return null
}

export default Logout
