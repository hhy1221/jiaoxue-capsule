'use client'
import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'

/** 悬浮返回顶部按钮 — 页面滚动超过 400px 时出现 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center border-none cursor-pointer transition-all hover:scale-110 hover:shadow-lg"
      style={{
        background: 'linear-gradient(135deg,#9b7a4a,#7a5a3a)',
        color: '#fff',
        boxShadow: '0 3px 12px rgba(80,40,20,0.2)',
      }}
      aria-label="返回顶部"
    >
      <ChevronUp size={18} />
    </button>
  )
}
