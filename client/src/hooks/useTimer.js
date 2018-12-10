import { useEffect } from 'react'

const useTimer = ({ on, callback }) => {
  useEffect(
    () => {
      let intervalId
      if (on) {
        intervalId = setInterval(callback, 1000)
      }

      return () => {
        clearInterval(intervalId)
      }
    },
    [on]
  )
}

export default useTimer
