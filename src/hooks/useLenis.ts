import { useEffect } from 'react'
import Lenis from 'lenis'

export function useLenis() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return

    const lenis = new Lenis({
      anchors: true,
      smoothWheel: true,
      syncTouch: false,
      lerp: 0.12,
    })
    let frame = 0

    const tick = (time: number) => {
      lenis.raf(time)
      frame = window.requestAnimationFrame(tick)
    }
    frame = window.requestAnimationFrame(tick)

    const disable = () => {
      if (reducedMotion.matches) lenis.stop()
      else lenis.start()
    }
    reducedMotion.addEventListener('change', disable)

    return () => {
      window.cancelAnimationFrame(frame)
      reducedMotion.removeEventListener('change', disable)
      lenis.destroy()
    }
  }, [])
}
