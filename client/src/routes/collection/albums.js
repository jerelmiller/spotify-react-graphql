import React from 'react'
import AlbumTile from 'components/AlbumTile'
import gql from 'graphql-tag'
import PageTitle from 'components/PageTitle'
import PaginationObserver from 'components/PaginationObserver'
import TileGrid from 'components/TileGrid'
import useBackgroundColor from 'hooks/useBackgroundColor'
import useScrollContainer from 'hooks/useScrollContainer'
import { Query } from 'react-apollo'
import { compose, concat, set, view, lensPath } from 'utils/fp'

const edgesLens = lensPath(['viewer', 'savedAlbums', 'edges'])
const pageInfoLens = lensPath(['viewer', 'savedAlbums', 'pageInfo'])

const Albums = () => {
  useBackgroundColor('#090B0F')
  const scrollContainer = useScrollContainer()

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

              pageInfo {
                ...PaginationObserver_pageInfo
              }
            }
          }
        }

        ${AlbumTile.fragments.album}
        ${PaginationObserver.fragments.pageInfo}
      `}
      variables={{ limit: 50, offset: 0 }}
    >
      {({ loading, fetchMore, data: { viewer } }) => (
        <>
          <PageTitle>Albums</PageTitle>
          <TileGrid minWidth="180px">
            {loading ||
              viewer.savedAlbums.edges.map(({ node }) => (
                <AlbumTile key={node.id} album={node} />
              ))}
          </TileGrid>
          {loading || (
            <PaginationObserver
              fetchMore={fetchMore}
              scrollContainer={scrollContainer}
              pageInfo={viewer.savedAlbums.pageInfo}
              updateQuery={(prev, { fetchMoreResult }) =>
                compose(
                  set(
                    edgesLens,
                    concat(
                      view(edgesLens, prev),
                      view(edgesLens, fetchMoreResult)
                    )
                  ),
                  set(pageInfoLens, view(pageInfoLens, fetchMoreResult))
                )(prev)
              }
              threshold="750px"
            />
          )}
        </>
      )}
    </Query>
  )
}

export default Albums
