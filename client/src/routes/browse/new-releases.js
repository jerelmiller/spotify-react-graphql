import React from 'react'
import gql from 'graphql-tag'
import PageTitle from 'components/PageTitle'
import TileGrid from 'components/TileGrid'
import AlbumTile from 'components/AlbumTile'
import { Query } from 'react-apollo'
import useBackgroundColor from 'hooks/useBackgroundColor'

const NewReleases = () => {
  useBackgroundColor('#283A6A')

  return (
    <Query
      query={gql`
        query NewReleasesQuery($limit: Int!, $offset: Int!) {
          newReleases(limit: $limit, offset: $offset) {
            edges {
              node {
                id
                ...Album_album
              }
            }
          }
        }

        ${AlbumTile.fragments.album}
      `}
      variables={{ limit: 50, offset: 0 }}
    >
      {({ loading, data: { newReleases } }) => (
        <>
          <PageTitle>New Releases</PageTitle>
          <TileGrid minWidth="180px">
            {loading ||
              newReleases.edges.map(({ node }) => (
                <AlbumTile key={node.id} album={node} />
              ))}
          </TileGrid>
        </>
      )}
    </Query>
  )
}

export default NewReleases
