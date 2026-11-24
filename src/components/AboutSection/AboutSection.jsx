import React from 'react'
import { socialLinks } from '../../data/projects'
import './AboutSection.css'

export default function AboutSection({ onSelectCategory }) {
  const disciplines = [
    {
      id: '3d',
      title: '3D Modeling & Environment Art',
      note: 'Blender · Stylized Worlds · Low Poly · Atmospheric Lighting',
    },
    {
      id: 'digital',
      title: 'Digital Illustration',
      note: 'Character Concepts · Painterly Style',
    },
    {
      id: 'traditional',
      title: 'Traditional Art',
      note: 'Charcoal & Graphite · Watercolor · Observational Form',
    },
    {
      id: 'graphic',
      title: 'Graphic Design',
      note: 'Editorial Layouts · Bold Typography',
    },
  ]

  const tools = ['Blender', 'ZBrush', 'Maya', 'Procreate', 'DaVinci Resolve']

  const handleDisciplineClick = (catId) => {
    if (onSelectCategory) {
      onSelectCategory(catId)
    } else {
      const el = document.getElementById('work')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleScrollToWork = (e) => {
    e.preventDefault()
    const el = document.getElementById('work')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="about" id="about">
      <div className="about__inner section-inner">
        {/* Editorial Top Tag */}
        <div className="about__meta reveal">
          <span className="about__meta-text">ABOUT // ARTIST PROFILE</span>
        </div>

        {/* Minimalist Graphic Split Layout */}
        <div className="about__grid">
          {/* Left Column: Big Graphic Typography & Interactive Disciplines */}
          <div className="about__left reveal-left">
            <h2 className="about__name">ANIKETH B.</h2>
            <div className="about__alias-wrap">
              <span className="about__alias">aka Sketchizel</span>
            </div>

            <div className="about__disciplines-list" role="list">
              {disciplines.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  className="about__discipline-item"
                  onClick={() => handleDisciplineClick(item.id)}
                  aria-label={`View ${item.title} projects`}
                >
                  <span className="about__discipline-index">{`0${idx + 1}`}</span>
                  <div className="about__discipline-info">
                    <span className="about__discipline-title">{item.title}</span>
                    <span className="about__discipline-note">{item.note}</span>
                  </div>
                  <span className="about__discipline-arrow" aria-hidden="true">&rarr;</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Bio, Status Badge, Pipeline Tools, and Social/CTA Hub */}
          <div className="about__right reveal-right">
            <div className="about__bio-statement">
              <p>
                I'm Aniketh — a 3D environment artist and illustrator crafting atmospheric worlds, low-poly game spaces, and expressive character concepts. Blending traditional observational drawing with modern 3D pipelines, I'm working toward bringing bold visual stories to life in the animation and games industry.
              </p>
            </div>

            {/* Status / Target Badge */}
            <div className="about__goal-pill">
              <span className="about__goal-label">OPEN TO ROLES //</span>
              <span className="about__goal-badge">3D ENVIRONMENT & VISUAL DEVELOPMENT</span>
            </div>

            {/* Tools & Pipeline Pills */}
            <div className="about__tools-block">
              <span className="about__tools-heading">TOOLS & PIPELINE —</span>
              <div className="about__tools-pills">
                {tools.map((tool) => (
                  <span key={tool} className="about__tool-pill">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Hub & Primary CTA Row */}
            <div className="about__social-block">
              <span className="about__social-heading">FIND ME ON —</span>
              <div className="about__social-row">
                <div className="about__social-links">
                  {socialLinks.artstation && (
                    <a
                      href={socialLinks.artstation}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="about__social-icon-btn"
                      aria-label="ArtStation profile"
                      title="ArtStation"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26" aria-hidden="true">
                        <path d="M0 17.723l2.027 3.505h.001a2.424 2.424 0 0 0 2.164 1.333h13.457l-2.792-4.838H0zm24 .025c0-.484-.143-.935-.388-1.314L15.728 2.728a2.424 2.424 0 0 0-2.142-1.289H9.419L21.598 22.54l1.92-3.325c.378-.637.482-.919.482-1.467zm-11.129-3.462L7.428 4.858l-5.444 9.428h10.872z" />
                      </svg>
                    </a>
                  )}

                  {socialLinks.instagram && (
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="about__social-icon-btn"
                      aria-label="Instagram profile"
                      title="Instagram"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26" aria-hidden="true">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  )}

                  {socialLinks.linkedin && (
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="about__social-icon-btn"
                      aria-label="LinkedIn profile"
                      title="LinkedIn"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" width="25" height="25" aria-hidden="true">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  )}

                  {socialLinks.email && (
                    <a
                      href={`mailto:${socialLinks.email}`}
                      className="about__social-icon-btn"
                      aria-label="Email Aniketh"
                      title="Email Aniketh"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" width="25" height="25" aria-hidden="true">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    </a>
                  )}
                </div>

                {/* Primary CTA Button to Explore Gallery */}
                <a
                  href="#work"
                  className="about__cta-btn"
                  onClick={handleScrollToWork}
                >
                  <span>VIEW WORK</span>
                  <span className="about__cta-arrow" aria-hidden="true">&darr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
