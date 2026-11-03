import React from 'react'
import Nav from './components/Nav/Nav'
import Hero from './components/Hero/Hero'
import WorkSection from './components/WorkSection/WorkSection'
import AboutSection from './components/AboutSection/AboutSection'
import ContactSection from './components/ContactSection/ContactSection'
import Footer from './components/Footer/Footer'
import { useScrollReveal } from './hooks/useScrollReveal'

export default function App() {
  useScrollReveal()

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WorkSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
