import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { Education } from '@/components/Education'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Navbar } from '@/components/Navbar'
import { Projects } from '@/components/Projects'
import { Skills } from '@/components/Skills'

export default function HomePage() {
  return (
    <div className="page">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
