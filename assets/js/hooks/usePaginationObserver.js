import gql from 'graphql-tag'
import useIntersectionObserver from './useIntersectionObserver'
import useScrollContainer from './useScrollContainer'
import { compose, set, concat, view } from 'utils/fp'

const usePaginationObserver = (
  apolloResult,
  { edgesLens, pageInfoLens, query, scrollContainer, threshold = '300px' } = {}
) => {
  const defaultScrollContainer = useScrollContainer()

  return useIntersectionObserver(
    ({ isIntersecting }) => {
      const { fetchMore, loading, data } = apolloResult
      const { limit, offset, hasNextPage } = view(pageInfoLens, data) || {}

      if (loading || !isIntersecting || !hasNextPage) {
        return
      }

      fetchMore(
        Object.assign(
          {},
          {
            variables: {
              limit: limit,
              offset: offset + limit
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
    },
    {
      root: scrollContainer || defaultScrollContainer,
      rootMargin: `0px 0px ${threshold} 0px`
    }
  )
}

export const usePaginationObserver_pageInfo = gql`
  fragment usePaginationObserver_pageInfo on PageInfo {
    limit
    offset
    hasNextPage
  }
`

export default usePaginationObserver
