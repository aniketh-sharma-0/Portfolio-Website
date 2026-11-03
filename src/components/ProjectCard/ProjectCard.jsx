import React from 'react'
import { socialLinks } from '../../data/projects'
import './ProjectCard.css'

export default function ProjectCard({ project, index }) {
  const isEven = index % 2 === 0
  const isPortrait = project.id === 'subway'
  const coverImage = project.images?.[0] || project.image

  // If a specific project URL is provided and not a placeholder, use it; otherwise fall back to main profile
  const artstationUrl = (project.artstationUrl && !project.artstationUrl.includes('YOUR_'))
    ? project.artstationUrl
    : (socialLinks.artstation || 'https://aniketh_b.artstation.com/')

  return (
    <article
      id={`project-${project.id}`}
      className={`project-card ${isEven ? 'project-card--normal' : 'project-card--flipped'} ${isPortrait ? 'project-card--portrait' : ''}`}
      style={{
        '--p-accent':    project.palette.accent,
        '--p-bg':        project.palette.bg,
        '--p-highlight': project.palette.highlight,
        '--p-text':      project.palette.text,
      }}
    >
      <div className="project-card__inner">
        {/* ── Artwork Image Frame: Slides in on scroll ── */}
        <div className={`project-card__image-wrap ${isEven ? 'reveal-left' : 'reveal-right'}`}>
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
