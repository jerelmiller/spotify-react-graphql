import React from 'react'
import gql from 'graphql-tag'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { compose, concat, set, view } from 'utils/fp'

const PaginationObserver = ({
  edgesLens,
  pageInfoLens,
  query,
  fetchMore,
  pageInfo,
  scrollContainer,
  threshold = '300px'
}) => {
  const ref = useIntersectionObserver(
    ({ isIntersecting }) => {
      if (isIntersecting && pageInfo.hasNextPage) {
        fetchMore(
          Object.assign(
            {},
            {
              variables: {
                limit: pageInfo.limit,
                offset: pageInfo.offset + pageInfo.limit
              },
              updateQuery: (prev, { fetchMoreResult }) =>
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
            },
            query && { query }
          )
        )
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
