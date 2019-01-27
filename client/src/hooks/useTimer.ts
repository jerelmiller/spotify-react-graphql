import { useEffect } from 'react'

interface Options {
  on?: boolean
}

function useTimer(fn: () => void, { on }: Options = {}, vars: any[] = []) {
  useEffect(
    () => {
      let intervalId: any
      if (on) {
        intervalId = setInterval(fn, 1000)
      }

      return () => {
        clearInterval(intervalId)
      }
    },
    [on, ...vars]
  )
}

export default useTimer
