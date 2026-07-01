import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiDownload } from 'react-icons/fi'
import MagneticButton from './MagneticButton'

gsap.registerPlugin(ScrollTrigger)

const timeline = [
 {
    year: '2024 — 2028(Expected)',
    title: 'B.Tech, Computer Science',
    detail:
      'Focused on data structures, systems programming, and shipping side projects end to end.',
    tag: 'Education',
  },
    {
    year: '2026',
    title: 'Frontend & Android developer',
    detail:
      'Building native-integrated React Native apps and polished, interaction-heavy web frontends.',
    tag: 'Now',
  },
  {
    year: 'Ongoing',
    title: 'Independent Projects',
    detail:
      'Screen-time & focus tooling with native Android modules, and a real-time CV reaction trainer.',
    tag: 'Practice',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

export default function About() {
  const wrapRef = useRef(null)
  const dotRefs = useRef([])
  const travelRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const travel = travelRef.current
    const dots = dotRefs.current.filter(Boolean)
    if (!wrap || !travel || dots.length === 0) return

    let trigger

    const setup = () => {
      const wrapRect = wrap.getBoundingClientRect()
      const wrapTop = wrapRect.top + window.scrollY
      const positions = dots.map(
        (d) => d.getBoundingClientRect().top + window.scrollY - wrapTop + d.offsetHeight / 2
      )
      const startY = positions[0]
      const endY = positions[positions.length - 1]
      const totalDistance = endY - startY || 1

      // Align the traveling dot's horizontal center exactly to the static
      // dots' center — measured live, so it always sits ON the line
      // regardless of dot size or wrap padding.
      const refRect = dots[0].getBoundingClientRect()
      const dotCenterX = refRect.left + refRect.width / 2
      const travelWidth = travel.getBoundingClientRect().width || 16
      const leftPx = dotCenterX - wrapRect.left - travelWidth / 2

      // First point is visible immediately, travel dot starts there.
      gsap.set(travel, { left: leftPx, top: startY, opacity: 1 })
      gsap.set(dots[0], { opacity: 1, scale: 1 })
      dots.slice(1).forEach((d) => gsap.set(d, { opacity: 0, scale: 0 }))

      trigger = ScrollTrigger.create({
        trigger: wrap,
        start: 'top 65%',
        end: 'bottom 65%',
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress
          const currentY = startY + totalDistance * progress

          // Fade the traveling dot out over the final stretch so only the
          // last static point remains once it's reached.
          const fadeStart = 0.94
          const travelOpacity =
            progress <= fadeStart ? 1 : Math.max(0, 1 - (progress - fadeStart) / (1 - fadeStart))

          gsap.set(travel, { top: currentY, opacity: travelOpacity })

          dots.forEach((dot, i) => {
            const dotProgress = (positions[i] - startY) / totalDistance
            const reached = progress >= dotProgress - 0.015
            gsap.to(dot, {
              opacity: reached ? 1 : 0,
              scale: reached ? 1 : 0,
              duration: 0.35,
              overwrite: true,
            })
          })
        },
      })
    }

    // Wait a tick so entrance animations (whileInView) have settled before measuring.
    const t = setTimeout(() => {
      setup()
      ScrollTrigger.refresh()
    }, 500)

    const onResize = () => {
      trigger?.kill()
      setup()
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', onResize)

    return () => {
      clearTimeout(t)
      trigger?.kill()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section id="about" className="section-pad relative bg-void px-6 md:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="mb-16 flex items-end justify-between gap-6"
        >
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-lime">02 — About</span>
            <h2 className="font-display mt-4 text-4xl text-ink md:text-6xl">
              Code with <span className="text-gradient-lime">intent</span>.
            </h2>
          </div>
          <MagneticButton
            as="a"
            href="/Dev_AshishKushwaha.Resume.pdf"
            download
            className="hidden shrink-0 items-center gap-2 rounded-full border border-line px-6 py-3 text-sm text-ink hover:border-lime/60 md:flex"
          >
            <FiDownload /> Resume
          </MagneticButton>
        </motion.div>

        <div className="grid gap-16 md:grid-cols-[1fr_1.3fr]">
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            className="text-lg leading-relaxed text-mute"
          >
            I'm a frontend-leaning developer who likes owning the whole
            stack when a project calls for it — from a native Android
            module to the pixel that triggers it. I care about interfaces
            that respond instantly and code that stays readable after the
            demo is over.
          </motion.p>

          <div ref={wrapRef} className="relative border-l border-line pl-8">
            {/* Traveling indicator — moves down the line as you scroll, locks at the last point */}
            <span
              ref={travelRef}
              className="pointer-events-none absolute left-0 z-10 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-lime bg-lime/20 opacity-0 shadow-[0_0_18px_5px_rgba(168,255,158,0.55)]"
            >
              <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime" />
            </span>

            {timeline.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp}
                transition={{ delay: i * 0.12 }}
                className="relative mb-12 last:mb-0"
              >
                <span
                  ref={(el) => (dotRefs.current[i] = el)}
                  className="absolute -left-[2.35rem] top-1.5 h-2.5 w-2.5 -translate-y-0 scale-0 rounded-full bg-lime opacity-0 shadow-[0_0_12px_2px_rgba(168,255,158,0.6)]"
                />
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-mute">{item.year}</span>
                  <span className="rounded-full border border-line px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-lime">
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-display mt-2 text-2xl text-ink">{item.title}</h3>
                <p className="mt-2 max-w-md text-mute">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="mt-20 grid grid-cols-2 gap-6 border-t border-line pt-10 md:grid-cols-4"
        >
          {[
           ['Frontend', 'React, React Native'],
            ['Libraries', 'Tailwind CSS, Axios'],
            ['Native', 'Android / Java'],
            ['Tools', 'VS code,GitHub'],
          ].map(([label, val]) => (
            <div key={label}>
              <p className="font-mono text-xs uppercase tracking-widest text-mute">{label}</p>
              <p className="mt-2 text-ink">{val}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}