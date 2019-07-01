import { useEffect } from 'react'

const useTimer = (fn, { on } = {}) => {
  useEffect(() => {
    let intervalId
    if (on) {
      intervalId = setInterval(() => fn(), 1000)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [on, fn])
}

export default useTimer
