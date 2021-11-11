import { useState, useEffect } from 'react';

export default function useOnScreen(ref: any, options?: Object ) {

  const [isIntersecting, setIntersecting] = useState(false)

  const observer = new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting),
    options
  )

  useEffect(() => {
    observer.observe(ref.current)

    return () => { observer.disconnect() }
  }, [])

  return isIntersecting
}