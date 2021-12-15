import React from 'react'
import TabNav from 'components/TabNav'
import { Outlet } from 'react-router-dom'

const RouteBrowse = () => (
  <>
    <header>
      <TabNav>
        <TabNav.NavItem to="featured">Featured</TabNav.NavItem>
        <TabNav.NavItem to="genres">Genres &amp; Moods</TabNav.NavItem>
        <TabNav.NavItem to="new-releases">New Releases</TabNav.NavItem>
        {/*
        <TabNav.NavItem to="discover">Discover</TabNav.NavItem>
        */}
      </TabNav>
    </header>
    <Outlet />
  </>
)

export default RouteBrowse
