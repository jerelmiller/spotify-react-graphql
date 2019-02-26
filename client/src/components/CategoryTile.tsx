import React from 'react'
import LazyImage from './LazyImage'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Link } from '@reach/router'
import { FragmentComponent, GQLFragment } from '../types/shared'
import { CategoryTile_category } from './types/CategoryTile_category'

interface Props {
  category: CategoryTile_category
}

const Container = styled.div`
  text-align: center;
`

const CategoryTile: FragmentComponent<Props, { category: GQLFragment }> = ({
  category
}) => {
  const icon = category.icons[0]
  const href = `/genres/${category.id}`

  return (
    <Container>
      <Link to={href}>
        <LazyImage src={icon.url} width="100%" />
      </Link>
      <Link to={href}>{category.name}</Link>
    </Container>
  )
}

CategoryTile.fragments = {
  category: gql`
    fragment CategoryTile_category on Category {
      id
      name
      icons {
        url
      }
    }
  `
}

export default CategoryTile
