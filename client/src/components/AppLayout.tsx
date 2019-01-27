import React, { FC } from 'react'
import AppMain from './AppMain'
import AppSidebar, {
  fragments as AppSidebarFragments,
  AppSidebar_viewer
} from './AppSidebar'
import gql from 'graphql-tag'
import styled from 'styled-components'
import SpotifyPlayer from './SpotifyPlayer'
import useSession from '../hooks/useSession'
import { Query } from 'react-apollo'
import { AppLayoutQuery as AppLayoutQueryDefinition } from './types/AppLayoutQuery'
import { filter } from 'graphql-anywhere'

interface Props {}

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-areas:
    'sidebar main'
    'footer footer';
  grid-template-columns: 220px 1fr;
  grid-template-rows: 1fr auto;
`

interface Variables {}

class AppLayoutQuery extends Query<AppLayoutQueryDefinition, Variables> {}

const AppLayout: FC<Props> = ({ children }) => {
  const { data } = useSession()
  const { token } = data

  return (
    <AppLayoutQuery
      query={gql`
        query AppLayoutQuery {
          viewer {
            ...AppSidebar_viewer
          }
        }

        ${AppSidebarFragments.viewer}
      `}
    >
      {({ loading, data }) => (
        <Container>
          <AppSidebar
            loading={loading}
            viewer={
              data && data.viewer
                ? filter(AppSidebarFragments.viewer, data.viewer)
                : null
            }
          />
          <AppMain>{children}</AppMain>
          <SpotifyPlayer token={token} />
        </Container>
      )}
    </AppLayoutQuery>
  )
}

export default AppLayout
