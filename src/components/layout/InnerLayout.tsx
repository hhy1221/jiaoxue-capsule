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
  const [ribbonH, setRibbonH] = useState('70vh')
  const [sidebarSlide, setSidebarSlide] = useState(false)
  const animSeq = useRef(0)

  // 缎带 + 侧边栏
  useEffect(() => {
    const t = setTimeout(() => setRibbonH('110px'), 50)

    if (sessionStorage.getItem('from-home') === '1') {
      sessionStorage.removeItem('from-home')
      setSidebarSlide(true)
    }

    return () => clearTimeout(t)
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
      {/* 书签缎带 — 阶段2：从70vh回弹到110px */}
      <div className="fixed right-[28px] top-0 z-50 pointer-events-none max-md:hidden"
        style={{
          height: ribbonH,
          overflow: 'hidden',
          transition: 'height 0.45s cubic-bezier(0.34,1.56,0.64,1)',
        }}>
        <div className="w-[28px] min-h-[110px] rounded-b-md"
          style={{
            background: 'linear-gradient(180deg, #c8a888 0%, #b89878 40%, #c8a888 100%)',
            boxShadow: '0 2px 8px rgba(80,40,20,0.12)',
          }}>
          <div className="absolute -bottom-1 left-1 right-1 h-2 rounded-b"
            style={{
              background: 'linear-gradient(180deg, rgba(200,168,136,0.6), transparent)',
            }}
          />
        </div>
      </div>

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
