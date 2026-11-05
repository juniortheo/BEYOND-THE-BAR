import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { SmoothScroll } from './lib/smooth'
import { TransitionProvider } from './lib/transition'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Programmes from './pages/Programmes'
import ProgrammePage from './pages/Programme'
import Sessions from './pages/Sessions'
import SessionReport from './pages/SessionReport'
import Secretariat from './pages/Secretariat'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

const titles: Record<string, string> = {
  '/': 'Beyond the Bar | Re-thinking Legal Practice',
  '/about': 'About | Beyond the Bar',
  '/programmes': 'Programmes | Beyond the Bar',
  '/sessions': 'Sessions | Beyond the Bar',
  '/sessions/ai-in-legal-practice': 'AI in Legal Practice | Webinar Two | Beyond the Bar',
  '/secretariat': 'Secretariat | Beyond the Bar',
  '/contact': 'Contact | Beyond the Bar',
}

function TitleSync() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (titles[pathname]) document.title = titles[pathname]
  }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()
  return (
    <SmoothScroll>
      <TransitionProvider>
        <TitleSync />
        <a
          href="#main"
          className="fixed top-3 left-3 z-[200] -translate-y-24 rounded-full bg-navy px-5 py-3 text-ivory transition-transform focus:translate-y-0"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('main')?.focus()
          }}
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" tabIndex={-1} className="outline-none">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programmes" element={<Programmes />} />
            <Route path="/programmes/:slug" element={<ProgrammePage />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/sessions/ai-in-legal-practice" element={<SessionReport />} />
            <Route path="/secretariat" element={<Secretariat />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </TransitionProvider>
    </SmoothScroll>
  )
}
