import React, { useState } from 'react'
import ProjectCard from '../ProjectCard/ProjectCard'
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

      {/* ── Visual-First Projects Gallery or Wrapped Empty State ── */}
      {filtered.length > 0 ? (
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
          {/* ── Random Vertical, Diagonal & Curved Yellow Ribbons (Not Available) ── */}
          <div className="work__ribbon work__ribbon--diag-1" aria-hidden="true">
            <div className="work__ribbon-track">
              <span>{RIBBON_CHUNK}</span>
              <span>{RIBBON_CHUNK}</span>
            </div>
          </div>

          <div className="work__ribbon work__ribbon--diag-2 work__ribbon--reverse" aria-hidden="true">
            <div className="work__ribbon-track">
              <span>{RIBBON_CHUNK}</span>
              <span>{RIBBON_CHUNK}</span>
            </div>
          </div>

          <div className="work__ribbon work__ribbon--vert-1" aria-hidden="true">
            <div className="work__ribbon-track">
              <span>{RIBBON_CHUNK}</span>
              <span>{RIBBON_CHUNK}</span>
            </div>
          </div>

          <div className="work__ribbon work__ribbon--vert-2 work__ribbon--reverse" aria-hidden="true">
            <div className="work__ribbon-track">
              <span>{RIBBON_CHUNK}</span>
              <span>{RIBBON_CHUNK}</span>
            </div>
          </div>

          {/* Curved S-Wave Ribbon via SVG textPath */}
          <svg className="work__ribbon-curve-svg" viewBox="0 0 1600 280" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <path id="ribbonSPath" d="M -100,190 Q 400,20 800,140 T 1700,70" fill="none" />
            </defs>
            <use href="#ribbonSPath" stroke="#ECC032" strokeWidth="58" strokeLinecap="square" />
            <text fill="#0E0E11" fontSize="26" fontFamily="'Bebas Neue', sans-serif" letterSpacing="4" dy="9" fontWeight="bold">
              <textPath href="#ribbonSPath" startOffset="0%">
                NOT AVAILABLE /// NOT AVAILABLE /// NOT AVAILABLE /// NOT AVAILABLE /// NOT AVAILABLE /// NOT AVAILABLE /// NOT AVAILABLE /// NOT AVAILABLE
              </textPath>
            </text>
          </svg>

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
