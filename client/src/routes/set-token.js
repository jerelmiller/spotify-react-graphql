import React from 'react'
import Component from '@reactions/component'
import QueryParams from 'components/QueryParams'
import Session from 'components/Session'
import { authenticate } from 'redux-simple-auth'
import { Redirect } from '@reach/router'
import { connect } from 'react-redux'

const SetToken = ({ authenticate }) => (
  <QueryParams>
    {query => (
      <Component didMount={() => authenticate('spotify', query.get('token'))}>
        {() => (
          <Session>
            {({ authenticated }) =>
              authenticated ? <Redirect noThrow to="/browse/featured" /> : null
            }
          </Session>
        )}
      </Component>
    )}
  </QueryParams>
)

export default connect(
  null,
  { authenticate }
)(SetToken)
