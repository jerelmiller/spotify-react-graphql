import React from 'react'
import AlbumTile from 'components/AlbumTile'
import gql from 'graphql-tag'
import PageTitle from 'components/PageTitle'
import TileGrid from 'components/TileGrid'
import useBackgroundColor from 'hooks/useBackgroundColor'
import usePaginationObserver, {
  usePaginationObserver_pageInfo
} from 'hooks/usePaginationObserver'
import { view, lensPath } from 'utils/fp'
import { useQuery } from '@apollo/react-hooks'

const edgesLens = lensPath(['viewer', 'savedAlbums', 'edges'])
const pageInfoLens = lensPath(['viewer', 'savedAlbums', 'pageInfo'])

const Albums = () => {
  useBackgroundColor('#090B0F')

  const result = useQuery(gql`
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
            ...usePaginationObserver_pageInfo
          }
        }
      }
    }

    ${AlbumTile.fragments.album}
    ${usePaginationObserver_pageInfo}
  `)

  const { loading, data } = result

  const ref = usePaginationObserver(result, {
    threshold: '750px',
    edgesLens,
    pageInfoLens
  })

  return (
    <>
      <PageTitle>Albums</PageTitle>
      <TileGrid minWidth="180px">
        {loading ||
          view(edgesLens, data).map(({ node }) => (
            <AlbumTile key={node.id} album={node} />
          ))}
      </TileGrid>
      <div ref={ref} />
    </>
  )
}

export default Albums
