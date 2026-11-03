import React from 'react'
import { socialLinks } from '../../data/projects'
import './ContactSection.css'

export default function ContactSection() {
  return (
    <section className="contact grain-overlay" id="contact">
      <div className="contact__inner section-inner">
        {/* Left Column: Heading */}
        <div className="contact__left reveal">
          <span className="contact__label">CONTACT</span>
          <div className="slash-line" />
          <h2 className="contact__heading">
            Let's<br />
            <span className="contact__heading-outline">Talk.</span>
          </h2>
        </div>

        {/* Right Column: Email CTA & Socials */}
        <div className="contact__right reveal">
          <p className="contact__desc">
            Open to collaborations, commissions, animation studio opportunities,
            and creative projects of all kinds.
          </p>

          {/* Email CTA */}
          {socialLinks.email ? (
            <a
              className="contact__email"
              href={`mailto:${socialLinks.email}`}
            >
              <span>{socialLinks.email}</span>
              <span className="contact__email-arrow">↗</span>
            </a>
          ) : (
            <div className="contact__email-placeholder">
              <span className="contact__placeholder-text">
                Add your email in <code>src/data/projects.js</code>
              </span>
            </div>
          )}

          {/* Social quick links */}
          <div className="contact__socials">
            {socialLinks.instagram && (
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="contact__social">
                Instagram
              </a>
            )}
            {socialLinks.artstation && (
              <a href={socialLinks.artstation} target="_blank" rel="noopener noreferrer" className="contact__social">
                ArtStation
              </a>
            )}
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="contact__social">
                LinkedIn
              </a>
            )}
            {socialLinks.behance && (
              <a href={socialLinks.behance} target="_blank" rel="noopener noreferrer" className="contact__social">
                Behance
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
