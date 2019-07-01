import React from 'react'
import AlbumTile from 'components/AlbumTile'
import gql from 'graphql-tag'
import PageTitle from 'components/PageTitle'
import PaginationObserver from 'components/PaginationObserver'
import TileGrid from 'components/TileGrid'
import useBackgroundColor from 'hooks/useBackgroundColor'
import useScrollContainer from 'hooks/useScrollContainer'
import { Query } from 'react-apollo'
import { view, lensPath } from 'utils/fp'
import { useQuery } from '@apollo/react-hooks'

const edgesLens = lensPath(['viewer', 'savedAlbums', 'edges'])
const pageInfoLens = lensPath(['viewer', 'savedAlbums', 'pageInfo'])

const Albums = () => {
  useBackgroundColor('#090B0F')

  const scrollContainer = useScrollContainer()

  const { loading, data, fetchMore } = useQuery(gql`
    query AlbumsQuery($limit: Int, $offset: Int) {
      viewer {
        savedAlbums(limit: $limit, offset: $offset) {
          edges {
            node {
              id
              ...Album_album
            }
          }

          pageInfo {
            ...PaginationObserver_pageInfo
          }
        }
      }
    }

    ${AlbumTile.fragments.album}
    ${PaginationObserver.fragments.pageInfo}
  `)

  return (
    <>
      <PageTitle>Albums</PageTitle>
      <TileGrid minWidth="180px">
        {loading ||
          view(edgesLens, data).map(({ node }) => (
            <AlbumTile key={node.id} album={node} />
          ))}
      </TileGrid>
      {loading || (
        <PaginationObserver
          fetchMore={fetchMore}
          scrollContainer={scrollContainer}
          pageInfo={view(pageInfoLens, data)}
          edgesLens={edgesLens}
          pageInfoLens={pageInfoLens}
          threshold="750px"
        />
      )}
    </>
  )
}

export default Albums
