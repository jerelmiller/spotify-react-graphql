import React from 'react'
import gql from 'graphql-tag'
import PageTitle from 'components/PageTitle'
import { Query } from 'react-apollo'

const Albums = () => (
  <Query
    query={gql`
      query AlbumsQuery($limit: Int!, $offset: Int!) {
        viewer {
          albums(limit: $limit, offset: $offset) {
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
    variables={{ limit: 50, offset: 0 }}
  >
    {({ loading, data: { viewer } }) => (
      <>
        <PageTitle>Albums</PageTitle>
        {loading ||
          viewer.albums.edges.map(({ node }) => (
            <div key={node.id}>{node.name}</div>
          ))}
      </>
    )}
  </Query>
)

export default Albums
