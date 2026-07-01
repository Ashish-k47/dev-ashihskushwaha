import { FiGithub, FiLinkedin, FiInstagram, FiArrowUp } from 'react-icons/fi'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { icon: FiGithub, href: 'https://github.com/Ashish-k47' },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/ashish-kushwaha-dev/' },
  { icon: FiInstagram, href: 'https://www.instagram.com/i_4_ashish' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-void px-6 pb-8 pt-16 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <a href="#top" data-cursor="interactive" className="font-display text-2xl text-ink">
              A. Kushwaha
            </a>
            <p className="mt-3 max-w-xs text-sm text-mute">
              Frontend developer, building interfaces with
              intent.
            </p>
          </div>

          <nav className="flex flex-wrap gap-6">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                data-cursor="interactive"
                className="text-sm text-mute transition-colors hover:text-lime"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.href}
                data-cursor="interactive"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-all duration-300 hover:scale-110 hover:border-lime hover:text-lime hover:shadow-[0_0_20px_rgba(168,255,158,0.25)]"
              >
                <s.icon />
              </a>
            ))}
            <a
              href="#top"
              data-cursor="interactive"
              className="ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-lime text-void transition-transform hover:scale-110"
              aria-label="Back to top"
            >
              <FiArrowUp />
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-center justify-between gap-4 border-t border-line pt-6 text-xs text-mute md:flex-row">
          <span>&copy; {new Date().getFullYear()} Ashish Kushwaha. All rights reserved.</span>
          <span>Designed &amp; developed by Ashish Kushwaha</span>
        </div>
      </div>
    </footer>
  )
}
