'use client'

import Sidebar from './Sidebar'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

const ANIM_MODE: Record<string, 'sides'|'elastic'|'blur'|'scale'|'drop'> = {
  '/students': 'drop', '/gallery': 'drop', '/resources': 'sides',
  '/ai-workshop': 'scale', '/penpal-square': 'scale', '/growth-video': 'scale',
  '/reviews': 'blur', '/announcements': 'blur', '/letters': 'blur',
}

export default function InnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  // 渲染阶段同步读取 sessionStorage — 在首次绘制前确定是否需要滑入动画
  const [sidebarSlide] = useState(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('from-home') === '1') {
      sessionStorage.removeItem('from-home')
      return true
    }
    return false
  })
  const animSeq = useRef(0)

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
        else if (mode === 'drop') {
          // 宝丽来飘落 — 每张卡片随机旋转角度
          const rot = ((Math.random() * 10) - 5).toFixed(1) // -5~5deg
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
      {/* 侧边栏 — 用 CSS custom property 传递动画，Sidebar 自己应用 */}
      <div style={{ '--sidebar-anim': sidebarSlide ? 'slideInLeft 0.45s cubic-bezier(0.16,1,0.3,1) both' : 'none' } as React.CSSProperties}>
        <Sidebar />
      </div>

      {/* 内容区 — 左边距跟随侧边栏宽度 */}
      <main className="min-h-screen relative z-10 page-enter"
        style={{ marginLeft: 'var(--sidebar-width, 220px)' }}>
        <div className="p-8 max-w-[1200px] mx-auto max-sm:p-4">
          {children}
        </div>
      </main>
    </>
  )
}
