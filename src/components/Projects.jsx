import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiArrowUpRight } from 'react-icons/fi'
import { projects } from '../data/projects'

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const [style, setStyle] = useState({})

  const handleMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setStyle({
      transform: `perspective(900px) rotateX(${-py * 8}deg) rotateY(${px * 10}deg) translateY(-6px)`,
    })
  }

  const handleLeave = () => {
    setStyle({ transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)' })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={style}
      className="glass group relative overflow-hidden rounded-3xl transition-transform duration-300 ease-out"
    >
      <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-br from-lime/0 via-lime/0 to-violet/0 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30 group-hover:from-lime/40 group-hover:to-violet/40" />

      <div className="relative h-64 overflow-hidden md:h-80">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/10 to-transparent" />
      </div>

      <div className="relative p-7 md:p-9">
        <div className="mb-3 flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <span
              key={t}
              className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-mute"
            >
              {t}
            </span>
          ))}
        </div>
        <h3 className="font-display text-2xl text-ink md:text-3xl">{project.title}</h3>
        <p className="mt-3 max-w-md text-mute">{project.description}</p>

        <div className="mt-6 flex items-center gap-4">
          <a
            href={project.github}
            data-cursor="interactive"
            className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-ink transition-colors hover:border-lime/60 hover:text-lime"
          >
            <FiGithub /> Code
          </a>
          <a
            href={project.live}
            data-cursor="interactive"
            className="inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-sm font-medium text-void"
          >
            Live demo <FiArrowUpRight />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="work" className="section-pad relative bg-void px-6 md:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-lime">04 — Work</span>
          <h2 className="font-display mt-4 text-4xl text-ink md:text-6xl">Selected projects.</h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
