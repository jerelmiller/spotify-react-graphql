import React from 'react'
import Album from 'components/Album'
import gql from 'graphql-tag'
import PageTitle from 'components/PageTitle'
import styled from 'styled-components'
import { Query } from 'react-apollo'

const AlbumContainer = styled.div`
  display: grid;
  grid-gap: 2.5rem 1rem;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
`

const Albums = () => (
  <Query
    query={gql`
      query AlbumsQuery($limit: Int!, $offset: Int!) {
        viewer {
          albums(limit: $limit, offset: $offset) {
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
        <AlbumContainer>
          {loading ||
            viewer.albums.edges.map(({ node }) => (
              <Album key={node.id} album={node} />
            ))}
        </AlbumContainer>
      </>
    )}
  </Query>
)

export default Albums
