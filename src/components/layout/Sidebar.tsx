'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useState, useRef, useCallback, useEffect } from 'react'

/* ═══════════════════════════════
   导航分组
   ═══════════════════════════════ */
interface NavItem { href: string; label: string; icon: string; exact?: boolean; badge?: number }
interface NavGroup { label: string; items: NavItem[] }

const NAV_GROUPS: NavGroup[] = [
  { label: '核心', items: [
    { href: '/', label: '首页', icon: '🏠', exact: true },
    { href: '/dashboard', label: '仪表盘', icon: '📊' },
  ]},
  { label: '支教工作', items: [
    { href: '/students', label: '学生档案', icon: '📝' },
    { href: '/schedule', label: '课表管理', icon: '📅' },
    { href: '/classroom', label: '课堂', icon: '🏫' },
    { href: '/letters', label: '临别信', icon: '✉️' },
    { href: '/messages', label: '消息中心', icon: '💬', badge: 2 },
  ]},
  { label: 'AI 创意', items: [
    { href: '/ai-workshop', label: 'AI 工坊', icon: '✨' },
    { href: '/penpal-square', label: '笔友广场', icon: '💌' },
    { href: '/growth-video', label: '成长视频', icon: '🎬' },
  ]},
  { label: '资源与团队', items: [
    { href: '/gallery', label: '相册', icon: '📷' },
    { href: '/members', label: '成员', icon: '👥' },
    { href: '/announcements', label: '公告', icon: '📢' },
    { href: '/resources', label: '资源库', icon: '📚' },
    { href: '/reviews', label: '评价', icon: '⭐' },
  ]},
  { label: '其他', items: [
    { href: '/settings', label: '设置', icon: '⚙️' },
  ]},
]

const GROUP_COLORS = [
  { dot: '#d4a853' }, { dot: '#7a9a5a' }, { dot: '#6baed6' }, { dot: '#d4855e' }, { dot: '#a78bfa' },
]

/* ═══════════════════════════════
   缓动函数
   ═══════════════════════════════ */
function easeOutBack(t: number): number {
  const c1 = 1.70158; const c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}

