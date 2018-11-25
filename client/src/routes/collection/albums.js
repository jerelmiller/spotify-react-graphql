import React from 'react'
import AlbumTile from 'components/AlbumTile'
import gql from 'graphql-tag'
import PageTitle from 'components/PageTitle'
import TileGrid from 'components/TileGrid'
import useBackgroundColor from 'hooks/useBackgroundColor'
import { Query } from 'react-apollo'

const Albums = () => {
  useBackgroundColor('#090B0F')

  return (
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

        ${AlbumTile.fragments.album}
      `}
      variables={{ limit: 50, offset: 0 }}
    >
      {({ loading, data: { viewer } }) => (
        <>
          <PageTitle>Albums</PageTitle>
          <TileGrid minWidth="180px">
            {loading ||
              viewer.savedAlbums.edges.map(({ node }) => (
                <AlbumTile key={node.id} album={node} />
              ))}
          </TileGrid>
        </>
      )}
    </Query>
  )
}

export default Albums
