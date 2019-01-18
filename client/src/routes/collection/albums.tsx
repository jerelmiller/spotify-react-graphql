import * as React from 'react'
import AlbumTile, {
  fragments as AlbumTileFragments
} from '../../components/AlbumTile'
import gql from 'graphql-tag'
import PageTitle from '../../components/PageTitle'
import TileGrid from '../../components/TileGrid'
import useBackgroundColor from '../../hooks/useBackgroundColor'
import { Query } from 'react-apollo'
import { AlbumsQuery as AlbumsQueryType } from './types/AlbumsQuery'

export interface Props {}

interface Variables {
  limit: number
  offset: number
}

class AlbumsQuery extends Query<AlbumsQueryType, Variables> {}

const Albums: React.SFC<Props> = () => {
  useBackgroundColor('#090B0F')

  return (
    <AlbumsQuery
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

        ${AlbumTileFragments.album}
      `}
      variables={{ limit: 50, offset: 0 }}
    >
      {({ loading, data }) => (
        <>
          <PageTitle>Albums</PageTitle>
          <TileGrid minWidth="180px">
            {!loading &&
              data &&
              data.viewer &&
              data.viewer.savedAlbums &&
              data.viewer.savedAlbums.edges.map(({ node }) => (
                <AlbumTile key={node.id} album={node} />
              ))}
          </TileGrid>
        </>
      )}
    </AlbumsQuery>
  )
}

export default Albums
