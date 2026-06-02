'use client'

import { useEffect, useState } from 'react'

/**
 * 墨水流淌 — AI 输出内容出现时的扩散动画
 * 像一滴墨落在纸上，从中心向外扩散
 */

interface Props {
  show: boolean      // 是否有内容要显示
  children: React.ReactNode
}

export default function InkReveal({ show, children }: Props) {
  const [mounted, setMounted] = useState(false)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    if (show && !mounted) {
      setMounted(true)
      // 下一帧启动动画
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimating(true))
      })
    } else if (!show) {
      setMounted(false)
      setAnimating(false)
    }
  }, [show])

  if (!mounted) return null

  return (
    <div
      style={{
        animation: animating ? 'inkSpread 0.7s cubic-bezier(0.65,0,0.35,1) both' : 'none',
        overflow: 'hidden',
      }}
    >
      {children}
      <style>{`
        @keyframes inkSpread {
          from { clip-path: circle(0% at 10% 10%); }
          to   { clip-path: circle(150% at 10% 10%); }
        }
      `}</style>
    </div>
  )
}
