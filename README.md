# Premium Portfolio — React + Vite

A dark, glassmorphic, Awwwards-style portfolio built with React, Tailwind CSS,
Framer Motion, GSAP (ScrollTrigger), and Lenis smooth scrolling.

## Run it

```bash
npm install
```

Set up the contact form (takes ~1 minute, no backend needed):
1. Go to [web3forms.com](https://web3forms.com) and enter the email address you want submissions delivered to. It emails you a free access key instantly.
2. Copy `.env.example` to `.env` and paste your key:
   ```
   VITE_WEB3FORMS_KEY=your-access-key-here
   ```
3. That's it — every submission on the Contact section now lands directly in that inbox.

```bash
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

Build for production:

```bash
npm run build
npm run preview
```

## What's inside

- **Custom cursor** (`src/components/CustomCursor.jsx`) — dot + delayed
  outline ring, grows on hoverable elements, auto-hides on touch devices.
- **Hero** (`src/components/Hero.jsx`) — staggered letter reveal, mouse-
  reactive glowing blobs, magnetic CTAs.
- **About** (`src/components/About.jsx`) — animated timeline, quick stats.
- **Skills** (`src/components/Skills.jsx`) — the signature section: a
  vertical-scroll-pinned track of glass skill orbs that translate
  horizontally via GSAP ScrollTrigger, with hover glow/blur/scale.
- **Projects** (`src/components/Projects.jsx`) — glass cards with 3D tilt,
  image zoom, and stagger-in reveal.
- **Contact** (`src/components/Contact.jsx`) — floating-label glass form
  with validation, loading, and success states.
- **Footer** (`src/components/Footer.jsx`) — minimal, with social links.
- **Lenis** (`src/lib/SmoothScroll.jsx`) — global smooth scroll, wired into
  GSAP's ticker so ScrollTrigger stays in sync.

## Customize

- **Your info**: update the name/tagline in `Hero.jsx`, the timeline in
  `About.jsx`, and the social links in `Contact.jsx` / `Footer.jsx`.
- **Projects**: edit `src/data/projects.js` — swap in your own images,
  descriptions, and GitHub/live links.
- **Skills**: edit `src/data/skills.js` to change the tech list or colors.
- **Resume**: drop a `resume.pdf` into the `public/` folder (create it if
  it doesn't exist) so the About section's download button works.
- **Colors / fonts**: design tokens live in `tailwind.config.js`
  (`colors`, `fontFamily`). Fonts are loaded via Fontshare/Google Fonts in
  `index.html` — swap the `<link>` tags if you change them.

## Notes

- All animations respect `prefers-reduced-motion`.
- The custom cursor is disabled on touch/coarse-pointer devices.
- The Skills section pins the viewport while scrolling — if you add many
  more skills, GSAP's `end` distance auto-scales with track width.
