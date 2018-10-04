import React from 'react'
import QueryParams from 'components/QueryParams'
import { Redirect } from '@reach/router'

const SetToken = () => (
  <QueryParams>
    {({ query }) => {
      localStorage.setItem('token', query.get('token'))

      return <Redirect noThrow to="/browse/featured" />
    }}
  </QueryParams>
)

export default SetToken
