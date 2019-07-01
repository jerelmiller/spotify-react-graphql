import React from 'react'
import gql from 'graphql-tag'
import PageTitle from 'components/PageTitle'
import TileGrid from 'components/TileGrid'
import AlbumTile from 'components/AlbumTile'
import useBackgroundColor from 'hooks/useBackgroundColor'
import { useQuery } from '@apollo/react-hooks'

const NewReleases = () => {
  useBackgroundColor('#283A6A')

  const {
    loading,
    data: { newReleases }
  } = useQuery(gql`
    query NewReleasesQuery($limit: Int, $offset: Int) {
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
  `)

  return (
    <>
      <PageTitle>New Releases</PageTitle>
      <TileGrid minWidth="180px">
        {loading ||
          newReleases.edges.map(({ node }) => (
            <AlbumTile key={node.id} album={node} />
          ))}
      </TileGrid>
    </>
  )
}

export default NewReleases
