import React, { useState } from 'react'
import Nav from './components/Nav/Nav'
import Hero from './components/Hero/Hero'
import WorkSection from './components/WorkSection/WorkSection'
import AboutSection from './components/AboutSection/AboutSection'
import ContactSection from './components/ContactSection/ContactSection'
import Footer from './components/Footer/Footer'
import { useScrollReveal } from './hooks/useScrollReveal'

export default function App() {
  useScrollReveal()
  const [activeCategory, setActiveCategory] = useState('3d')

  const handleSelectCategory = (catId) => {
    setActiveCategory(catId)
    const el = document.getElementById('work')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WorkSection activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
        <AboutSection onSelectCategory={handleSelectCategory} />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
