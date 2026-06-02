'use client'

import { useRef, useLayoutEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * 统一缎带 — 独立于 HeroCurtain 和 InnerLayout，始终存在
 * z-index 10000：高于幕布(9999)，高于侧边栏(40)，跨路由不卸载
 *
 * 动画时序：
 *   首页→内页：缎带 110→70vh 下拉 → 幕布上滑露出内页 → 缎带 70vh→110 回弹
 *   内页→首页：缎带 110→70vh → 幕布下滑 → 缎带回弹
 *   内页间切换：缎带保持 110px，无动画
 */
export default function Ribbon() {
  const pathname = usePathname()
  const ribbonRef = useRef<HTMLDivElement>(null)
  const prevPathname = useRef(pathname)
  const busyRef = useRef(false)
  const isHome = pathname === '/'

  useLayoutEffect(() => {
    const ribbon = ribbonRef.current
    if (!ribbon) return

    const isNavigation = prevPathname.current !== pathname
    prevPathname.current = pathname

    /* ─────────── 在首页 ─────────── */
    if (isHome) {
      busyRef.current = false
      if (isNavigation) {
        // 从内页返回 → 缎带先下拉，幕布下滑后再回弹
        ribbon.style.transition = 'none'
        ribbon.style.height = '110px'
        void ribbon.offsetHeight
        requestAnimationFrame(() => {
          if (!ribbon) return
          ribbon.style.transition = 'height 0.45s cubic-bezier(0.34,1.56,0.64,1)'
          ribbon.style.height = '70vh'
        })
        // 幕布下滑约 0.5s 后回弹
        setTimeout(() => {
          if (!ribbon) return
          ribbon.style.transition = 'height 0.4s cubic-bezier(0.34,1.56,0.64,1)'
          ribbon.style.height = '110px'
        }, 650)
      } else {
        // 初始加载首页
        ribbon.style.transition = 'none'
        ribbon.style.height = '110px'
      }
      return
    }

    /* ─────────── 离开首页 → 内页 ─────────── */
    const wantDrop = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('ribbon-drop') === '1'

    if (wantDrop && isNavigation && !busyRef.current) {
      busyRef.current = true
      sessionStorage.removeItem('ribbon-drop')

      // 从正常位置开始下拉
      ribbon.style.transition = 'none'
      ribbon.style.height = '110px'
      void ribbon.offsetHeight
      requestAnimationFrame(() => {
        if (!ribbon) return
        ribbon.style.transition = 'height 0.45s cubic-bezier(0.34,1.56,0.64,1)'
        ribbon.style.height = '70vh'
      })

      // 幕布上滑 ~580ms 后回弹
      setTimeout(() => {
        if (!ribbon) return
        ribbon.style.transition = 'height 0.4s cubic-bezier(0.34,1.56,0.64,1)'
        ribbon.style.height = '110px'
        busyRef.current = false
      }, 720)
      return
    }

    /* ─────────── 内页间切换 / 直接访问内页 ─────────── */
    if (!isNavigation) {
      // 直接访问内页
      ribbon.style.transition = 'none'
      ribbon.style.height = '110px'
    }
    // 内页间切换：保持当前位置不变
  }, [pathname, isHome])

  return (
    <div
      ref={ribbonRef}
      className="max-md:hidden"
      style={{
        position: 'fixed', right: 28, top: 0, zIndex: 10000, width: 28,
        height: '110px', pointerEvents: 'none', overflow: 'hidden',
      }}>
      <div style={{
        width: 28, minHeight: '100%',
        background: 'linear-gradient(180deg,#c8a888,#b89878 40%,#c8a888 100%)',
        borderRadius: '0 0 6px 6px',
        boxShadow: '0 2px 8px rgba(80,40,20,0.12)',
      }} />
    </div>
  )
}
