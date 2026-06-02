'use client'

import Sidebar from './Sidebar'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

const ANIM_MODE: Record<string, 'sides'|'elastic'|'blur'|'scale'|'drop'> = {
  '/students': 'drop', '/gallery': 'drop', '/resources': 'sides',
  '/ai-workshop': 'scale', '/penpal-square': 'scale', '/growth-video': 'scale',
  '/reviews': 'blur', '/announcements': 'blur', '/letters': 'blur',
}

export default function InnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const animSeq = useRef(0)

  // ═══ 侧边栏入场动画 — 直接操作 DOM ═══
  useEffect(() => {
    const fromHome = sessionStorage.getItem('from-home') === '1'
    if (!fromHome) return
    sessionStorage.removeItem('from-home')

    // 找侧边栏 DOM 元素
    const sidebar = document.querySelector('[data-sidebar]') as HTMLElement | null
    if (!sidebar) return

    // 设初始位置 → 下一帧启动动画
    sidebar.style.transition = 'none'
    sidebar.style.transform = 'translateX(-100%)'
    void sidebar.offsetHeight
    requestAnimationFrame(() => {
      sidebar.style.transition = 'transform 0.45s cubic-bezier(0.16,1,0.3,1)'
      sidebar.style.transform = 'translateX(0)'
    })
  }, [])

  // ═══ 卡片入场动画 — pathname 变化时触发 ═══
  useEffect(() => {
    const seq = ++animSeq.current
    const mode = ANIM_MODE[pathname] || 'scale'
    const t = setTimeout(() => {
      if (animSeq.current !== seq) return
      const cards = document.querySelectorAll<HTMLElement>('.picture-book-card')
      cards.forEach((card, i) => {
        let name = 'cardScaleStretchIn'
        if (mode === 'sides') name = i % 2 === 0 ? 'cardSlideLeft' : 'cardSlideRight'
        else if (mode === 'blur') name = 'cardBlurFadeIn'
        else if (mode === 'drop') {
          const rot = ((Math.random() * 10) - 5).toFixed(1)
          card.style.setProperty('--rot', `${rot}deg`)
          name = 'cardPolaroidDrop'
        }
        card.style.animation = 'none'
        void card.offsetHeight
        card.style.animation = `${name} 0.65s cubic-bezier(0.22,0.61,0.36,1) both`
        card.style.animationDelay = `${i * 100}ms`
      })
    }, 100)
    return () => { clearTimeout(t) }
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
    </>
  )
}
