import React, { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { digitalArtworks } from '../../data/digitalArt'
import './DigitalGallery.css'

export default function DigitalGallery() {
  const [selectedArtwork, setSelectedArtwork] = useState(null)
  const [modalImgLoaded, setModalImgLoaded] = useState(false)
  const thumbsRef = useRef(null)

  // Reset modal image load state on artwork change
  useEffect(() => {
    setModalImgLoaded(false)
  }, [selectedArtwork?.id])

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback(
    (e) => {
      if (!selectedArtwork) return

      if (e.key === 'Escape') {
        setSelectedArtwork(null)
      } else if (e.key === 'ArrowRight') {
        const idx = digitalArtworks.findIndex((a) => a.id === selectedArtwork.id)
        const nextIdx = (idx + 1) % digitalArtworks.length
        setSelectedArtwork(digitalArtworks[nextIdx])
      } else if (e.key === 'ArrowLeft') {
        const idx = digitalArtworks.findIndex((a) => a.id === selectedArtwork.id)
        const prevIdx = (idx - 1 + digitalArtworks.length) % digitalArtworks.length
        setSelectedArtwork(digitalArtworks[prevIdx])
      }
    },
    [selectedArtwork]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    if (selectedArtwork) {
      document.body.style.overflow = 'hidden'
      // Scroll active thumbnail into view
      if (thumbsRef.current) {
        const activeBtn = thumbsRef.current.querySelector(
          '.digital-lightbox__thumb--active'
        )
        if (activeBtn) {
          activeBtn.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
          })
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
    const idx = digitalArtworks.findIndex((a) => a.id === selectedArtwork.id)
    const nextIdx = (idx + direction + digitalArtworks.length) % digitalArtworks.length
    setSelectedArtwork(digitalArtworks[nextIdx])
  }

  const isModalReel = selectedArtwork?.instagramUrl?.includes('/reel/')
  const isModalPost = selectedArtwork?.instagramUrl && !isModalReel

  return (
    <div className="digital-gallery">
      {/* ── 4-Column Editorial Wall (100% Uncropped, Direct Showcase) ── */}
      <div className="digital-gallery__masonry">
        {digitalArtworks.map((item, index) => (
          <DigitalCard
            key={item.id}
            item={item}
            index={index}
            onOpen={openLightbox}
          />
        ))}
      </div>

      {/* ── Fullscreen Darkroom Lightbox (Teleported to document.body for true 100vw/100vh) ── */}
      {selectedArtwork && createPortal(
        <div
          className="digital-lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Artwork ${selectedArtwork.catalogNo}`}
        >
          {/* Top Bar with Clear "BACK TO GALLERY" button, Counter & Close Pill */}
          <div className="digital-lightbox__top" onClick={(e) => e.stopPropagation()}>
            <div className="digital-lightbox__top-left">
              <button
                type="button"
                className="digital-lightbox__back-btn"
                onClick={closeLightbox}
                aria-label="Back to gallery view"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>BACK TO GALLERY</span>
              </button>

              <span className="digital-lightbox__badge">
                {isModalReel ? 'PROCESS REEL' : isModalPost ? 'INSTAGRAM POST' : 'DIGITAL ART'}
              </span>

              <div className="digital-lightbox__counter">
                <span>
                  {digitalArtworks.findIndex((a) => a.id === selectedArtwork.id) + 1}
                </span>
                <span className="digital-lightbox__counter-div">/</span>
                <span>{digitalArtworks.length}</span>
              </div>
            </div>

            <div className="digital-lightbox__top-right">
              <button
                type="button"
                className="digital-lightbox__close-pill"
                onClick={closeLightbox}
                aria-label="Close artwork viewer"
              >
                <span>CLOSE</span>
                <span className="digital-lightbox__kbd">ESC</span>
                <span className="digital-lightbox__close-x">&times;</span>
              </button>
            </div>
          </div>

          {/* Center Stage: Full Uncropped Artwork (Clicking backdrop margins closes lightbox) */}
          <div className="digital-lightbox__stage" onClick={closeLightbox}>
            {/* Prev Arrow */}
            <button
              type="button"
              className="digital-lightbox__nav digital-lightbox__nav--prev"
              onClick={(e) => stepArtwork(-1, e)}
              aria-label="Previous artwork"
            >
              &#8249;
            </button>

            {/* Container dynamically conforms with 100% max-height / max-width (No cropping!) */}
            <div className="digital-lightbox__image-container" onClick={closeLightbox}>
              <img
                key={selectedArtwork.id}
                src={selectedArtwork.image}
                alt={selectedArtwork.title || `Artwork ${selectedArtwork.catalogNo}`}
                className={`digital-lightbox__img ${modalImgLoaded ? 'digital-lightbox__img--loaded' : ''}`}
                onClick={(e) => e.stopPropagation()}
                onLoad={() => setModalImgLoaded(true)}
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

          {/* Bottom Bar: Metadata + Thumbnail Filmstrip + Instagram CTA */}
          <div className="digital-lightbox__bottom" onClick={(e) => e.stopPropagation()}>
            <div className="digital-lightbox__info-panel">
              <div className="digital-lightbox__text-col">
                <span className="digital-lightbox__lead-num">
                  № {selectedArtwork.catalogNo} · {selectedArtwork.tools} · {selectedArtwork.year}
                </span>
                <h3 className="digital-lightbox__title">{selectedArtwork.title}</h3>
                <p className="digital-lightbox__desc">{selectedArtwork.description}</p>
              </div>

              <div className="digital-lightbox__actions-col">
                <div className="digital-lightbox__specs">
                  <span className="digital-lightbox__spec-label">DIMENSIONS:</span>
                  <span className="digital-lightbox__spec-val">
                    {selectedArtwork.width} &times; {selectedArtwork.height} px
                  </span>
                </div>

                {selectedArtwork.instagramUrl && (
                  <a
                    href={selectedArtwork.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="digital-lightbox__ig-btn"
                  >
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>{isModalReel ? 'WATCH REEL ON INSTAGRAM' : 'VIEW POST ON INSTAGRAM'}</span>
                    <span className="digital-lightbox__ig-arrow">&rarr;</span>
                  </a>
                )}
              </div>
            </div>

            {/* Horizontal Filmstrip Carousel */}
            <div className="digital-lightbox__thumbs-wrap" ref={thumbsRef}>
              <div className="digital-lightbox__thumbs">
                {digitalArtworks.map((art) => {
                  const isCurrent = art.id === selectedArtwork.id
                  return (
                    <button
                      key={art.id}
                      type="button"
                      className={`digital-lightbox__thumb ${
                        isCurrent ? 'digital-lightbox__thumb--active' : ''
                      }`}
                      onClick={() => setSelectedArtwork(art)}
                      aria-label={`View artwork ${art.catalogNo}`}
                    >
                      <img src={art.image} alt="" className="digital-lightbox__thumb-img" />
                      <span className="digital-lightbox__thumb-tag">{art.catalogNo}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

function DigitalCard({ item, index, onOpen }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current?.naturalWidth > 0) {
      setIsLoaded(true)
    }
  }, [])

  const isReel = item.instagramUrl?.includes('/reel/')
  const isPost = item.instagramUrl && !isReel

  return (
    <article
      className={`digital-card ${
        isLoaded ? 'digital-card--loaded' : 'digital-card--loading'
      } ${item.instagramUrl ? 'digital-card--has-link' : 'digital-card--no-link'}`}
      style={{ '--card-idx': index }}
      onClick={() => onOpen(item)}
      tabIndex={0}
      role="button"
      aria-label={`View ${item.title || `artwork ${item.catalogNo}`}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen(item)
        }
      }}
    >
      {/* 100% Uncropped Canvas with Exact Pre-Reserved Aspect Ratio */}
      <div
        className="digital-card__media"
        style={{ aspectRatio: `${item.width} / ${item.height}` }}
      >
        <div className="digital-card__placeholder" aria-hidden="true" />
        <img
          ref={imgRef}
          src={item.image}
          alt={item.title || `Artwork ${item.catalogNo}`}
          className="digital-card__img"
          width={item.width}
          height={item.height}
          loading={index < 8 ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
        />

        {/* Top-Right Badge: REEL vs POST vs None */}
        {isReel && (
          <div className="digital-card__badge">
            <span className="digital-card__badge-reel">
              <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor">
                <polygon points="6 4 20 12 6 20 6 4" />
              </svg>
              REEL
            </span>
          </div>
        )}

        {isPost && (
          <div className="digital-card__badge">
            <span className="digital-card__badge-post">
              <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              POST
            </span>
          </div>
        )}

        {/* Bottom Overlay on Hover (Revealing details & Instagram button, zero blur) */}
        <div className="digital-card__overlay">
          <div className="digital-card__overlay-content">
            <span className="digital-card__overlay-catno">№ {item.catalogNo}</span>
            <h3 className="digital-card__overlay-title">{item.title}</h3>
            <p className="digital-card__overlay-sub">{item.subtitle}</p>

            <div className="digital-card__overlay-actions">
              <span className="digital-card__inspect-cta">
                <span>INSPECT</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </span>

              {item.instagramUrl && (
                <a
                  href={item.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="digital-card__ig-pill"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span>{isReel ? 'REEL →' : 'POST →'}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
