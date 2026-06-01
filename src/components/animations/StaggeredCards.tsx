'use client'

import { useEffect, useRef } from 'react'

/* 检查是否来自首页 */
export function useFromHome() {
  // Non-reactive: just check once on mount
  if (typeof window === 'undefined') return false
  const val = sessionStorage.getItem('from-home') === '1'
  if (val) sessionStorage.removeItem('from-home')
  return val
}

type AnimType = 'fade-up' | 'elastic-pop' | 'slide-sides' | 'blur-fade' | 'scale-stretch'

export default function StaggeredCards({
  children, type = 'fade-up', stagger = 60, initialDelay = 0,
}: {
  children: React.ReactNode
  type?: AnimType
  stagger?: number
  initialDelay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fromHome = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('from-home') === '1'
    if (!fromHome || !ref.current) return
    sessionStorage.removeItem('from-home')

    const cards = ref.current.querySelectorAll<HTMLElement>(':scope > *')
    const ANIM_MAP: Record<AnimType, string> = {
      'fade-up': 'fadeUpStagger 0.5s cubic-bezier(0.16,1,0.3,1) both',
      'elastic-pop': 'elasticPop 0.55s cubic-bezier(0.34,1.56,0.64,1) both',
      'slide-sides': '', // special: alternating
      'blur-fade': 'blurFadeIn 0.55s cubic-bezier(0.16,1,0.3,1) both',
      'scale-stretch': 'scaleStretchIn 0.5s cubic-bezier(0.16,1,0.3,1) both',
    }

    cards.forEach((card, i) => {
      const delay = initialDelay + i * stagger
      if (type === 'slide-sides') {
        card.style.animation = `${i % 2 === 0 ? 'slideInLeftCard' : 'slideInRightCard'} 0.5s cubic-bezier(0.16,1,0.3,1) both`
      } else {
        card.style.animation = ANIM_MAP[type]
      }
      card.style.animationDelay = `${delay}ms`
    })
  }, [type, stagger, initialDelay])

  return <div ref={ref}>{children}</div>
}
