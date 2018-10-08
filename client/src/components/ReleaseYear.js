import gql from 'graphql-tag'

const ReleaseYear = ({ releaseDate: { date, precision } }) => {
  switch (precision) {
    case 'YEAR':
      return date
    case 'MONTH':
      return date.match(/(\d{4})-\d{2}/)[1]
    case 'DAY':
      return date.match(/(\d{4})-\d{2}-\d{2}/)[1]
    default:
      return null
  }
}

ReleaseYear.fragments = {
  releaseDate: gql`
    fragment ReleaseYear_releaseDate on ReleaseDate {
      date
      precision
    }
  `
}

export default ReleaseYear
