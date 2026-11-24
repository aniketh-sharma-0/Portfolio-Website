import React, { useState, useRef, useCallback } from 'react'
import { socialLinks } from '../../data/projects'
import './ProjectCard.css'

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

export default function ProjectCard({ project, index }) {
  const isEven = index % 2 === 0
  const isPortrait = !!project.isPortrait
  const coverImage = project.images?.[0] || project.image

  // Video state & refs
  const videoRef = useRef(null)
  const progressRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [progress, setProgress] = useState(0)
  const [showControls, setShowControls] = useState(false)

  // If a specific project URL is provided and not a placeholder, use it; otherwise fall back to main profile
  const artstationUrl = (project.artstationUrl && !project.artstationUrl.includes('YOUR_'))
    ? project.artstationUrl
    : (socialLinks.artstation || 'https://aniketh_b.artstation.com/')

  // Play / Pause toggle
  const togglePlay = useCallback((e) => {
    if (e) e.stopPropagation()
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }, [])

  // Mute / Unmute toggle
  const toggleMute = useCallback((e) => {
    if (e) e.stopPropagation()
    if (!videoRef.current) return
    const nextMuted = !videoRef.current.muted
    videoRef.current.muted = nextMuted
    setIsMuted(nextMuted)
    if (!nextMuted && videoRef.current.paused) {
      videoRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }, [])

  // Direct unmute CTA button
  const handleUnmute = useCallback((e) => {
    if (e) e.stopPropagation()
    if (!videoRef.current) return
    videoRef.current.muted = false
    setIsMuted(false)
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }, [])

  // Video time update
  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    const cur = videoRef.current.currentTime
    const dur = videoRef.current.duration || 0
    setCurrentTime(cur)
    setDuration(dur)
    setProgress(dur > 0 ? (cur / dur) * 100 : 0)
  }

  // Seek bar click
  const handleSeek = (e) => {
    e.stopPropagation()
    if (!videoRef.current || !progressRef.current) return
    const rect = progressRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const pct = Math.max(0, Math.min(1, clickX / rect.width))
    const newTime = pct * (videoRef.current.duration || 0)
    videoRef.current.currentTime = newTime
    setCurrentTime(newTime)
    setProgress(pct * 100)
  }

  // Fullscreen toggle
  const toggleFullscreen = (e) => {
    e.stopPropagation()
    if (!videoRef.current) return
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {})
    } else if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen().catch(() => {})
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen()
    }
  }

  return (
    <article
      id={`project-${project.id}`}
      className={`project-card ${isEven ? 'project-card--normal' : 'project-card--flipped'} ${isPortrait ? 'project-card--portrait' : ''}`}
      style={{
        '--p-accent':    project.palette.accent,
        '--p-highlight': project.palette.highlight,
        '--p-text':      project.palette.text,
      }}
    >
      <div className="project-card__inner">
        {/* ── Artwork Media Frame: Slides in on scroll ── */}
        <div className={`project-card__image-wrap ${isEven ? 'reveal-left' : 'reveal-right'}`}>
          {project.video ? (
            <div
              className="project-card__video-wrap"
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}
            >
              <video
                ref={videoRef}
                src={project.video}
                poster={coverImage}
                playsInline
                autoPlay
                loop
                muted
                preload="metadata"
                className="project-card__video"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
              />

              {/* Top video bar: Minimalist sound toggle + ArtStation link */}
              <div className="project-card__video-header">
                <button
                  type="button"
                  className={`project-card__sound-btn ${!isMuted ? 'project-card__sound-btn--active' : ''}`}
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                >
                  <span className="project-card__sound-icon">
                    {isMuted ? (
                      <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                      </svg>
                    )}
                  </span>
                  <span className="project-card__sound-text">
                    {isMuted ? 'UNMUTE' : 'MUTE'}
                  </span>
                </button>

                <a
                  href={artstationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__artstation-pill"
                  aria-label="View on ArtStation"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>ARTSTATION</span>
                  <span className="project-card__pill-arrow">↗</span>
                </a>
              </div>

              {/* Video Controls Bar */}
              <div className={`project-card__video-bar ${showControls || !isPlaying || !isMuted ? 'project-card__video-bar--visible' : ''}`}>
                <button
                  type="button"
                  className="project-card__vctrl-btn"
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                      <polygon points="6,4 20,12 6,20" />
                    </svg>
                  )}
                </button>

                <button
                  type="button"
                  className={`project-card__vctrl-btn ${!isMuted ? 'project-card__vctrl-btn--active' : ''}`}
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                    </svg>
                  )}
                </button>

                <div
                  className="project-card__scrubber"
                  ref={progressRef}
                  onClick={handleSeek}
                  role="slider"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow={Math.round(progress)}
                  aria-label="Seek video"
                >
                  <div
                    className="project-card__scrubber-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <span className="project-card__time">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>

                <button
                  type="button"
                  className="project-card__vctrl-btn"
                  onClick={toggleFullscreen}
                  aria-label="Fullscreen"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <a
              href={artstationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__image-frame"
              aria-label={`View ${project.title} on ArtStation`}
            >
              <img
                src={coverImage}
                alt={project.title}
                className="project-card__img"
                loading="lazy"
              />
            </a>
          )}
        </div>

        {/* ── Info Panel: Slides in on scroll from opposite side ── */}
        <div className={`project-card__info ${isEven ? 'reveal-right' : 'reveal-left'}`}>
          <div className="project-card__info-content">
            {/* Category / Discipline Label */}
            <span className="project-card__category">
              {project.categoryLabel || project.subtitle}
            </span>

            {/* Bold Expressive Title */}
            <h2 className="project-card__title">{project.title}</h2>

            {/* Concise 1-3 Sentence Description */}
            <p className="project-card__short-desc">{project.shortDesc}</p>

            {/* Fan Art Attribution Note (if applicable) */}
            {project.isFanArt && project.fanArtOf && (
              <span className="project-card__fanart-badge">
                ↳ Fan Art — {project.fanArtOf}
              </span>
            )}

            {/* 3 to 5 Skill & Software Tags */}
            <div className="project-card__tags">
              {project.tags.map(tag => (
                <span key={tag} className="project-card__tag">
                  {tag}
                </span>
              ))}
            </div>

            {/* Primary External ArtStation CTA */}
            <div className="project-card__action">
              <a
                href={artstationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card__cta"
              >
                <span>VIEW PROJECT ON ARTSTATION</span>
                <span className="project-card__cta-arrow">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
