import React from 'react'
import { socialLinks } from '../../data/projects'
import './AboutSection.css'

export default function AboutSection() {
  const disciplines = [
    { title: '3D Modeling & Environment Art', note: 'Blender · Stylized Worlds · Low Poly' },
    { title: 'Digital Illustration', note: 'Character Concepts · Painterly Style' },
    { title: 'Traditional Art', note: 'Charcoal Studies · Observational Form' },
    { title: 'Graphic Design', note: 'Editorial Layouts · Bold Typography' },
  ]

  return (
    <section className="about" id="about">
      <div className="about__inner section-inner">
        {/* Editorial Top Tag */}
        <div className="about__meta reveal">
          <span className="about__meta-text">ABOUT // ARTIST PROFILE</span>
        </div>

        {/* Minimalist Graphic Split Layout */}
        <div className="about__grid">
          {/* Left Column: Big Graphic Typography & Disciplines */}
          <div className="about__left reveal-left">
            <h2 className="about__name">ANIKETH B.</h2>
            <div className="about__alias-wrap">
              <span className="about__alias">aka Sketchizel</span>
            </div>

            <div className="about__disciplines-list">
              {disciplines.map((item, idx) => (
                <div key={idx} className="about__discipline-item">
                  <span className="about__discipline-index">{`0${idx + 1}`}</span>
                  <div className="about__discipline-info">
                    <span className="about__discipline-title">{item.title}</span>
                    <span className="about__discipline-note">{item.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Minimalist Bio, Career Goal, and Direct Social Hub */}
          <div className="about__right reveal-right">
            <div className="about__bio-statement">
              <p>
                I'm Aniketh — a multidisciplinary artist focused on 3D modeling, environment art, and visual storytelling. My long-term goal is to work in the animation industry, bringing stylized worlds and bold visual concepts to life.
              </p>
            </div>

            <div className="about__goal-pill">
              <span className="about__goal-label">CAREER TARGET //</span>
              <span className="about__goal-badge">ANIMATION INDUSTRY</span>
            </div>

            {/* Clean, Minimalist Social Links with Official Logos */}
            <div className="about__social-block">
              <span className="about__social-heading">FIND ME ON —</span>
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
                    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
                      <path d="M0 17.723l2.027 3.505h.001a2.424 2.424 0 0 0 2.164 1.334h13.457l-2.79-4.839H0zm24 .023c0-.337-.08-.656-.219-.942L14.73 1.458A2.417 2.417 0 0 0 12.631.196c-.84 0-1.6.43-2.04 1.134l-1.92 3.325 10.435 18.077h.002a2.38 2.38 0 0 0 4.673-.807v-.18zm-11.583-4.228l-3.376-5.848-6.195 10.732h6.726l2.845-4.884z" />
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
                    <svg viewBox="0 0 24 24" fill="currentColor" width="21" height="21" aria-hidden="true">
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
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
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
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
