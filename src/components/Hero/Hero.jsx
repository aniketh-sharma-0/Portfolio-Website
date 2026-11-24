import React, { useRef, useEffect } from 'react'
import './Hero.css'

const WATERMARK_ROWS = Array.from({ length: 48 })
// Single space between words, tight and compact with seamless loop boundary
const WATERMARK_CHUNK = Array.from({ length: 28 }).fill('SKETCHIZEL').join('\u00A0') + '\u00A0'

export default function Hero() {
  const heroRef = useRef(null)
  const frameRef = useRef(null)

  const handleNav = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  // Dynamic angled backdrop & slash alignment with showcase frame chamfers
  useEffect(() => {
    const heroEl = heroRef.current
    const frameEl = frameRef.current
    if (!heroEl || !frameEl) return

    const updateSlashGeometry = () => {
      const hEl = heroRef.current
      const fEl = frameRef.current
      if (!hEl || !fEl) return

      const heroRect = hEl.getBoundingClientRect()
      const frameRect = fEl.getBoundingClientRect()

      if (frameRect.width === 0 || heroRect.width === 0) return

      // Chamfer facet offset: 22px on desktop (>768px), 14px on mobile (<=768px)
      const isMobile = window.innerWidth <= 768
      const chamfer = isMobile ? 14 : 22
      const cOffset = chamfer / 2

      // Bottom-left chamfer center relative to heroEl
      const p1x = frameRect.left - heroRect.left + cOffset
      const p1y = frameRect.bottom - heroRect.top - cOffset

      // Top-right chamfer center relative to heroEl
      const p2x = frameRect.right - heroRect.left - cOffset
      const p2y = frameRect.top - heroRect.top + cOffset

      const dx = p2x - p1x
      const dy = p2y - p1y

      if (dx <= 0) return

      const angleRad = Math.atan2(dy, dx)
      const angleDeg = angleRad * (180 / Math.PI)

      const midX = (p1x + p2x) / 2
      const midY = (p1y + p2y) / 2

      hEl.style.setProperty('--slash-x-center', `${midX.toFixed(2)}px`)
      hEl.style.setProperty('--slash-y-center', `${midY.toFixed(2)}px`)
      hEl.style.setProperty('--slash-angle', `${angleDeg.toFixed(2)}deg`)
    }

    updateSlashGeometry()

    let resizeObserver
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateSlashGeometry()
      })
      resizeObserver.observe(heroEl)
      resizeObserver.observe(frameEl)
    }

    window.addEventListener('resize', updateSlashGeometry)

    const imgEl = frameEl.querySelector('img')
    if (imgEl) {
      if (imgEl.complete) {
        updateSlashGeometry()
      } else {
        imgEl.addEventListener('load', updateSlashGeometry, { once: true })
      }
    }

    const timer = setTimeout(updateSlashGeometry, 120)

    return () => {
      if (resizeObserver) resizeObserver.disconnect()
      window.removeEventListener('resize', updateSlashGeometry)
      clearTimeout(timer)
    }
  }, [])

  // Scroll parallax tracking (smoothly accelerates based on scroll speed)
  useEffect(() => {
    const heroEl = heroRef.current
    if (!heroEl) return

    let rafId
    let currentY = window.scrollY
    let targetY = window.scrollY
    let isRunning = true

    const handleScroll = () => {
      targetY = window.scrollY
    }

    const loop = () => {
      if (!isRunning) return
      if (targetY < window.innerHeight * 1.8) {
        // Silky cushioned physics: smooth gradual momentum, never immediate or jerky
        currentY += (targetY - currentY) * 0.055
        heroEl.style.setProperty('--scroll-y', `${currentY.toFixed(2)}px`)
      }
      rafId = requestAnimationFrame(loop)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    rafId = requestAnimationFrame(loop)

    return () => {
      isRunning = false
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section className="hero" id="hero" ref={heroRef}>
      {/* ── Dynamic Angled Studio Polygonal Cut (Inspired by ZVKY & Studio Gaming Banners) ── */}
      <div className="hero__angled-backdrop" aria-hidden="true">
        {/* Main Angled Obsidian Polygon Cut */}
        <div className="hero__poly-shape hero__poly-shape--main" />
        {/* Electric Magenta Razor Accent Slash */}
        <div className="hero__poly-shape hero__poly-shape--accent" />
      </div>

      {/* ── Diagonal Repeating Outline Watermark (Very Slow Ambient Drift + Silky Smooth Scroll Parallax) ── */}
      <div className="hero__bg-watermark" aria-hidden="true">
        {WATERMARK_ROWS.map((_, i) => (
          <div
            key={i}
            className={`hero__watermark-row ${i % 2 === 1 ? 'hero__watermark-row--odd' : 'hero__watermark-row--even'}`}
            style={{
              '--ambient-duration': `${180 + (i % 6) * 12}s`,
              '--row-factor': (0.45 + (i % 5) * 0.07).toFixed(2),
            }}
          >
            <div className="hero__watermark-track">
              <span className="hero__watermark-text">{WATERMARK_CHUNK}</span>
              <span className="hero__watermark-text" aria-hidden="true">{WATERMARK_CHUNK}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Bottom Vignette / Black to Transparent Gradient (Valorant Inspired) ── */}
      <div className="hero__bottom-gradient" aria-hidden="true" />

      <div className="hero__container">
        {/* ── Featured 3D Artwork Showcase Window with Studio Polygonal Architecture ── */}
        <div className="hero__artwork-showcase">
          <div className="hero__frame-wrap">
            <div className="hero__frame" ref={frameRef}>
              {/* Studio HUD Header Badges */}
              <div className="hero__frame-hud hero__frame-hud--top">
                <span className="hero__frame-tag">
                  <span className="hero__hud-dot" />
                  ARCANE // FAN ART
                </span>
              </div>

              <img
                src="/images/Fishbones.png"
                alt="Fishbones — Arcane Fan Art 3D Recreation by Sketchizel"
                className="hero__artwork-img"
                loading="eager"
              />

              {/* Studio HUD Footer Badges */}
              <div className="hero__frame-hud hero__frame-hud--bottom">
                <span className="hero__frame-subtag">JINX'S ROCKET LAUNCHER</span>
                <span className="hero__frame-status">HAND-TEXTURED IN UCUPAINT</span>
              </div>
            </div>
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
