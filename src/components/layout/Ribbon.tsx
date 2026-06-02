'use client'

import { useRef, useLayoutEffect, useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * 统一缎带 — 丝绸布料物理
 * z-index 10000：高于幕布(9999)，跨路由不卸载
 *
 * 布料动画：
 *   下拉: 重力加速 + 到达底部微弹（像布料被松手）
 *   回弹: 上拉 + 到达顶部后水平摇摆（像丝带的惯性）
 *   两部分 lag: 上段先动，下段延迟 60ms（链条效应）
 */

// ── 缓动曲线 ──
const EASE_DROP   = 'height 0.48s cubic-bezier(0.22,0.61,0.36,1)'    // 重力下落
const EASE_PULL   = 'height 0.42s cubic-bezier(0.25,0.46,0.45,0.94)'   // 收紧上拉
const EASE_RETURN = 'height 0.45s cubic-bezier(0.34,1.56,0.64,1)'      // 弹性入场

export default function Ribbon() {
  const pathname = usePathname()
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const prevPathname = useRef(pathname)
  const busyRef = useRef(false)
  const returningHome = useRef(false) // 标记来自 return-home 事件
  const isHome = pathname === '/'

  function startSway() {
    const inner = innerRef.current
    if (!inner) return
    inner.style.animation = 'none'
    void inner.offsetHeight
    inner.style.animation = 'ribbonSway 0.7s ease-out both'
  }

  // ═══ 监听 return-home → 缎带快速下拉随后立即回弹，与幕布下滑同步 ═══
  useEffect(() => {
    const handler = () => {
      const outer = outerRef.current
      if (!outer) return
      returningHome.current = true

      // 缎带快速落到 70vh（200ms）
      outer.style.transition = 'none'
      outer.style.height = '110px'
      void outer.offsetHeight
      requestAnimationFrame(() => {
        if (!outer) return
        outer.style.transition = 'height 0.2s cubic-bezier(0.22,0.61,0.36,1)'
        outer.style.height = '70vh'
      })

      // 落地后立即弹回（180ms 后开始）
      setTimeout(() => {
        if (!outer) return
        outer.style.transition = EASE_PULL
        outer.style.height = '110px'
        setTimeout(startSway, 350)
      }, 200)
    }
    window.addEventListener('return-home', handler)
    return () => window.removeEventListener('return-home', handler)
  }, [])

  useLayoutEffect(() => {
    const outer = outerRef.current
    if (!outer) return

    const isNavigation = prevPathname.current !== pathname
    prevPathname.current = pathname

    /* ─────────── 在首页 ─────────── */
    if (isHome) {
      busyRef.current = false
      if (isNavigation && returningHome.current) {
        // return-home 事件已启动完整动画（下拉+回弹），此处不重复
        returningHome.current = false
      } else if (isNavigation) {
        // 浏览器回退 or 地址栏输入 → 正常流程
        outer.style.transition = 'none'
        outer.style.height = '110px'
        void outer.offsetHeight
        requestAnimationFrame(() => {
          if (!outer) return
          outer.style.transition = EASE_DROP
          outer.style.height = '70vh'
        })
        setTimeout(() => {
          if (!outer) return
          outer.style.transition = EASE_PULL
          outer.style.height = '110px'
          setTimeout(startSway, 450)
        }, 650)
      } else {
        outer.style.transition = 'none'
        outer.style.height = '110px'
      }
      return
    }

    /* ─────────── 离开首页 → 内页 ─────────── */
    const wantDrop = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('ribbon-drop') === '1'

    if (wantDrop && isNavigation && !busyRef.current) {
      busyRef.current = true
      sessionStorage.removeItem('ribbon-drop')

      outer.style.transition = 'none'
      outer.style.height = '110px'
      void outer.offsetHeight
      requestAnimationFrame(() => {
        if (!outer) return
        outer.style.transition = EASE_DROP
        outer.style.height = '70vh'
      })

      // 幕布上滑 ~500ms 后回弹 + 摇摆
      setTimeout(() => {
        if (!outer) return
        outer.style.transition = EASE_PULL
        outer.style.height = '110px'
        busyRef.current = false
        setTimeout(startSway, 450)
      }, 720)
      return
    }

    /* ─────────── 内页间切换 / 直接访问内页 ─────────── */
    if (!isNavigation) {
      outer.style.transition = 'none'
      outer.style.height = '110px'
    }
  }, [pathname, isHome])

  return (
    <div
      ref={outerRef}
      className="max-md:hidden"
      style={{
        position: 'fixed', right: 28, top: 0, zIndex: 10000, width: 28,
        height: '110px', pointerEvents: 'none', overflow: 'hidden',
        // 容器本身不旋转，由内层处理 sway
      }}>
      {/* 内层 — 承载 sway 旋转 */}
      <div
        ref={innerRef}
        style={{
          width: 28, minHeight: '100%', transformOrigin: 'top center',
          borderRadius: '0 0 6px 6px',
          boxShadow: '0 2px 8px rgba(80,40,20,0.12)',
        }}>
        {/* 上段 — 较亮（受光面） */}
        <div style={{
          height: '110px',
          background: 'linear-gradient(180deg, #ceb090 0%, #c4a484 30%, #ba9878 60%, #b89878 100%)',
          borderRadius: '0 0 0 0',
        }} />
        {/* 下段 — 稍暗（垂坠阴影） */}
        <div style={{
          minHeight: 'calc(70vh - 110px)',
          background: 'linear-gradient(180deg, #b89878 0%, #b09070 30%, #a88868 70%, #a08060 100%)',
          borderRadius: '0 0 6px 6px',
        }} />
      </div>

      <style>{`
        @keyframes ribbonSway {
          0%   { transform: rotate(0deg); }
          14%  { transform: rotate(2.2deg); }
          32%  { transform: rotate(-1.6deg); }
          52%  { transform: rotate(0.7deg); }
          72%  { transform: rotate(-0.3deg); }
          88%  { transform: rotate(0.1deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  )
}
