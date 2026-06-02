'use client'

import Sidebar from './Sidebar'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

const ANIM_MODE: Record<string, 'sides'|'elastic'|'blur'|'scale'> = {
  '/students': 'sides', '/gallery': 'sides', '/resources': 'sides',
  '/ai-workshop': 'scale', '/penpal-square': 'scale', '/growth-video': 'scale',
  '/reviews': 'blur', '/announcements': 'blur', '/letters': 'blur',
}

export default function InnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarSlide, setSidebarSlide] = useState(false)
  const animSeq = useRef(0)

  // 侧边栏滑入（缎带已由 Ribbon 组件统一处理）
  useEffect(() => {
    if (sessionStorage.getItem('from-home') === '1') {
      sessionStorage.removeItem('from-home')
      setSidebarSlide(true)
    }
  }, [])

  // 卡片动画 — pathname 变化时触发
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
        card.style.animation = 'none'
        void card.offsetHeight
        card.style.animation = `${name} 0.5s cubic-bezier(0.16,1,0.3,1) both`
        card.style.animationDelay = `${i * 60}ms`
      })
    }, 100)

    return () => { clearTimeout(t) }
  }, [pathname])

  return (
    <>
      {/* 侧边栏 — 仅从首页进入时滑入 */}
      <div style={sidebarSlide ? {animation:'slideInLeft 0.45s cubic-bezier(0.16,1,0.3,1)'} : {}}>
        <Sidebar />
      </div>

      {/* 内容区 */}
      <main className="ml-[220px] min-h-screen relative z-10 page-enter">
        <div className="p-8 max-w-[1200px] mx-auto max-sm:p-4">
          {children}
        </div>
      </main>
    </>
  )
}
