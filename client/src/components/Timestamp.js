import React from 'react'

const Timestamp = ({ className, milliseconds }) => {
  const seconds = Math.floor((milliseconds / 1000) % 60)
  const minutes = Math.floor((milliseconds / 1000 / 60) % 60)
  const hours = Math.floor(milliseconds / 1000 / 60 / 60)

  return (
    <span className={className}>
      {`${hours ? `${hours}:` : ''}${minutes}:${seconds
        .toString()
        .padStart(2, '0')}`}
    </span>
  )
}

export default Timestamp
