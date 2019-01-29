import { FC } from 'react'
import gql from 'graphql-tag'
import { ReleaseYear_releaseDate } from './types/ReleaseYear_releaseDate'
import { ReleaseDatePrecision } from '../types/globalTypes'

interface Props {
  releaseDate: ReleaseYear_releaseDate
}

const ReleaseYear: FC<Props> = ({ releaseDate }) => {
  const { date, precision } = releaseDate

  if (!date) {
    return null
  }

  switch (precision) {
    case ReleaseDatePrecision.YEAR:
      return <>{date}</>
    case ReleaseDatePrecision.MONTH: {
      const match = date.match(/(\d{4})-\d{2}/)

      return match ? <>{match[1]}</> : null
    }
    case ReleaseDatePrecision.DAY: {
      const match = date.match(/(\d{4})-\d{2}-\d{2}/)

      return match ? <>{match[1]}</> : null
    }
    default:
      return null
  }
}

export const fragments = {
  releaseDate: gql`
    fragment ReleaseYear_releaseDate on ReleaseDate {
      date
      precision
    }
  `
}

export default ReleaseYear
