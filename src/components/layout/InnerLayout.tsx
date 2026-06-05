'use client'

import Sidebar from './Sidebar'
import BackToTop from '../ui/BackToTop'
import SpotlightSearch from '../search/SpotlightSearch'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

const ANIM_MODE: Record<string, 'sides'|'elastic'|'blur'|'scale'|'drop'> = {
  '/students': 'drop', '/gallery': 'drop', '/resources': 'sides',
  '/ai-workshop': 'scale', '/penpal-square': 'scale', '/growth-video': 'scale',
  '/reviews': 'blur', '/announcements': 'blur', '/letters': 'blur',
}

function resolveAnimName(mode: string, i: number, card: HTMLElement): string {
  if (mode === 'sides') return i % 2 === 0 ? 'cardSlideLeft' : 'cardSlideRight'
  if (mode === 'blur') return 'cardBlurFadeIn'
  if (mode === 'drop') {
    const rot = ((Math.random() * 10) - 5).toFixed(1)
    card.style.setProperty('--rot', `${rot}deg`)
    return 'cardPolaroidDrop'
  }
  return 'cardScaleStretchIn'
}

function animateOneCard(card: HTMLElement, name: string, delayMs: number) {
  card.style.animation = 'none'
  void card.offsetHeight
  card.style.animation = `${name} 0.55s cubic-bezier(0.22,0.61,0.36,1) both`
  card.style.animationDelay = `${delayMs}ms`
}

function sortCardsByPosition(cards: HTMLElement[]): HTMLElement[] {
  return [...cards].sort((a, b) => {
    const aTop = a.getBoundingClientRect().top
    const bTop = b.getBoundingClientRect().top
    return aTop - bTop
  })
}

export default function InnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const animSeq = useRef(0)
  const trackedCards = useRef<WeakSet<HTMLElement>>(new WeakSet())

  // ═══ 侧边栏入场动画 — 直接操作 DOM ═══
  useEffect(() => {
    const fromHome = sessionStorage.getItem('from-home') === '1'
    if (!fromHome) return
    sessionStorage.removeItem('from-home')

    const sidebar = document.querySelector('[data-sidebar]') as HTMLElement | null
    if (!sidebar) return

    sidebar.style.transition = 'none'
    sidebar.style.transform = 'translateX(-100%)'
    void sidebar.offsetHeight
    // 稍慢出场：先停顿 80ms 呼吸感 → 0.75s 缓出滑动
    setTimeout(() => {
      requestAnimationFrame(() => {
        sidebar.style.transition = 'transform 0.75s cubic-bezier(0.22,0.61,0.36,1)'
        sidebar.style.transform = 'translateX(0)'
      })
    }, 80)
  }, [])

  // ═══ 卡片入场动画 — pathname 变化时全量触发 ═══
  useEffect(() => {
    const seq = ++animSeq.current
    const mode = ANIM_MODE[pathname] || 'scale'
    const t = setTimeout(() => {
      if (animSeq.current !== seq) return
      trackedCards.current = new WeakSet()
      const cards = document.querySelectorAll<HTMLElement>('.picture-book-card')
      const sorted = sortCardsByPosition(Array.from(cards))
      sorted.forEach((card, i) => {
        trackedCards.current.add(card)
        animateOneCard(card, resolveAnimName(mode, i, card), i * 100)
      })
    }, 100)
    return () => { clearTimeout(t) }
  }, [pathname])

  // ═══ MutationObserver — 监听页内 tab/filter 切换产生的新卡片 ═══
  useEffect(() => {
    const main = document.querySelector('main.page-enter')
    if (!main) return

    const mode = ANIM_MODE[pathname] || 'scale'
    const tracked = trackedCards.current

    const observer = new MutationObserver((mutations) => {
      const fresh: { el: HTMLElement; idx: number }[] = []
      mutations.forEach(m => {
        m.addedNodes.forEach(node => {
          if (!(node instanceof HTMLElement)) return
          if (node.classList.contains('picture-book-card') && !tracked.has(node)) {
            fresh.push({ el: node, idx: fresh.length })
          }
          node.querySelectorAll('.picture-book-card').forEach(c => {
            const el = c as HTMLElement
            if (!tracked.has(el)) fresh.push({ el, idx: fresh.length })
          })
        })
      })

      if (fresh.length === 0) return

      const sortedFresh = sortCardsByPosition(fresh.map(f => f.el))
      sortedFresh.forEach((el, idx) => {
        tracked.add(el)
        animateOneCard(el, resolveAnimName(mode, idx, el), idx * 80)
      })
    })

    observer.observe(main, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [pathname])

  return (
    <>
      <Sidebar />

      <main className="min-h-screen relative z-10 page-enter"
        style={{ marginLeft: 'var(--sidebar-width, 220px)' }}>
        <div className="p-8 max-w-[1200px] mx-auto max-sm:p-4">
          {children}
        </div>
      </main>
      <BackToTop />
      <SpotlightSearch />
    </>
  )
}
