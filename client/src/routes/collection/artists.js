import React from 'react'
import ArtistTile from 'components/ArtistTile'
import BackgroundFromImage from 'components/BackgroundFromImage'
import gql from 'graphql-tag'
import PageTitle from 'components/PageTitle'
import TileGrid from 'components/TileGrid'
import { Query } from 'react-apollo'

const Artists = () => (
  <Query
    query={gql`
      query ArtistsQuery($limit: Int!, $after: String) {
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
    `}
    variables={{ limit: 50 }}
  >
    {({ loading, data: { viewer } }) => (
      <>
        <PageTitle>Artists</PageTitle>
        <TileGrid minWidth="160px">
          {loading ||
            viewer.followedArtists.edges.map(({ node }, idx) => (
              <>
                {idx === 0 && (
                  <BackgroundFromImage
                    src={(node.images[1] || node.images[0]).url}
                  />
                )}
                <ArtistTile
                  key={node.id}
                  artist={node}
                  useBackgroundFromImage={idx === 0}
                />
              </>
            ))}
        </TileGrid>
      </>
    )}
  </Query>
)

export default Artists
