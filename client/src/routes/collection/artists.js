import React, { Fragment } from 'react'
import ArtistTile from 'components/ArtistTile'
import BackgroundFromImage from 'components/BackgroundFromImage'
import gql from 'graphql-tag'
import PageTitle from 'components/PageTitle'
import TileGrid from 'components/TileGrid'
import { useQuery } from '@apollo/react-hooks'

const Artists = () => {
  const {
    loading,
    data: { viewer }
  } = useQuery(gql`
    query ArtistsQuery($limit: Int, $after: String) {
      viewer {
        followedArtists(limit: $limit, after: $after) {
          edges {
            node {
              id
              ...Artist_artist
            }
          }
        }
      }
    }

    ${ArtistTile.fragments.artist}
  `)

  return (
    <>
      <PageTitle>Artists</PageTitle>
      <TileGrid minWidth="160px">
        {loading ||
          viewer.followedArtists.edges.map(({ node }, idx) => (
            <Fragment key={node.id}>
              {idx === 0 && (
                <BackgroundFromImage
                  src={(node.images[1] || node.images[0]).url}
                />
              )}
              <ArtistTile artist={node} />
            </Fragment>
          ))}
      </TileGrid>
    </>
  )
}

export default Artists
