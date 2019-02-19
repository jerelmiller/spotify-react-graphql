import { useEffect } from 'react'

const useScript = src => {
  useEffect(() => {
    const script = document.createElement('script')
    script.setAttribute('src', src)
    document.body.appendChild(script)

    return () => document.body.removeChild(script)
  }, [src])
}

export default useScript