export default function Sidebar() {
  const pathname = usePathname()
  const [hoveredHref, setHoveredHref] = useState<string | null>(null)
  const [pressingHref, setPressingHref] = useState<string | null>(null)
  const [asideExited, setAsideExited] = useState(0)
  const [width, setWidth] = useState(220)

  const asideRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const ribbonRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const glowRaf = useRef<number>(undefined)
  const ribbonRaf = useRef<number>(undefined)

  // 同步宽度到 CSS 变量 + 持久化
  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', `${width}px`)
    try { localStorage.setItem('sidebar-width', String(width)) } catch {}
  }, [width])

  // 恢复保存的宽度
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sidebar-width')
      if (saved) setWidth(Math.max(170, Math.min(400, Number(saved))))
    } catch {}
  }, [])

  // ═══ 拖拽调整宽度 ═══
  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    dragging.current = true
    const startX = e.clientX
    const startW = width

    const onMove = (ev: MouseEvent) => {
      if (!dragging.current) return
      const newWidth = Math.max(170, Math.min(400, startW + ev.clientX - startX))
      setWidth(newWidth)
    }
    const onUp = () => {
      dragging.current = false
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }, [width])

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  /* ── 获取当前激活项 href ── */
  const findActiveHref = useCallback(() => {
    for (const group of NAV_GROUPS)
      for (const item of group.items)
        if (isActive(item.href, item.exact)) return item.href
    return ''
  }, [pathname])

  /* ── 获取某个 nav item 相对 aside 的位置 ── */
  const getPosInAside = useCallback((href: string) => {
    const aside = asideRef.current
    const nav = navRef.current
    if (!aside || !nav) return null
    const el = nav.querySelector(`[data-nav-href="${href}"]`)
    if (!el) return null
    const asideRect = aside.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    return {
      top: elRect.top - asideRect.top,
      height: elRect.height,
    }
  }, [])

  /* ═══ A：浮空光斑 — 在 nav item 之间滑行 ═══ */
  const animateGlowTo = useCallback((href: string) => {
    const glow = glowRef.current
    const pos = getPosInAside(href)
    if (!glow || !pos) return
    if (glowRaf.current) cancelAnimationFrame(glowRaf.current)

    const sTop = parseFloat(glow.style.top as string) || pos.top
    const sH = parseFloat(glow.style.height as string) || pos.height
    const dur = 300, t0 = performance.now()

    function tick(now: number) {
      const p = Math.min((now - t0) / dur, 1)
      const e = easeOutBack(p)
      if (glow) {
        glow.style.transition = 'none'
        glow.style.opacity = '1'
        glow.style.top = `${sTop + (pos!.top - sTop) * e}px`
        glow.style.height = `${sH + (pos!.height - sH) * e}px`
      }
      if (p < 1) glowRaf.current = requestAnimationFrame(tick)
    }
    glowRaf.current = requestAnimationFrame(tick)
  }, [getPosInAside])

  /* ═══ B：书签缎带 — 丝绸物理 ═══ */
  const animateRibbonTo = useCallback((href: string, swing = false) => {
    const ribbon = ribbonRef.current
    const pos = getPosInAside(href)
    if (!ribbon || !pos) return
    if (ribbonRaf.current) cancelAnimationFrame(ribbonRaf.current)

    const sTop = parseFloat(ribbon.style.top as string) || pos.top
    const sH = parseFloat(ribbon.style.height as string) || pos.height
    const dur = swing ? 400 : 280, t0 = performance.now()

    function tick(now: number) {
      const p = Math.min((now - t0) / dur, 1)
      const e = swing ? easeOutBack(p)
        : p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2
      if (ribbon) {
        ribbon.style.transition = 'none'
        ribbon.style.opacity = '1'
        ribbon.style.top = `${sTop + (pos!.top - sTop) * e}px`
        ribbon.style.height = `${sH + (pos!.height - sH) * e}px`
      }
      if (p < 1) ribbonRaf.current = requestAnimationFrame(tick)
    }
    ribbonRaf.current = requestAnimationFrame(tick)
  }, [getPosInAside])

  /* ── 缎带点击脉冲（短暂变宽回弹）── */
  const pulseRibbon = useCallback(() => {
    const ribbon = ribbonRef.current; if (!ribbon) return
    ribbon.style.transition = 'width 0.12s ease-out'
    ribbon.style.width = '6px'
    setTimeout(() => {
      if (!ribbon) return
      ribbon.style.transition = 'width 0.35s cubic-bezier(0.34,1.56,0.64,1)'
      ribbon.style.width = '3px'
    }, 140)
  }, [])

  /* ── 初始化 + pathname 变化时重置到激活项 ── */
  useEffect(() => {
    const href = findActiveHref()
    if (href) {
      requestAnimationFrame(() => {
        const pos = getPosInAside(href)
        if (glowRef.current && pos) {
          glowRef.current.style.transition = 'none'
          glowRef.current.style.top = `${pos.top}px`
          glowRef.current.style.height = `${pos.height}px`
          glowRef.current.style.opacity = '1'
        }
        if (ribbonRef.current && pos) {
          ribbonRef.current.style.transition = 'none'
          ribbonRef.current.style.top = `${pos.top}px`
          ribbonRef.current.style.height = `${pos.height * 0.6}px`
          ribbonRef.current.style.opacity = '1'
        }
      })
    }
  }, [pathname])

  /* ── hover 变化 → 光斑+缎带追踪 ── */
  useEffect(() => {
    if (hoveredHref) {
      animateGlowTo(hoveredHref)
      animateRibbonTo(hoveredHref, true)
    }
    // hoveredHref=null 时不做任何事 — 光斑停在原位等待下次 hover 或离开侧边栏
  }, [hoveredHref])

  /* ── 离开侧边栏 → 回归激活项 ── */
  useEffect(() => {
    if (asideExited === 0) return
    const href = findActiveHref()
    if (href) {
      animateGlowTo(href)
      animateRibbonTo(href)
    }
  }, [asideExited])

  /* ── 清理 ── */
  useEffect(() => () => {
    if (glowRaf.current) cancelAnimationFrame(glowRaf.current)
    if (ribbonRaf.current) cancelAnimationFrame(ribbonRaf.current)
  }, [])

  return (
    <>
      <aside ref={asideRef}
        data-sidebar
        className="fixed left-0 top-0 h-full z-40 flex flex-col"
        style={{
          width,
          background: 'linear-gradient(175deg,#fefcf8 0%,#fdf9f2 20%,#fcf6ec 50%,#fdf9f3 80%,#fefcf8 100%)',
          borderRight: '1.5px solid rgba(200,180,160,0.22)',
          boxShadow: '3px 0 20px rgba(80,40,20,0.04)',
        }}
        onMouseLeave={() => { setAsideExited(c => c + 1) }}>

        {/* ═══ 拖拽手柄 — 右侧边界 ═══ */}
        <div
          onMouseDown={handleResizeStart}
          className="absolute top-0 right-0 h-full z-50 cursor-col-resize group"
          style={{ width: 6, transform: 'translateX(50%)' }}>
          {/* 中间竖线 — hover 时显示 */}
          <div className="absolute top-[20%] bottom-[20%] left-1/2 w-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ background: 'rgba(180,150,120,0.5)', transform: 'translateX(-50%)' }} />
        </div>

        {/* Logo */}
        <div className="px-5 pt-7 pb-4">
          <div className="flex justify-between px-1 mb-4">
            {[...Array(7)].map((_, i) => (
              <span key={i} className="block"
                style={{ width:7,height:7,borderRadius:'50%',background:'radial-gradient(circle at 35% 35%,#fff,#d4c8b0)',boxShadow:'inset 0 1px 2px rgba(0,0,0,0.2)' }}/>
            ))}
          </div>
          <Link href="/" className="flex items-center gap-3 no-underline group px-1">
            <div className="relative flex-shrink-0">
              <div className="absolute -inset-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background:'radial-gradient(circle,rgba(200,160,120,0.2),transparent 70%)' }}/>
              <span className="relative text-2xl transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5">🌱</span>
            </div>
            <div className="min-w-0">
              <h2 className="text-[15px] font-semibold tracking-[0.04em] leading-tight text-[var(--ink)]"
                style={{ fontFamily:'var(--font-serif)' }}>记忆胶囊</h2>
              <p className="text-[9px] tracking-[0.12em] mt-0.5 handwriting"
                style={{ color:'var(--faded)' }}>凡星支教队</p>
            </div>
          </Link>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="h-px flex-1" style={{ background:'linear-gradient(90deg,transparent,rgba(180,160,130,0.25),transparent)' }}/>
            <span className="text-[10px] opacity-30" style={{ color:'var(--faded)' }}>✦</span>
            <div className="h-px flex-1" style={{ background:'linear-gradient(90deg,transparent,rgba(180,160,130,0.25),transparent)' }}/>
          </div>
        </div>

        {/* Nav */}
        <nav ref={navRef} className="flex-1 px-2.5 py-1 space-y-5 overflow-y-auto"
          style={{ scrollbarWidth:'none' }}>
          {NAV_GROUPS.map((group, gi) => (
            <div key={group.label} className="relative z-[1]">
              <p className="px-3 mb-1.5 text-[9px] font-medium tracking-[0.15em] uppercase"
                style={{ color:GROUP_COLORS[gi].dot,fontFamily:'var(--font-sans)',opacity:0.7 }}>
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.items.map(item => {
                  const active = isActive(item.href, item.exact)
                  const hovering = hoveredHref === item.href
                  const pressing = pressingHref === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      data-nav-href={item.href}
                      className={cn(
                        'flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] font-medium tracking-[0.03em] relative',
                        active ? 'text-white' : 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
                      )}
                      style={{
                        background: active ? 'linear-gradient(135deg,#9b7a4a,#7a5a3a,#6b4a2a)' : 'transparent',
                        boxShadow: active ? '0 2px 8px rgba(80,50,20,0.15),0 1px 2px rgba(0,0,0,0.08)' : 'none',
                        // ═══ D：纸页微翘 ═══
                        transform: pressing
                          ? 'translateX(2px) scale(0.97)'
                          : hovering && !active
                            ? 'translateX(4px)'
                            : 'translateX(0)',
                        transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1), background 0.35s, box-shadow 0.35s, color 0.25s',
                      }}
                      onMouseEnter={() => setHoveredHref(item.href)}
                      onMouseLeave={() => setHoveredHref(null)}
                      onMouseDown={() => setPressingHref(item.href)}
                      onMouseUp={() => setPressingHref(null)}
                      onClick={(e) => {
                        if (item.href === '/') {
                          e.preventDefault()
                          window.dispatchEvent(new CustomEvent('return-home'))
                          return
                        }
                        pulseRibbon()
                      }}>
                      {/* 图标 — hover弹跳 */}
                      <span className="text-sm w-5 text-center flex-shrink-0"
                        style={{
                          transform: hovering ? 'scale(1.15) translateY(-1px)' : 'scale(1)',
                          transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
                        }}>
                        {item.icon}
                      </span>
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge != null && item.badge > 0 && (
                        <span className="flex-shrink-0 min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-[9px] font-bold"
                          style={{ background: active ? 'rgba(255,255,255,0.25)' : 'linear-gradient(135deg,#d4855e,#c07050)', color:'#fff' }}>
                          {item.badge}
                        </span>
                      )}
                      {active && (
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-white/60"
                          style={{ boxShadow:'0 0 4px rgba(255,255,255,0.3)' }}/>
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* ═══ A：浮空光斑（在 nav 之外、aside 之内，不受滚动裁剪）═══ */}
        <div
          ref={glowRef}
          className="absolute left-[10px] right-[10px] pointer-events-none"
          style={{
            top: 0, height: 40, opacity: 0, zIndex: 0,
            background: 'radial-gradient(ellipse 95% 100% at 50% 50%, rgba(220,180,120,0.13) 0%, rgba(200,150,80,0.04) 50%, transparent 75%)',
            borderRadius: 10,
          }}
        />

        {/* ═══ B：书签缎带（在 aside 内最左侧）═══ */}
        <div
          ref={ribbonRef}
          className="absolute pointer-events-none max-md:hidden"
          style={{
            left: 0, top: 0, width: 3, height: 20, opacity: 0, zIndex: 45,
            background: 'linear-gradient(180deg,#d4a853 0%,#f0c060 40%,#c89840 100%)',
            borderRadius: '0 3px 3px 0',
            boxShadow: '0 0 8px rgba(200,150,60,0.3)',
          }}
        />

        {/* Footer */}
        <div className="px-3 pb-5 pt-2 relative z-[1]">
          <div className="flex justify-center gap-1 mb-3">
            {[0,1,2].map(i => (
              <span key={i} className="block rounded-full"
                style={{ width:3+i,height:3+i,background:`rgba(180,150,120,${0.3-i*0.08})` }}/>
            ))}
          </div>
          <div className="p-3.5 rounded-xl relative overflow-hidden"
            style={{ background:'linear-gradient(160deg,rgba(245,238,225,0.7),rgba(240,230,215,0.5))',border:'1px solid rgba(200,180,160,0.2)' }}>
            <div className="absolute -top-1.5 -right-1.5 w-6 h-3 rounded-[1px]"
              style={{ background:'rgba(185,210,190,0.45)',transform:'rotate(12deg)',boxShadow:'0 1px 2px rgba(0,0,0,0.04)' }}/>
            <p className="text-[9px] leading-relaxed tracking-[0.06em] text-center handwriting"
              style={{ color:'var(--ink-faint)' }}>
              2026 · 筠连<br/>
              <span className="text-[12px] font-semibold tracking-[0.04em]"
                style={{ color:'var(--ink-soft)',fontFamily:'var(--font-serif)' }}>13天夏令营</span>
            </p>
            <p className="text-[8px] text-center mt-1.5 tracking-[0.1em] handwriting"
              style={{ color:'var(--faded)',opacity:0.5 }}>让记忆不散场</p>
          </div>
        </div>
      </aside>
    </>
  )
}
