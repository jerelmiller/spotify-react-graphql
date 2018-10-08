import React from 'react'
import Album from 'components/Album'
import gql from 'graphql-tag'
import PageTitle from 'components/PageTitle'
import TileGrid from 'components/TileGrid'
import { Query } from 'react-apollo'

const Albums = () => (
  <Query
    query={gql`
      query AlbumsQuery($limit: Int!, $offset: Int!) {
        viewer {
          savedAlbums(limit: $limit, offset: $offset) {
            edges {
              node {
                id
                ...Album_album
              }
            }
          }
        }
      }

      ${Album.fragments.album}
    `}
    variables={{ limit: 50, offset: 0 }}
  >
    {({ loading, data: { viewer } }) => (
      <>
        <PageTitle>Albums</PageTitle>
        <TileGrid minWidth="180px">
          {loading ||
            viewer.savedAlbums.edges.map(({ node }) => (
              <Album key={node.id} album={node} />
            ))}
        </TileGrid>
      </>
    )}
  </Query>
)

export default Albums
