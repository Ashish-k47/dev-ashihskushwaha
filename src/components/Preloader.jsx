import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onDone }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false)
      onDone?.()
    }, 1500)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-void"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: '0.4em' }}
            animate={{ opacity: 1, letterSpacing: '0.15em' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-sm uppercase text-lime"
          >
            Loading portfolio
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
