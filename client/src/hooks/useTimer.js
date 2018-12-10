import { useEffect, useState } from 'react'

const useTimer = ({ on, callback }) => {
  const [intervalId, setIntervalId] = useState(null)

  useEffect(
    () => {
      if (on) {
        const intervalId = setInterval(callback, 1000)
        setIntervalId(intervalId)
      }

      return () => {
        if (intervalId) {
          clearInterval(intervalId)
          setIntervalId(null)
        }
      }
    },
    [on]
  )
}

export default useTimer
