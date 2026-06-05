'use client'

import { useState, useEffect, useLayoutEffect, useCallback, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import WeChatLogin from '@/components/auth/WeChatLogin'
import MagicDust from '@/components/animations/MagicDust'

export default function HeroCurtain() {
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === '/'

  const [showLogin, setShowLogin] = useState(false)

  const curtainRef = useRef<HTMLDivElement>(null)
  const busyRef = useRef(false)
  const prevPathname = useRef(pathname)
  const returningHome = useRef(false)

  useLayoutEffect(() => {
    const curtain = curtainRef.current
    if (!curtain) return

    const curtailVal = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('curtain') : null
    const isNavigation = prevPathname.current !== pathname
    prevPathname.current = pathname

    if (isHome) {
      busyRef.current = false
      if (isNavigation && returningHome.current) {
        returningHome.current = false
        curtain.style.display = 'block'
        curtain.style.transform = 'translateY(0)'
        return
      }
      if (isNavigation) {
        curtain.style.display = 'block'
        curtain.style.transition = 'none'
        curtain.style.transform = 'translateY(-105vh)'
        void curtain.offsetHeight
        requestAnimationFrame(() => {
          if (!curtain) return
          curtain.style.transition = 'transform 0.5s cubic-bezier(0.65,0,0.35,1)'
          curtain.style.transform = 'translateY(0)'
        })
      } else {
        curtain.style.display = 'block'
        curtain.style.transform = 'translateY(0)'
      }
      return
    }

    const wantExit = curtailVal === '1'
    if (wantExit && !busyRef.current) {
      busyRef.current = true
      sessionStorage.removeItem('curtain')
      curtain.style.display = 'block'
      curtain.style.transition = 'none'
      curtain.style.transform = 'translateY(0)'
      const t1 = setTimeout(() => {
        if (!curtain) return
        curtain.style.transition = 'transform 0.5s cubic-bezier(0.65,0,0.35,1)'
        curtain.style.transform = 'translateY(-105vh)'
      }, 80)
      const t2 = setTimeout(() => {
        if (!curtain) return
        curtain.style.display = 'none'
        busyRef.current = false
      }, 700)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }

    if (!busyRef.current) {
      curtain.style.display = 'none'
    }
  }, [pathname, isHome])

  useEffect(() => {
    const handler = () => {
      const curtain = curtainRef.current
      if (!curtain || returningHome.current) return
      if (isHome) return
      returningHome.current = true
      curtain.style.display = 'block'
      curtain.style.transition = 'none'
      curtain.style.transform = 'translateY(-105vh)'
      void curtain.offsetHeight
      requestAnimationFrame(() => {
        if (!curtain) return
        curtain.style.transition = 'transform 0.5s cubic-bezier(0.65,0,0.35,1)'
        curtain.style.transform = 'translateY(0)'
      })
      setTimeout(() => { router.push('/') }, 550)
    }
    window.addEventListener('return-home', handler)
    return () => window.removeEventListener('return-home', handler)
  }, [isHome, router])

  const handleNav = useCallback((e: React.MouseEvent, path: string) => {
    e.preventDefault()
    sessionStorage.setItem('from-home', '1')
    sessionStorage.setItem('curtain', '1')
    sessionStorage.setItem('ribbon-drop', '1')
    router.push(path)
  }, [router])

  return (
    <div
      ref={curtainRef}
      className="fixed inset-0 z-[9999] bg-black overflow-hidden"
      style={{ display: 'block', transform: 'translateY(0)', pointerEvents: isHome ? 'auto' : 'none' }}>
      {/* 全屏大图背景 */}
      <div className="fixed inset-0 z-0" style={{ background: "url('/images/bg-hero.webp') center/cover no-repeat" }} />
      {/* 遮罩 */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'linear-gradient(180deg,rgba(0,0,0,0.25) 0%,transparent 18%),linear-gradient(0deg,rgba(0,0,0,0.22) 0%,transparent 12%)' }} />

      {/* 顶部导航 */}
      <nav className="fixed top-0 left-0 right-0 z-50 pl-10 pr-[80px] py-5 flex items-center justify-between max-sm:pl-5 max-sm:pr-5 max-sm:py-3">
        <div className="flex items-center gap-2 text-white text-[17px] tracking-wider no-underline" style={{ fontFamily: "var(--font-serif)", textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>
          <span className="w-[6px] h-[6px] rounded-full bg-[#f0c060] shadow-[0_0_6px_rgba(240,192,96,0.5)]" />
          支教星火
        </div>
        <div className="flex gap-6 items-center max-sm:gap-4">
          <a href="/dashboard" onClick={(e) => handleNav(e, '/dashboard')} className="text-[11px] text-white/80 tracking-widest no-underline hover:text-white transition-colors" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>仪表盘</a>
          <a href="/community" onClick={(e) => handleNav(e, '/community')} className="text-[11px] text-white/80 tracking-widest no-underline hover:text-white transition-colors" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>社区</a>
          <a href="/journal" onClick={(e) => handleNav(e, '/journal')} className="text-[11px] text-white/80 tracking-widest no-underline hover:text-white transition-colors" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>成长日志</a>
          <button onClick={() => setShowLogin(true)} className="text-[11px] text-white/80 tracking-widest hover:text-white transition-colors bg-transparent border-none cursor-pointer" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>登录</button>
        </div>
      </nav>

      {/* 右上角年份 */}
      <div className="fixed top-[100px] right-10 z-20 pointer-events-none max-sm:top-[70px] max-sm:right-4">
        <span className="text-[48px] font-extralight text-white/10 leading-none max-sm:text-[32px]" style={{ fontFamily: "var(--font-serif)" }}>2026</span>
      </div>

      {/* 左下角统计 */}
      <div className="fixed bottom-8 left-10 z-20 flex gap-6 max-sm:left-4 max-sm:bottom-5 max-sm:gap-4">
        {[{ num: '9+', lbl: '支教队入驻' }, { num: '1,280+', lbl: '乡村学生' }, { num: '3,650+', lbl: '课堂日志' }, { num: '15+', lbl: '省份覆盖' }].map(s => (
          <div key={s.lbl} className="flex flex-col">
            <span className="text-[18px] font-semibold text-white/50 leading-none" style={{ fontFamily: "var(--font-serif)", textShadow: "0 1px 3px rgba(0,0,0,0.15)" }}>{s.num}</span>
            <span className="text-[8px] text-white/30 tracking-widest mt-0.5" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>{s.lbl}</span>
          </div>
        ))}
      </div>

      {/* 魔法尘埃 */}
      <MagicDust />

      {/* ═══════════════════════════════════════
          中央内容区 — 纯文字 + 双端入口
          ═══════════════════════════════════════ */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-center w-full max-w-[700px] px-6">
        {/* 小标题 */}
        <p className="text-[12px] text-white/50 tracking-[0.3em] mb-6" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.2)" }}>
          全国支教工作者的一站式平台
        </p>

        {/* 大标题 */}
        <h1 className="text-[clamp(48px,10vw,104px)] font-black text-white leading-[0.95] mb-6 tracking-tight"
          style={{ fontFamily: "var(--font-serif)", textShadow: "0 2px 4px rgba(0,0,0,0.12),0 4px 24px rgba(0,0,0,0.08)" }}>
          支教星火
        </h1>

        {/* 核心标语 */}
        <p className="text-[clamp(13px,2vw,17px)] font-light text-white/70 tracking-[0.12em] mb-12 leading-relaxed max-w-[560px] mx-auto"
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.2)" }}>
          汇聚每一份力量，点亮每一个乡村孩子的未来
        </p>

        {/* ═══ 双端入口 — 独立优雅 ═══ */}
        <div className="flex gap-6 justify-center max-sm:gap-3 max-sm:flex-col max-sm:items-center">
          {/* 教师端 */}
          <a href="/dashboard" onClick={(e) => handleNav(e, '/dashboard')}
            className="group relative flex flex-col items-center justify-center w-[220px] h-[120px] rounded-2xl no-underline transition-all duration-500 overflow-hidden max-sm:w-[260px]"
            style={{
              background: 'linear-gradient(170deg,rgba(255,255,255,0.08) 0%,rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.04)',
            }}>
            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'radial-gradient(ellipse at center,rgba(255,255,255,0.06),transparent 70%)' }} />
            <span className="relative text-[36px] mb-1 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">👨‍🏫</span>
            <span className="relative text-[22px] font-bold text-white tracking-[0.08em]"
              style={{ fontFamily: "var(--font-serif)", textShadow: "0 1px 3px rgba(0,0,0,0.15)" }}>教师端</span>
            <span className="relative text-[10px] text-white/35 tracking-[0.15em] mt-0.5">一站式工作平台</span>
            {/* Arrow on hover */}
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/0 group-hover:text-white/40 transition-all duration-500 group-hover:translate-x-1 text-lg">→</span>
          </a>

          {/* 学生端 */}
          <a href="/student" onClick={(e) => handleNav(e, '/student')}
            className="group relative flex flex-col items-center justify-center w-[220px] h-[120px] rounded-2xl no-underline transition-all duration-500 overflow-hidden max-sm:w-[260px]"
            style={{
              background: 'linear-gradient(170deg,rgba(255,255,255,0.08) 0%,rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.04)',
            }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'radial-gradient(ellipse at center,rgba(255,255,255,0.06),transparent 70%)' }} />
            <span className="relative text-[36px] mb-1 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">🧒</span>
            <span className="relative text-[22px] font-bold text-white tracking-[0.08em]"
              style={{ fontFamily: "var(--font-serif)", textShadow: "0 1px 3px rgba(0,0,0,0.15)" }}>学生端</span>
            <span className="relative text-[10px] text-white/35 tracking-[0.15em] mt-0.5">成长 · 探索 · 交友</span>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/0 group-hover:text-white/40 transition-all duration-500 group-hover:translate-x-1 text-lg">→</span>
          </a>
        </div>

        {/* 底部说明 */}
        <p className="text-[10px] text-white/25 tracking-[0.2em] mt-10">
          为支教团队提供一站式工作平台与实践渠道 · 汇聚全国力量为乡村孩子带去更优质的教育
        </p>
      </div>

      {/* 底部淡字 */}
      <p className="fixed bottom-7 left-1/2 -translate-x-1/2 z-20 text-[9px] text-white/25 tracking-[0.3em]">星星之火，可以燎原</p>

      {showLogin && <WeChatLogin onClose={() => setShowLogin(false)} />}
    </div>
  )
}
