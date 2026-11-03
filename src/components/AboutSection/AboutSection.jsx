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

            {/* Clean, Minimalist Social Links */}
            <div className="about__social-block">
              <span className="about__social-heading">FIND ME ON —</span>
              <div className="about__social-links">
                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about__social-item"
                  >
                    <div className="about__social-left">
                      <span className="about__social-platform">Instagram</span>
                      <span className="about__social-handle">@sketchizel</span>
                    </div>
                    <span className="about__social-arrow">↗</span>
                  </a>
                )}

                {socialLinks.artstation && (
                  <a
                    href={socialLinks.artstation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about__social-item"
                  >
                    <div className="about__social-left">
                      <span className="about__social-platform">ArtStation</span>
                      <span className="about__social-handle">aniketh_b</span>
                    </div>
                    <span className="about__social-arrow">↗</span>
                  </a>
                )}

                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about__social-item"
                  >
                    <div className="about__social-left">
                      <span className="about__social-platform">LinkedIn</span>
                      <span className="about__social-handle">Aniketh B.</span>
                    </div>
                    <span className="about__social-arrow">↗</span>
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
