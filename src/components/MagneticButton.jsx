import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function MagneticButton({ children, className = '', as = 'button', ...props }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 })
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 })

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    x.set(relX * 0.35)
    y.set(relY * 0.35)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  const Comp = motion[as] ?? motion.button

  return (
    <Comp
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      data-cursor="interactive"
      className={className}
      {...props}
    >
      {children}
    </Comp>
  )
}
