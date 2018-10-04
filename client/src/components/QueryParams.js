import React from 'react'
import { Location } from '@reach/router'

const QueryParams = ({ children }) => (
  <Location>
    {({ location }) => children(new URLSearchParams(location.search))}
  </Location>
)

export default QueryParams
