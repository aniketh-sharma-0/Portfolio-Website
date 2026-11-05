import React, { useState } from 'react'
import ProjectCard from '../ProjectCard/ProjectCard'
import DigitalGallery from '../DigitalGallery/DigitalGallery'
import { projects, categories } from '../../data/projects'
import './WorkSection.css'

const RIBBON_CHUNK = Array.from({ length: 14 })
  .fill('NOT AVAILABLE   ///   NOT AVAILABLE')
  .join('   ///   ') + '   ///   '

export default function WorkSection() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id)

  const currentCategory = categories.find(c => c.id === activeCategory)
  const filtered = projects.filter(p => p.category === activeCategory)

  return (
    <section className="work" id="work">
      {/* ── Editorial Header & Discipline Selector ── */}
      <div className="work__header-wrap reveal">
        <div className="work__header section-inner">
          <div className="work__meta-tag">
            <span className="work__meta-label">SELECTED WORKS // DISCIPLINES</span>
          </div>

          {/* Unified High-Impact Category Switcher */}
          <nav className="work__discipline-nav" aria-label="Creative disciplines">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`work__discipline-btn ${isActive ? 'work__discipline-btn--active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                  aria-pressed={isActive}
                >
                  <span className="work__btn-text">{cat.label}</span>
                  {isActive && <span className="work__btn-indicator" />}
                </button>
              )
            })}
          </nav>

          {/* Subtitle / Focus Statement directly beneath */}
          <div className="work__focus-bar">
            <span className="work__focus-lead">FOCUS:</span>
            <p className="work__focus-text">{currentCategory?.description}</p>
          </div>
        </div>
      </div>

      {/* ── Visual-First Projects Gallery, Digital Art Abstract Library, or Wrapped Empty State ── */}
      {activeCategory === 'digital' ? (
        <DigitalGallery />
      ) : filtered.length > 0 ? (
        <div className="work__projects">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
            />
          ))}
        </div>
      ) : (
        <div className="work__empty-wrap">
          {/* ── Layered Yellow Caution Tape Ribbons (Crisp, Responsive, Non-Distorting) ── */}
          {/* Background Ribbons (Framing behind the card) */}
          <div className="work__ribbon work__ribbon--bg-1" aria-hidden="true">
            <div className="work__ribbon-track">
              <span>{RIBBON_CHUNK}</span>
              <span>{RIBBON_CHUNK}</span>
            </div>
          </div>

          <div className="work__ribbon work__ribbon--bg-2 work__ribbon--reverse" aria-hidden="true">
            <div className="work__ribbon-track">
              <span>{RIBBON_CHUNK}</span>
              <span>{RIBBON_CHUNK}</span>
            </div>
          </div>

          <div className="work__ribbon work__ribbon--bg-3" aria-hidden="true">
            <div className="work__ribbon-track">
              <span>{RIBBON_CHUNK}</span>
              <span>{RIBBON_CHUNK}</span>
            </div>
          </div>

          {/* Foreground Ribbons (Weaving across top & bottom edges of card) */}
          <div className="work__ribbon work__ribbon--fg-1 work__ribbon--reverse" aria-hidden="true">
            <div className="work__ribbon-track">
              <span>{RIBBON_CHUNK}</span>
              <span>{RIBBON_CHUNK}</span>
            </div>
          </div>

          <div className="work__ribbon work__ribbon--fg-2" aria-hidden="true">
            <div className="work__ribbon-track">
              <span>{RIBBON_CHUNK}</span>
              <span>{RIBBON_CHUNK}</span>
            </div>
          </div>

          {/* ── Central Curation Card Wrapped by the Ribbons ── */}
          <div className="work__empty-card">
            <span className="work__empty-badge">CURATION IN PROGRESS</span>
            <h3 className="work__empty-title">{currentCategory?.label}</h3>
            <p className="work__empty-text">
              Selected works in this discipline are currently being curated and prepared for release. Explore the active 3D modeling collection.
            </p>
            <button
              type="button"
              className="work__empty-cta"
              onClick={() => setActiveCategory('3d')}
            >
              <span>EXPLORE 3D ART</span>
              <span className="work__empty-cta-arrow">&rarr;</span>
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
