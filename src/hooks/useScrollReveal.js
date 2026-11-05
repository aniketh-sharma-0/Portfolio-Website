import { useEffect, useRef } from 'react'

export function useScrollReveal() {
  const observerRef = useRef(null)

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.05,
    }

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, options)

    const observeElements = () => {
      const els = document.querySelectorAll('.reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible)')
      els.forEach((el) => {
        // If element is already in the viewport, make it visible immediately without flash/delay
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('visible')
        } else {
          observerRef.current?.observe(el)
        }
      })
    }

    // Initial pass
    observeElements()

    // Observe any newly added elements (e.g. switching categories or async renders)
    const mutationObserver = new MutationObserver(() => {
      observeElements()
    })

    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      if (observerRef.current) observerRef.current.disconnect()
      mutationObserver.disconnect()
    }
  }, [])
}

