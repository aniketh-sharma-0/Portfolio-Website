import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { createPortal } from 'react-dom'
import {
  traditionalArtworks,
  traditionalMediums,
  traditionalGroups,
} from '../../data/traditionalArt'
import './TraditionalGallery.css'

export default function TraditionalGallery() {
  const [activeGroup, setActiveGroup] = useState('all') // 'all' | 'dry' | 'wet'
  const [activeMedium, setActiveMedium] = useState('all') // 'all' | 'graphite' | 'charcoal' | 'acrylic' | 'watercolor' | 'pen'
  const [selectedArtwork, setSelectedArtwork] = useState(null)
  const [modalImgLoaded, setModalImgLoaded] = useState(false)
  const thumbsRef = useRef(null)

  // Reset modal image load state on artwork change
  useEffect(() => {
    setModalImgLoaded(false)
  }, [selectedArtwork?.id])

  // Filter artworks based on active group and medium
  const filteredArtworks = useMemo(() => {
    return traditionalArtworks.filter((item) => {
      // If a specific medium is selected
      if (activeMedium !== 'all') {
        const itemMediums = item.mediums || (item.medium ? [item.medium] : [])
        return itemMediums.includes(activeMedium)
      }
      // If group is selected
      if (activeGroup !== 'all') {
        return item.group === activeGroup
      }
      return true
    })
  }, [activeGroup, activeMedium])

  // Active medium metadata for editorial banner
  const activeMediumInfo = useMemo(() => {
    if (activeMedium === 'all') return null
    return traditionalMediums.find((m) => m.id === activeMedium)
  }, [activeMedium])

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback(
    (e) => {
      if (!selectedArtwork) return

      if (e.key === 'Escape') {
        setSelectedArtwork(null)
      } else if (e.key === 'ArrowRight') {
        const list = filteredArtworks.length > 0 ? filteredArtworks : traditionalArtworks
        const idx = list.findIndex((a) => a.id === selectedArtwork.id)
        const nextIdx = (idx + 1) % list.length
        setSelectedArtwork(list[nextIdx])
      } else if (e.key === 'ArrowLeft') {
        const list = filteredArtworks.length > 0 ? filteredArtworks : traditionalArtworks
        const idx = list.findIndex((a) => a.id === selectedArtwork.id)
        const prevIdx = (idx - 1 + list.length) % list.length
        setSelectedArtwork(list[prevIdx])
      }
    },
    [selectedArtwork, filteredArtworks]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    if (selectedArtwork) {
      document.body.style.overflow = 'hidden'
      // Auto-scroll active thumbnail into view
      if (thumbsRef.current) {
        const activeBtn = thumbsRef.current.querySelector(
          '.traditional-lightbox__thumb--active'
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
    const list = filteredArtworks.length > 0 ? filteredArtworks : traditionalArtworks
    const idx = list.findIndex((a) => a.id === selectedArtwork.id)
    const nextIdx = (idx + direction + list.length) % list.length
    setSelectedArtwork(list[nextIdx])
  }

  const handleGroupSelect = (groupId) => {
    setActiveGroup(groupId)
    setActiveMedium('all')
  }

  const handleMediumSelect = (mediumId) => {
    setActiveMedium(mediumId)
    if (mediumId !== 'all') {
      const med = traditionalMediums.find((m) => m.id === mediumId)
      if (med?.group) {
        setActiveGroup(med.group)
      }
    }
  }

  // Determine gallery presentation class (sparse/spotlight vs full masonry)
  const isSpotlight = filteredArtworks.length <= 2

  return (
    <div className="traditional-gallery">
      {/* ── Filter & Grouping Control Console ── */}
      <div className="traditional-gallery__controls">
        {/* Tier 1: Primary Group Tabs */}
        <div className="traditional-gallery__groups" role="tablist" aria-label="Medium groupings">
          {traditionalGroups.map((group) => {
            const isActive = activeGroup === group.id && activeMedium === 'all'
            return (
              <button
                key={group.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`traditional-gallery__group-btn ${
                  isActive ? 'traditional-gallery__group-btn--active' : ''
                }`}
                onClick={() => handleGroupSelect(group.id)}
              >
                <span className="traditional-gallery__group-label">{group.label}</span>
                <span className="traditional-gallery__group-count">{group.count}</span>
              </button>
            )
          })}
        </div>

        {/* Tier 2: Specific Medium Filter Pills */}
        <div className="traditional-gallery__pills" role="toolbar" aria-label="Filter by medium">
          {traditionalMediums.map((medium) => {
            const isActive = activeMedium === medium.id
            return (
              <button
                key={medium.id}
                type="button"
                className={`traditional-gallery__pill ${
                  isActive ? 'traditional-gallery__pill--active' : ''
                }`}
                onClick={() => handleMediumSelect(medium.id)}
                aria-pressed={isActive}
              >
                <span className="traditional-gallery__pill-name">{medium.label}</span>
                <span className="traditional-gallery__pill-count">{medium.count}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Contextual Editorial Spotlight Banner (Makes small sets feel intentional & curated) ── */}
      {activeMediumInfo && (
        <aside className="traditional-gallery__spotlight-banner">
          <div className="traditional-gallery__spotlight-meta">
            <span className="traditional-gallery__spotlight-tag">CURATED MEDIUM SPOTLIGHT</span>
            <h4 className="traditional-gallery__spotlight-title">
              {activeMediumInfo.label}
              <span className="traditional-gallery__spotlight-qty">
                {activeMediumInfo.count} {activeMediumInfo.count === 1 ? 'Piece' : 'Pieces'}
              </span>
            </h4>
          </div>
          <p className="traditional-gallery__spotlight-desc">{activeMediumInfo.description}</p>
        </aside>
      )}

      {/* ── Responsive Gallery Wall (Adapts cleanly for 1-2 items or full wall) ── */}
      <div
        key={`${activeGroup}-${activeMedium}`}
        className={`traditional-gallery__wall ${
          isSpotlight ? 'traditional-gallery__wall--spotlight' : 'traditional-gallery__wall--masonry'
        }`}
      >
        {filteredArtworks.map((item, index) => (
          <TraditionalCard
            key={item.id}
            item={item}
            index={index}
            onOpen={openLightbox}
          />
        ))}
      </div>

      {/* ── Fullscreen Darkroom Lightbox Modal (Teleported to body for true 100vw/100vh) ── */}
      {selectedArtwork && createPortal(
        <div
          className="traditional-lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Artwork detail: ${selectedArtwork.title}`}
        >
          {/* Top Bar with Clear "BACK TO GALLERY" action, specs, and close button */}
          <div className="traditional-lightbox__top" onClick={(e) => e.stopPropagation()}>
            <div className="traditional-lightbox__top-left">
              <button
                type="button"
                className="traditional-lightbox__back-btn"
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

              <span className="traditional-lightbox__badge">{selectedArtwork.mediumLabel}</span>

              <div className="traditional-lightbox__counter">
                <span>
                  {traditionalArtworks.findIndex((a) => a.id === selectedArtwork.id) + 1}
                </span>
                <span className="traditional-lightbox__counter-div">/</span>
                <span>{traditionalArtworks.length}</span>
              </div>
            </div>

            <div className="traditional-lightbox__top-right">
              <button
                type="button"
                className="traditional-lightbox__close-pill"
                onClick={closeLightbox}
                aria-label="Close artwork viewer"
              >
                <span>CLOSE</span>
                <span className="traditional-lightbox__kbd">ESC</span>
                <span className="traditional-lightbox__close-x">&times;</span>
              </button>
            </div>
          </div>

          {/* Center Stage: Full 100% Uncropped Artwork (Clicking black margins closes viewer) */}
          <div className="traditional-lightbox__stage" onClick={closeLightbox}>
            {/* Prev Arrow */}
            <button
              type="button"
              className="traditional-lightbox__nav traditional-lightbox__nav--prev"
              onClick={(e) => stepArtwork(-1, e)}
              aria-label="Previous artwork"
            >
              &#8249;
            </button>

            {/* Container bounds to exact available height/width with object-fit: contain */}
            <div className="traditional-lightbox__image-container" onClick={closeLightbox}>
              <img
                key={selectedArtwork.id}
                src={selectedArtwork.image}
                alt={`${selectedArtwork.title} — ${selectedArtwork.mediumLabel}`}
                className={`traditional-lightbox__img ${modalImgLoaded ? 'traditional-lightbox__img--loaded' : ''}`}
                onClick={(e) => e.stopPropagation()}
                onLoad={() => setModalImgLoaded(true)}
              />
            </div>

            {/* Next Arrow */}
            <button
              type="button"
              className="traditional-lightbox__nav traditional-lightbox__nav--next"
              onClick={(e) => stepArtwork(1, e)}
              aria-label="Next artwork"
            >
              &#8250;
            </button>
          </div>

          {/* Bottom Bar: Curated Artwork Details + Horizontal Filmstrip Strip */}
          <div className="traditional-lightbox__bottom" onClick={(e) => e.stopPropagation()}>
            <div className="traditional-lightbox__info-panel">
              <div className="traditional-lightbox__text-col">
                <span className="traditional-lightbox__lead-num">
                  № {selectedArtwork.catalogNo} · {selectedArtwork.support} · {selectedArtwork.year}
                </span>
                <h3 className="traditional-lightbox__title">{selectedArtwork.title}</h3>
                <p className="traditional-lightbox__desc">{selectedArtwork.description}</p>
              </div>

              <div className="traditional-lightbox__tags-col">
                <div className="traditional-lightbox__spec-row">
                  <span className="traditional-lightbox__spec-label">MEDIUM:</span>
                  <span className="traditional-lightbox__spec-val">{selectedArtwork.mediumLabel}</span>
                </div>
                <div className="traditional-lightbox__spec-row">
                  <span className="traditional-lightbox__spec-label">DISCIPLINE:</span>
                  <span className="traditional-lightbox__spec-val">
                    {selectedArtwork.group === 'dry' ? 'Dry Media & Sketches' : 'Paintings & Wet Media'}
                  </span>
                </div>
                <div className="traditional-lightbox__spec-row">
                  <span className="traditional-lightbox__spec-label">DIMENSIONS:</span>
                  <span className="traditional-lightbox__spec-val">
                    {selectedArtwork.width} &times; {selectedArtwork.height} px
                  </span>
                </div>
              </div>
            </div>

            {/* Filmstrip Strip for All Works */}
            <div className="traditional-lightbox__thumbs-wrap" ref={thumbsRef}>
              <div className="traditional-lightbox__thumbs">
                {traditionalArtworks.map((art) => {
                  const isCurrent = art.id === selectedArtwork.id
                  return (
                    <button
                      key={art.id}
                      type="button"
                      className={`traditional-lightbox__thumb ${
                        isCurrent ? 'traditional-lightbox__thumb--active' : ''
                      }`}
                      onClick={() => setSelectedArtwork(art)}
                      aria-label={`Switch to ${art.title}`}
                    >
                      <img src={art.image} alt="" className="traditional-lightbox__thumb-img" />
                      <span className="traditional-lightbox__thumb-tag">{art.catalogNo}</span>
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

function TraditionalCard({ item, index, onOpen }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current?.naturalWidth > 0) {
      setIsLoaded(true)
    }
  }, [])

  return (
    <article
      className={`traditional-card ${
        isLoaded ? 'traditional-card--loaded' : 'traditional-card--loading'
      }`}
      style={{ '--card-idx': index }}
      onClick={() => onOpen(item)}
      tabIndex={0}
      role="button"
      aria-label={`View ${item.title} — ${item.mediumLabel}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen(item)
        }
      }}
    >
      {/* 100% Uncropped Artwork Canvas with Pre-Reserved Aspect Ratio */}
      <div
        className="traditional-card__media"
        style={{ aspectRatio: `${item.width} / ${item.height}` }}
      >
        <div className="traditional-card__placeholder" aria-hidden="true" />
        <img
          ref={imgRef}
          src={item.image}
          alt={`${item.title} - ${item.mediumLabel}`}
          className="traditional-card__img"
          width={item.width}
          height={item.height}
          loading={index < 8 ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
        />

        {/* Always-Visible Subtle Corner Medium Badge */}
        <div className="traditional-card__medium-badge">
          <span>{item.mediumLabel}</span>
        </div>

        {/* Refined Bottom Editorial Overlay on Hover (Zero Blur on Art) */}
        <div className="traditional-card__overlay">
          <div className="traditional-card__overlay-content">
            <span className="traditional-card__overlay-catno">№ {item.catalogNo}</span>
            <h3 className="traditional-card__overlay-title">{item.title}</h3>
            <p className="traditional-card__overlay-sub">{item.subtitle}</p>
            <div className="traditional-card__overlay-cta">
              <span>INSPECT ARTWORK</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
