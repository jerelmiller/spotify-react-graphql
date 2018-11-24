import { useEffect } from 'react'
import useQueryParams from 'hooks/useQueryParams'
import useSession from 'hooks/useSession'
import { authenticate } from 'redux-simple-auth'
import { connect } from 'react-redux'

const SetToken = ({ authenticate, navigate }) => {
  const query = useQueryParams()
  const { isAuthenticated } = useSession()

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

export default connect(
  null,
  { authenticate }
)(SetToken)
