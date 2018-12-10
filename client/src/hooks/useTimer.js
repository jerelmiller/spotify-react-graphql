import { useEffect } from 'react'

const useTimer = (fn, { on } = {}, vars = []) => {
  useEffect(
    () => {
      let intervalId
      if (on) {
        intervalId = setInterval(() => fn(), 1000)
      }

      return () => {
        clearInterval(intervalId)
      }
    },
    [on, ...vars]
  )
}

export default useTimer
