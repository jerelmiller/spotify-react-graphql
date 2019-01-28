import React, { FC, ReactNode } from 'react'
import { Location } from '@reach/router'

interface Props {
  children(params: URLSearchParams): ReactNode
}

const QueryParams: FC<Props> = ({ children }) => (
  <Location>
    {({ location }) => children(new URLSearchParams(location.search))}
  </Location>
)

export default QueryParams
