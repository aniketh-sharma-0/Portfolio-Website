import React, { useEffect, useState, useCallback } from 'react'
import './ProjectModal.css'

export default function ProjectModal({ project, onClose }) {
  const [activeImg, setActiveImg] = useState(0)

  const images = project.images?.length ? project.images : [project.image]

  // Lock body scroll & handle ESC
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const prev = useCallback(() => setActiveImg(i => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setActiveImg(i => (i + 1) % images.length), [images.length])

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div className="modal" onClick={e => e.stopPropagation()}
        style={{
          '--p-accent':    project.palette.accent,
          '--p-bg':        project.palette.bg,
          '--p-highlight': project.palette.highlight,
          '--p-text':      project.palette.text,
        }}
      >
        {/* Close button */}
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <span />
          <span />
        </button>

        {/* ── Left: image gallery ── */}
        <div className="modal__gallery">
          <div className="modal__main-img-wrap">
            <img
              key={activeImg}
              src={images[activeImg]}
              alt={`${project.title} — image ${activeImg + 1}`}
              className="modal__main-img"
            />

            {/* Prev / Next arrows */}
            {images.length > 1 && (
              <>
                <button className="modal__arrow modal__arrow--prev" onClick={prev} aria-label="Previous image">‹</button>
                <button className="modal__arrow modal__arrow--next" onClick={next} aria-label="Next image">›</button>
              </>
            )}
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="modal__thumbs">
              {images.map((src, i) => (
                <button
                  key={i}
                  className={`modal__thumb ${i === activeImg ? 'modal__thumb--active' : ''}`}
                  onClick={() => setActiveImg(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}

          {/* Image counter */}
          {images.length > 1 && (
            <span className="modal__counter">{activeImg + 1} / {images.length}</span>
          )}
        </div>

        {/* ── Right: project info ── */}
        <div className="modal__info">
          {/* Category + year */}
          <div className="modal__meta">
            <span className="modal__year">{project.year}</span>
            {project.isFanArt && (
              <span className="modal__fanart-badge">Fan Art</span>
            )}
          </div>

          {/* Title */}
          <h2 className="modal__title">{project.title}</h2>
          <p className="modal__subtitle">{project.subtitle}</p>

          {/* Accent line */}
          <div className="modal__accent-line" />

          {/* Full description — preserves line breaks */}
          <div className="modal__desc">
            {project.description.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Fan art credit */}
          {project.isFanArt && (
            <p className="modal__credit">↳ Fan Art of: <em>{project.fanArtOf}</em></p>
          )}

          {/* Tools */}
          {project.tools?.length > 0 && (
            <div className="modal__tools">
              <span className="modal__tools-label">Made with</span>
              <div className="modal__tools-list">
                {project.tools.map(t => (
                  <span key={t} className="modal__tool-tag">{t}</span>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="modal__tags">
            {project.tags.map(tag => (
              <span key={tag} className="tag" style={{ color: 'var(--p-accent)', borderColor: 'var(--p-accent)' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

