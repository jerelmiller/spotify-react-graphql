import React from 'react'
import { Location } from '@reach/router'

const QueryParams = ({ children }) => (
  <Location>
    {({ location }) =>
      children({ query: new URLSearchParams(location.search) })
    }
  </Location>
)

export default QueryParams
