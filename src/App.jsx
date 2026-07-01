import { useState } from 'react'
import SmoothScroll from './lib/SmoothScroll.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Preloader from './components/Preloader.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <SmoothScroll >
      <Preloader onDone={() => setReady(true)} />
      <div className="noise" />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main className={`transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}>
        <Hero ready={ready} />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </SmoothScroll>
  )
}
