import React from 'react'
import AppMain from './AppMain'
import AppSidebar from './AppSidebar'
import gql from 'graphql-tag'
import styled from 'styled-components'
import SpotifyPlayer from './SpotifyPlayer'
import useSession from 'hooks/useSession'
import { useQuery } from '@apollo/react-hooks'

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
  const {
    loading,
    fetchMore,
    data: { viewer }
  } = useQuery(gql`
    query AppLayoutQuery($limit: Int, $offset: Int) {
      viewer {
        ...AppSidebar_viewer
      }
    }

    ${AppSidebar.fragments.viewer}
  `)

  return (
    <Container>
      <AppSidebar loading={loading} fetchMore={fetchMore} viewer={viewer} />
      <AppMain>{children}</AppMain>
      <SpotifyPlayer token={data.token} />
    </Container>
  )
}

export default AppLayout
