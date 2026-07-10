import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import TopBar from './components/TopBar'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import About from './pages/About'
import Programs from './pages/Programs'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

// Global scroll-reveal observer — re-runs every route change
function AnimateOnScroll() {
  const { pathname } = useLocation()
  const observerRef = useRef(null)

  useEffect(() => {
    // Disconnect old observer
    if (observerRef.current) observerRef.current.disconnect()

    const runObserver = () => {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observerRef.current?.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      )
      document.querySelectorAll('[data-aos]').forEach((el) => {
        observerRef.current.observe(el)
      })
    }

    // Small delay so React finishes rendering the new page
    const t = setTimeout(runObserver, 80)
    return () => {
      clearTimeout(t)
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [pathname])

  return null
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <AnimateOnScroll />
      <TopBar />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"        element={<Home />} />
          <Route path="/about"   element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </HashRouter>
  )
}

