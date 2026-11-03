import { useEffect, useRef } from 'react'

export function useCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const move = (e) => {
      cursor.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`
    }

    const addHover = () => cursor.classList.add('hovering')
    const removeHover = () => cursor.classList.remove('hovering')

    document.addEventListener('mousemove', move)

    const interactives = document.querySelectorAll('a, button, [data-cursor-hover]')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    return () => {
      document.removeEventListener('mousemove', move)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', addHover)
        el.removeEventListener('mouseleave', removeHover)
      })
    }
  }, [])

  return cursorRef
}

