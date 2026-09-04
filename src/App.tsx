import { useEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { ResumeProvider } from './components/ResumeViewer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ResumePage from './pages/ResumePage'
import Section from './components/ui/Section'
import { useRoute, href } from './lib/router'

function NotFound() {
  return (
    <Section label="404">
      <h1 className="font-display text-3xl">That page doesn’t exist.</h1>
      <a
        href={href('/')}
        className="mt-6 inline-block border-b border-ink pb-1 text-sm hover:border-accent hover:text-accent"
      >
        Back to home
      </a>
    </Section>
  )
}

function Router({ route }: { route: string }) {
  if (route === '/') return <Home />
  if (route === '/resume') return <ResumePage />
  if (route === '/projects') return <Projects />
  if (route === '/about') return <AboutPage />
  if (route === '/contact') return <ContactPage />

  const project = route.match(/^\/projects\/(.+)$/)
  if (project) return <ProjectDetail slug={project[1]} />

  return <NotFound />
}

export default function App() {
  const route = useRoute()

  // Land at the top of each page rather than keeping the previous scroll position.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [route])

  return (
    <ResumeProvider>
      {/*
        Focuses <main> directly rather than using href="#main" — with hash
        routing, setting the hash would be read as a route change.
      */}
      <button
        type="button"
        onClick={() => {
          const main = document.getElementById('main')
          main?.focus()
          main?.scrollIntoView()
        }}
        className="no-print sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </button>

      <Nav />

      <main id="main" tabIndex={-1} className="outline-none">
        <Router route={route} />
      </main>

      <Footer />
    </ResumeProvider>
  )
}
