import React from 'react'

const Duration = ({ className, duration }) => {
  const seconds = duration / 1000
  const minutes = Math.floor(duration / 1000 / 60)
  const formattedSeconds = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0')

  return (
    <span className={className}>
      {minutes}:{formattedSeconds}
    </span>
  )
}

export default Duration
