import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hidden, setHidden] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const touch = window.matchMedia('(hover: none), (pointer: coarse)').matches
    setIsTouch(touch)
    if (touch) return

    const dot = dotRef.current
    const ring = ringRef.current

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`
    }

    const onLeave = () => setHidden(true)
    const onEnter = () => setHidden(false)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    let raf
    const tick = () => {
      ringX += (mouseX - ringX) * 0.16
      ringY += (mouseY - ringY) * 0.16
      if (ring) {
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(tick)
    }
    tick()

    const interactiveSelector = 'a, button, [data-cursor="interactive"]'
    const onOver = (e) => {
      if (e.target.closest(interactiveSelector)) {
        ring.dataset.state = 'hover'
      }
    }
    const onOut = (e) => {
      if (e.target.closest(interactiveSelector)) {
        ring.dataset.state = 'idle'
      }
    }
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (isTouch) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{ opacity: hidden ? 0 : 1, transition: 'opacity 0.2s ease' }}
    >
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-[6px] w-[6px] rounded-full bg-lime"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        data-state="idle"
        className="fixed left-0 top-0 h-9 w-9 rounded-full border border-lime/70 transition-[width,height,border-color,background-color] duration-300 ease-out data-[state=hover]:h-16 data-[state=hover]:w-16 data-[state=hover]:border-lime data-[state=hover]:bg-lime/10"
        style={{ willChange: 'transform' }}
      />
    </div>
  )
}
