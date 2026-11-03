import React, { useRef, useEffect } from 'react'
import './Hero.css'

const WATERMARK_ROWS = Array.from({ length: 34 })
// Single space between words, tight and compact with seamless loop boundary
const WATERMARK_CHUNK = Array.from({ length: 26 }).fill('SKETCHIZEL').join('\u00A0') + '\u00A0'

export default function Hero() {
  const heroRef = useRef(null)

  const handleNav = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  // Scroll parallax tracking (exact same scroll speed as now)
  useEffect(() => {
    const heroEl = heroRef.current
    if (!heroEl) return

    let rafId
    const handleScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY
        if (y < window.innerHeight * 1.5) {
          heroEl.style.setProperty('--scroll-y', `${y}px`)
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section className="hero" id="hero" ref={heroRef}>
      {/* ── Diagonal Repeating Outline Watermark (Very Slow Ambient Drift + Scroll Parallax) ── */}
      <div className="hero__bg-watermark" aria-hidden="true">
        {WATERMARK_ROWS.map((_, i) => (
          <div
            key={i}
            className={`hero__watermark-row ${i % 2 === 1 ? 'hero__watermark-row--odd' : 'hero__watermark-row--even'}`}
            style={{
              '--ambient-duration': `${190 + (i % 5) * 15}s`,
            }}
          >
            <div className="hero__watermark-track">
              <span className="hero__watermark-text">{WATERMARK_CHUNK}</span>
              <span className="hero__watermark-text" aria-hidden="true">{WATERMARK_CHUNK}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="hero__container section-inner">
        {/* ── Featured 3D Artwork Showcase Window ── */}
        <div className="hero__artwork-showcase reveal">
          <div className="hero__frame">
            <img
              src="/images/Fishbones.png"
              alt="Fishbones — Arcane Fan Art 3D Recreation by Sketchizel"
              className="hero__artwork-img"
              loading="eager"
            />
          </div>
        </div>

        {/* ── Lower Section: SKETCHIZEL Title on Yellow Canvas ── */}
        <div className="hero__bottom-section reveal">
          <div className="hero__title-wrap">
            <h1 className="hero__title">SKETCHIZEL</h1>
            <div className="hero__title-accent" />
          </div>

          {/* Bottom Bar: Tagline on Left, View Work CTA on Right */}
          <div className="hero__bottom-bar">
            <div className="hero__info">
              <p className="hero__tagline">
                3D Artist / Illustrator / Multidisciplinary Creative
              </p>
            </div>

            <div className="hero__cta-wrapper">
              <a
                className="hero__cta"
                href="#work"
                onClick={(e) => {
                  e.preventDefault()
                  handleNav('#work')
                }}
              >
                <span>VIEW WORK</span>
                <span className="hero__cta-arrow">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
