import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${
          scrolled ? 'py-4 bg-void/70 backdrop-blur-xl border-b border-line' : 'py-7'
        }`}
      >
        <a href="#top" data-cursor="interactive" className="font-display text-sm tracking-[0.2em] uppercase">
          A. Kushwaha
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              data-cursor="interactive"
              className="text-sm text-mute hover:text-ink transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-lime transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#contact"
            data-cursor="interactive"
            className="rounded-full border border-line px-5 py-2 text-sm hover:border-lime hover:text-lime transition-colors"
          >
            Let's talk
          </a>
        </nav>

        <button
          data-cursor="interactive"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden flex flex-col gap-1.5 z-50"
          aria-label="Toggle menu"
        >
          <span className={`h-px w-6 bg-ink transition-transform ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
          <span className={`h-px w-6 bg-ink transition-transform ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-void flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="font-display text-3xl text-ink"
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
