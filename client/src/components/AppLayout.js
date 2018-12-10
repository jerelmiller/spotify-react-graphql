import React from 'react'
import AppMain from './AppMain'
import AppSidebar from './AppSidebar'
import gql from 'graphql-tag'
import styled from 'styled-components'
import SpotifyPlayer from './SpotifyPlayer'
import useSession from 'hooks/useSession'
import { Query } from 'react-apollo'

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-areas:
    'sidebar main'
    'footer footer';
  grid-template-columns: 220px 1fr;
  grid-template-rows: 1fr auto;
`

const AppLayout = ({ children }) => {
  const { data } = useSession()

  return (
    <Query
      query={gql`
        query AppLayoutQuery {
          viewer {
            ...AppSidebar_viewer
          }
        }

        ${AppSidebar.fragments.viewer}
      `}
    >
      {({ loading, data: { viewer } }) => (
        <Container>
          <AppSidebar loading={loading} viewer={viewer} />
          <AppMain>{children}</AppMain>
          <SpotifyPlayer token={data.token} />
        </Container>
      )}
    </Query>
  )
}

export default AppLayout
