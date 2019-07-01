import React from 'react'
import gql from 'graphql-tag'
import useIntersectionObserver from 'hooks/useIntersectionObserver'

const PaginationObserver = ({
  query,
  fetchMore,
  pageInfo,
  scrollContainer,
  updateQuery,
  threshold = '300px'
}) => {
  const ref = useIntersectionObserver(
    ({ isIntersecting }) => {
      if (isIntersecting && pageInfo.hasNextPage) {
        fetchMore({
          query,
          variables: {
            limit: pageInfo.limit,
            offset: pageInfo.offset + pageInfo.limit
          },
          updateQuery
        })
      }
    },
    {
      root: scrollContainer,
      rootMargin: `0px 0px ${threshold} 0px`
    }
  )

  return <div ref={ref} />
}

PaginationObserver.fragments = {
  pageInfo: gql`
    fragment PaginationObserver_pageInfo on PageInfo {
      limit
      offset
      hasNextPage
    }
  `
}

export default PaginationObserver
