import React from 'react'
import gql from 'graphql-tag'
import PageTitle from 'components/PageTitle'
import { Query } from 'react-apollo'

const Artists = () => (
  <Query
    query={gql`
      query ArtistsQuery($limit: Int!, $after: String) {
        viewer {
          followedArtists(limit: $limit, after: $after) {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      }
    `}
    variables={{ limit: 50 }}
  >
    {({ loading, data: { viewer } }) => (
      <>
        <PageTitle>Artists</PageTitle>
      </>
    )}
  </Query>
)

export default Artists
