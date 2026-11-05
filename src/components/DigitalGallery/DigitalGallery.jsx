import React, { useState, useEffect, useCallback, useRef } from 'react'
import { digitalArtworks } from '../../data/digitalArt'
import './DigitalGallery.css'

export default function DigitalGallery() {
  const [selectedArtwork, setSelectedArtwork] = useState(null)
  const thumbsRef = useRef(null)

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback((e) => {
    if (!selectedArtwork) return

    if (e.key === 'Escape') {
      setSelectedArtwork(null)
    } else if (e.key === 'ArrowRight') {
      const idx = digitalArtworks.findIndex(a => a.id === selectedArtwork.id)
      const nextIdx = (idx + 1) % digitalArtworks.length
      setSelectedArtwork(digitalArtworks[nextIdx])
    } else if (e.key === 'ArrowLeft') {
      const idx = digitalArtworks.findIndex(a => a.id === selectedArtwork.id)
      const prevIdx = (idx - 1 + digitalArtworks.length) % digitalArtworks.length
      setSelectedArtwork(digitalArtworks[prevIdx])
    }
  }, [selectedArtwork])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    if (selectedArtwork) {
      document.body.style.overflow = 'hidden'
      // Scroll active thumbnail into view
      if (thumbsRef.current) {
        const activeBtn = thumbsRef.current.querySelector('.digital-lightbox__thumb--active')
        if (activeBtn) {
          activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
        }
      }
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown, selectedArtwork])

  const openLightbox = (artwork) => {
    setSelectedArtwork(artwork)
  }

  const closeLightbox = () => {
    setSelectedArtwork(null)
  }

  const stepArtwork = (direction, e) => {
    e.stopPropagation()
    const idx = digitalArtworks.findIndex(a => a.id === selectedArtwork.id)
    const nextIdx = (idx + direction + digitalArtworks.length) % digitalArtworks.length
    setSelectedArtwork(digitalArtworks[nextIdx])
  }

  return (
    <div className="digital-gallery">
      {/* ── 4-Column Minimalist Wall (Matching Reference) ── */}
      <div className="digital-gallery__masonry">
        {digitalArtworks.map((item, index) => {
          return (
            <article
              key={item.id}
              className={`digital-card ${item.instagramUrl ? 'digital-card--has-link' : 'digital-card--no-link'}`}
              onClick={() => openLightbox(item)}
              tabIndex={0}
              role="button"
              aria-label={`View artwork ${item.catalogNo}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  openLightbox(item)
                }
              }}
            >
              {/* 100% Uncropped Artwork Canvas with Pre-Reserved Aspect Ratio */}
              <div
                className="digital-card__media"
                style={{ aspectRatio: `${item.width} / ${item.height}` }}
              >
                <img
                  src={item.image}
                  alt={`Artwork ${item.catalogNo}`}
                  className="digital-card__img"
                  width={item.width}
                  height={item.height}
                  loading="eager"
                  decoding="async"
                />

                {/* Bottom Overlay with "VIEW ON INSTAGRAM" (Only for items with links, zero blur) */}
                {item.instagramUrl && (
                  <div className="digital-card__bottom-bar">
                    <a
                      href={item.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="digital-card__btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="digital-card__ig-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <span>VIEW ON INSTAGRAM</span>
                      <span className="digital-card__btn-arrow">&rarr;</span>
                    </a>
                  </div>
                )}
              </div>
            </article>
          )
        })}
      </div>

      {/* ── Fullscreen Darkroom Lightbox Modal with Thumbnails Below ── */}
      {selectedArtwork && (
        <div
          className="digital-lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Artwork ${selectedArtwork.catalogNo}`}
        >
          {/* Top Bar with Close Button */}
          <div className="digital-lightbox__top" onClick={e => e.stopPropagation()}>
            <div className="digital-lightbox__counter">
              <span>{digitalArtworks.findIndex(a => a.id === selectedArtwork.id) + 1}</span>
              <span className="digital-lightbox__counter-div">/</span>
              <span>{digitalArtworks.length}</span>
            </div>

            <button
              type="button"
              className="digital-lightbox__close"
              onClick={closeLightbox}
              aria-label="Close darkroom view"
            >
              &times;
            </button>
          </div>

          {/* Center Stage: Full Uncropped Artwork */}
          <div className="digital-lightbox__stage" onClick={e => e.stopPropagation()}>
            {/* Prev Arrow */}
            <button
              type="button"
              className="digital-lightbox__nav digital-lightbox__nav--prev"
              onClick={(e) => stepArtwork(-1, e)}
              aria-label="Previous artwork"
            >
              &#8249;
            </button>

            <div className="digital-lightbox__image-container">
              <img
                src={selectedArtwork.image}
                alt={`Artwork ${selectedArtwork.catalogNo}`}
                className="digital-lightbox__img"
              />
            </div>

            {/* Next Arrow */}
            <button
              type="button"
              className="digital-lightbox__nav digital-lightbox__nav--next"
              onClick={(e) => stepArtwork(1, e)}
              aria-label="Next artwork"
            >
              &#8250;
            </button>
          </div>

          {/* Bottom Bar: Thumbnail Strip + View on Instagram Button */}
          <div className="digital-lightbox__bottom" onClick={e => e.stopPropagation()}>
            {/* Horizontal Thumbnails Strip (See all images below) */}
            <div className="digital-lightbox__thumbs-wrap" ref={thumbsRef}>
              <div className="digital-lightbox__thumbs">
                {digitalArtworks.map((art) => {
                  const isCurrent = art.id === selectedArtwork.id
                  return (
                    <button
                      key={art.id}
                      type="button"
                      className={`digital-lightbox__thumb ${isCurrent ? 'digital-lightbox__thumb--active' : ''}`}
                      onClick={() => setSelectedArtwork(art)}
                      aria-label={`View artwork ${art.catalogNo}`}
                    >
                      <img src={art.image} alt="" className="digital-lightbox__thumb-img" />
                    </button>
                  )
                })}
              </div>
            </div>

            {/* View on Instagram Button in Lightbox */}
            {selectedArtwork.instagramUrl && (
              <a
                href={selectedArtwork.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="digital-lightbox__ig-btn"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>VIEW ON INSTAGRAM</span>
                <span className="digital-lightbox__ig-arrow">&rarr;</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
