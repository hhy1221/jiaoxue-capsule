'use client'

import { useState, useEffect, useLayoutEffect, useCallback, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import WeChatLogin from '@/components/auth/WeChatLogin'

// SSR 安全：服务端降级为 useEffect（不执行），客户端用 useLayoutEffect（绘制前同步执行）
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function HeroCurtain() {
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === '/'

  const [showLogin, setShowLogin] = useState(false)

  // ═══ Refs — 绕过 React 渲染时序，直接操控 DOM ═══
  const curtainRef = useRef<HTMLDivElement>(null)
  const ribbonRef = useRef<HTMLDivElement>(null)
  const busyRef = useRef(false)       // 防 StrictMode 双重触发
  const prevPathname = useRef(pathname) // 区分「初始加载」和「路由跳转」

  // ═══ 过渡控制器 — 每次 pathname 变化时同步执行（在浏览器绘制之前）═══
  useIsoLayoutEffect(() => {
    const curtain = curtainRef.current
    const ribbon = ribbonRef.current
    if (!curtain) return

    const isNavigation = prevPathname.current !== pathname
    prevPathname.current = pathname

    /* ─────────── 返回首页 ─────────── */
    if (isHome) {
      busyRef.current = false

      if (isNavigation) {
        // 从内页返回 → 幕布从上往下滑入
        curtain.style.display = 'block'
        curtain.style.transition = 'none'
        curtain.style.transform = 'translateY(-105vh)'
        // 强制浏览器认下起始位置
        void curtain.offsetHeight
        // 启动入场动画
        requestAnimationFrame(() => {
          if (!curtain) return
          curtain.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)'
          curtain.style.transform = 'translateY(0)'
        })
        // 缎带回弹
        if (ribbon) {
          ribbon.style.transition = 'none'
          ribbon.style.height = '70vh'
          void ribbon.offsetHeight
          requestAnimationFrame(() => {
            if (!ribbon) return
            ribbon.style.transition = 'height 0.4s cubic-bezier(0.34,1.56,0.64,1)'
            ribbon.style.height = '110px'
          })
        }
      } else {
        // 初始加载首页 → 直接显示
        curtain.style.display = 'block'
        curtain.style.transform = 'translateY(0)'
        if (ribbon) {
          ribbon.style.transition = 'none'
          ribbon.style.height = '110px'
        }
      }
      return
    }

    /* ─────────── 离开首页 → 内页 ─────────── */
    const wantExit = sessionStorage.getItem('curtain') === '1'

    if (wantExit && !busyRef.current) {
      busyRef.current = true
      sessionStorage.removeItem('curtain')

      // 确保幕布可见，从原位开始
      curtain.style.display = 'block'
      curtain.style.transition = 'none'
      curtain.style.transform = 'translateY(0)'

      // 阶段 1：缎带下拉
      if (ribbon) {
        ribbon.style.transition = 'none'
        ribbon.style.height = '110px'
        void ribbon.offsetHeight
        requestAnimationFrame(() => {
          if (!ribbon) return
          ribbon.style.transition = 'height 0.45s cubic-bezier(0.34,1.56,0.64,1)'
          ribbon.style.height = '70vh'
        })
      }

      // 阶段 2：幕布上滑（稍晚于缎带）
      const t1 = setTimeout(() => {
        if (!curtain) return
        curtain.style.transition = 'transform 0.5s cubic-bezier(0.65,0,0.35,1)'
        curtain.style.transform = 'translateY(-105vh)'
      }, 80)

      // 阶段 3：动画结束后隐藏幕布
      const t2 = setTimeout(() => {
        if (!curtain) return
        curtain.style.display = 'none'
        busyRef.current = false
      }, 700)

      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
      }
    }

    /* ─────────── 非首页（直接访问 或 StrictMode 二次触发）─────────── */
    if (!busyRef.current) {
      curtain.style.display = 'none'
      if (ribbon) {
        ribbon.style.transition = 'none'
        ribbon.style.height = '110px'
      }
    }
  }, [pathname, isHome])

  // ═══ 导航链接点击 → 设标志键 + 立即跳转 ═══
  const handleNav = useCallback((e: React.MouseEvent, path: string) => {
    e.preventDefault()
    sessionStorage.setItem('from-home', '1')
    sessionStorage.setItem('curtain', '1')
    router.push(path)
  }, [router])

  const handleCTA = useCallback((e: React.MouseEvent) => {
    handleNav(e, '/dashboard')
  }, [handleNav])

  // ═══ 幕布始终以 display:block 渲染（由 useLayoutEffect 管理实际可见性）═══
  return (
    <div
      ref={curtainRef}
      className="fixed inset-0 z-[9999] bg-black overflow-hidden"
      style={{
        display: 'block',
        transform: 'translateY(0)',
        pointerEvents: isHome ? 'auto' : 'none',
      }}>
      {/* ═══ 缎带 ═══ */}
      <div ref={ribbonRef} style={{
        position: 'fixed', right: 28, top: 0, zIndex: 1000, width: 28,
        height: '110px',
        pointerEvents: 'none', overflow: 'hidden',
      }}>
        <div style={{
          width: 28, minHeight: '100%',
          background: 'linear-gradient(180deg,#c8a888,#b89878 40%,#c8a888 100%)',
          borderRadius: '0 0 6px 6px',
          boxShadow: '0 2px 8px rgba(80,40,20,0.12)',
        }} />
      </div>

      {/* 🌄 全屏大图背景 */}
      <div className="fixed inset-0 z-0" style={{ background: "url('/images/bg-hero.webp') center/cover no-repeat" }} />

      {/* 🌫️ 遮罩 */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'linear-gradient(180deg,rgba(0,0,0,0.22) 0%,transparent 14%),linear-gradient(0deg,rgba(0,0,0,0.20) 0%,transparent 10%)' }} />

      {/* 🧭 顶部导航 */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-10 py-5 flex items-center justify-between max-sm:px-5 max-sm:py-3">
        <div className="flex items-center gap-2 text-white text-[17px] tracking-wider no-underline" style={{ fontFamily: "var(--font-serif)", textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>
          <span className="w-[6px] h-[6px] rounded-full bg-[#f0c060] shadow-[0_0_6px_rgba(240,192,96,0.5)]" />
          记忆胶囊
        </div>
        <div className="flex gap-6 items-center max-sm:gap-4 pr-12">
          <a href="/dashboard" onClick={(e) => handleNav(e, '/dashboard')} className="text-[11px] text-white/80 tracking-widest no-underline hover:text-white transition-colors" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>仪表盘</a>
          <a href="/students" onClick={(e) => handleNav(e, '/students')} className="text-[11px] text-white/80 tracking-widest no-underline hover:text-white transition-colors" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>学生档案</a>
          <a href="/letters" onClick={(e) => handleNav(e, '/letters')} className="text-[11px] text-white/80 tracking-widest no-underline hover:text-white transition-colors" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>临别信</a>
          <a href="/settings" onClick={(e) => handleNav(e, '/settings')} className="text-[11px] text-white/80 tracking-widest no-underline hover:text-white transition-colors" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>皮肤</a>
          <button onClick={() => setShowLogin(true)} className="text-[11px] text-white/80 tracking-widest hover:text-white transition-colors bg-transparent border-none cursor-pointer" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>登录</button>
        </div>
      </nav>

      {/* 🎯 右上角年份 */}
      <div className="fixed top-[100px] right-10 z-20 pointer-events-none max-sm:top-[70px] max-sm:right-4">
        <span className="text-[48px] font-extralight text-white/10 leading-none max-sm:text-[32px]" style={{ fontFamily: "var(--font-serif)" }}>2026</span>
      </div>

      {/* 📊 左下角统计 */}
      <div className="fixed bottom-8 left-10 z-20 flex gap-6 max-sm:left-4 max-sm:bottom-5 max-sm:gap-4">
        {[{ num: '13', lbl: '天夏令营' }, { num: '60+', lbl: '位学生' }, { num: '5', lbl: '种语气' }].map(s => (
          <div key={s.lbl} className="flex flex-col">
            <span className="text-[18px] font-semibold text-white/50 leading-none" style={{ fontFamily: "var(--font-serif)", textShadow: "0 1px 3px rgba(0,0,0,0.15)" }}>{s.num}</span>
            <span className="text-[8px] text-white/30 tracking-widest mt-0.5" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>{s.lbl}</span>
          </div>
        ))}
      </div>

      {/* 💎 居中玻璃卡 */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
        <div className="text-center px-[72px] py-[52px] rounded-[28px] max-sm:px-6 max-sm:py-8 max-sm:rounded-[22px] relative"
          style={{
            background: 'linear-gradient(170deg,rgba(255,255,255,0.10) 0%,rgba(255,255,255,0.04) 35%,rgba(255,255,255,0.01) 65%,rgba(255,255,255,0.06) 100%)',
            backdropFilter: 'blur(6px) saturate(1.1)', WebkitBackdropFilter: 'blur(6px) saturate(1.1)',
            border: '1px solid rgba(255,255,255,0.10)',
            boxShadow: '0 4px 32px rgba(0,0,0,0.08),0 1px 2px rgba(0,0,0,0.04),inset 0 1px 0 rgba(255,255,255,0.05)',
          }}>
          <div className="absolute top-0 left-[20%] right-[20%] h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)' }} />
          <p className="text-[11px] text-white/60 tracking-[0.35em] mb-3.5" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.2)" }}>凡星支教队 · 二〇二六 · 筠连</p>
          <h1 className="text-[clamp(42px,9vw,96px)] font-black text-white leading-none whitespace-nowrap mb-1.5 tracking-normal" style={{ fontFamily: "var(--font-serif)", textShadow: "0 2px 4px rgba(0,0,0,0.12),0 4px 24px rgba(0,0,0,0.08)" }}>支教记忆胶囊</h1>
          <p className="text-[14px] font-light text-white/65 tracking-[0.16em] mb-5" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.2)" }}>记录每个孩子 · AI 自动生成专属临别信</p>
          <div className="w-10 h-px bg-white/30 mx-auto mb-[18px]" />
          <div className="flex gap-5 justify-center mb-[18px] flex-wrap max-sm:gap-2.5">
            {['📝 学生档案', '🤖 AI 临别信', '🎨 五种语气'].map(t => (
              <span key={t} className="text-[12px] text-white/60 tracking-wider cursor-default hover:text-white/95 transition-colors" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>{t}</span>
            ))}
          </div>
          <button onClick={handleCTA} className="inline-flex items-center gap-2 px-8 py-2.5 bg-[#f0c060] text-[#3d2e1a] text-[13px] font-semibold tracking-wider rounded-[22px] no-underline shadow-[0_4px_18px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.35)] hover:bg-[#f4c870] border-none cursor-pointer" style={{ fontFamily: 'inherit' }}>开始记录 →</button>
        </div>
      </div>

      {/* 底部淡字 */}
      <p className="fixed bottom-7 left-1/2 -translate-x-1/2 z-20 text-[9px] text-white/25 tracking-[0.3em]">每一段成长都值得被记住</p>

      {showLogin && <WeChatLogin onClose={() => setShowLogin(false)} />}
    </div>
  )
}
