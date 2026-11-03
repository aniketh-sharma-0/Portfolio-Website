import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner section-inner">
        <div className="footer__brand">
          <img
            src="/images/sketchizel-logo.png"
            alt="Sketchizel Logo"
            className="footer__logo-img"
          />
          <span className="footer__name">SKETCHIZEL</span>
        </div>
        <span className="footer__copy">© {new Date().getFullYear()} Aniketh B. All rights reserved.</span>
        <span className="footer__note">Designed &amp; built by Aniketh</span>
      </div>
    </footer>
  )
}

