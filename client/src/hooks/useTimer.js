import { useEffect, useState } from 'react'

const useTimer = ({ on }) => {
  const [intervalId, setIntervalId] = useState(null)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(
    () => {
      if (on) {
        const intervalId = setInterval(
          () => setCurrentTime(currentTime + 1000),
          1000
        )
        setIntervalId(intervalId)
      }

      return () => {
        if (intervalId) {
          clearInterval(intervalId)
          setIntervalId(null)
        }
      }
    },
    [on, currentTime]
  )

  return currentTime
}

export default useTimer
