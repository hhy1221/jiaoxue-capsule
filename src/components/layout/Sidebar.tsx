'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useState } from 'react'

/* ═══════════════════════════════
   导航分组 — 带分类小标签
   ═══════════════════════════════ */
interface NavItem { href: string; label: string; icon: string; exact?: boolean; badge?: number }
interface NavGroup { label: string; items: NavItem[] }

const NAV_GROUPS: NavGroup[] = [
  {
    label: '核心',
    items: [
      { href: '/', label: '首页', icon: '🏠', exact: true },
      { href: '/dashboard', label: '仪表盘', icon: '📊' },
    ],
  },
  {
    label: '支教工作',
    items: [
      { href: '/students', label: '学生档案', icon: '📝' },
      { href: '/schedule', label: '课表管理', icon: '📅' },
      { href: '/classroom', label: '课堂', icon: '🏫' },
      { href: '/letters', label: '临别信', icon: '✉️' },
      { href: '/messages', label: '消息中心', icon: '💬', badge: 2 },
    ],
  },
  {
    label: 'AI 创意',
    items: [
      { href: '/ai-workshop', label: 'AI 工坊', icon: '✨' },
      { href: '/penpal-square', label: '笔友广场', icon: '💌' },
      { href: '/growth-video', label: '成长视频', icon: '🎬' },
    ],
  },
  {
    label: '资源与团队',
    items: [
      { href: '/gallery', label: '相册', icon: '📷' },
      { href: '/members', label: '成员', icon: '👥' },
      { href: '/announcements', label: '公告', icon: '📢' },
      { href: '/resources', label: '资源库', icon: '📚' },
      { href: '/reviews', label: '评价', icon: '⭐' },
    ],
  },
  {
    label: '其他',
    items: [
      { href: '/settings', label: '设置', icon: '⚙️' },
    ],
  },
]

/* 颜色调色板 — 给每个导航组分配一个淡色 */
const GROUP_COLORS = [
  { dot: '#d4a853', bg: 'rgba(212,168,83,0.06)' },  // 琥珀
  { dot: '#7a9a5a', bg: 'rgba(122,154,90,0.06)' },  // 森绿
  { dot: '#6baed6', bg: 'rgba(107,174,214,0.06)' },  // 湖蓝
  { dot: '#d4855e', bg: 'rgba(212,133,94,0.06)' },   // 暖橙
  { dot: '#a78bfa', bg: 'rgba(167,139,250,0.06)' },   // 淡紫
]

export default function Sidebar() {
  const pathname = usePathname()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  return (
    <>

      {/* ═══ 侧边栏主体 ═══ */}
      <aside className="fixed left-0 top-0 h-full z-40 w-[220px] flex flex-col overflow-hidden"
        style={{
          background: `
            linear-gradient(175deg,
              #fefcf8 0%,
              #fdf9f2 20%,
              #fcf6ec 50%,
              #fdf9f3 80%,
              #fefcf8 100%
            )`,
          borderRight: '1.5px solid rgba(200,180,160,0.22)',
          boxShadow: '3px 0 20px rgba(80,40,20,0.04)',
        }}>

        {/* ── Logo 区 ── */}
        <div className="px-5 pt-7 pb-4 relative">
          {/* 顶部线装孔 */}
          <div className="flex justify-between px-1 mb-4">
            {[...Array(7)].map((_, i) => (
              <span key={i} className="block"
                style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #fff, #d4c8b0)',
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2)',
                }}
              />
            ))}
          </div>

          <Link href="/" className="flex items-center gap-3 no-underline group px-1"
            onMouseEnter={() => setHoveredItem('logo')}
            onMouseLeave={() => setHoveredItem(null)}>
            {/* 图标 — 水彩圈 */}
            <div className="relative flex-shrink-0">
              <div className="absolute -inset-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(circle, rgba(200,160,120,0.2), transparent 70%)' }} />
              <span className="relative text-2xl transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5">
                🌱
              </span>
            </div>

            <div className="min-w-0">
              <h2 className="text-[15px] font-semibold tracking-[0.04em] leading-tight text-[var(--ink)]"
                style={{ fontFamily: "var(--font-serif)" }}>
                记忆胶囊
              </h2>
              <p className="text-[9px] tracking-[0.12em] mt-0.5 handwriting"
                style={{ color: 'var(--faded)' }}>
                凡星支教队
              </p>
            </div>
          </Link>

          {/* 装饰线 + 水彩点 */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="h-px flex-1"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(180,160,130,0.25), transparent)' }} />
            <span className="text-[10px] opacity-30" style={{ color: 'var(--faded)' }}>✦</span>
            <div className="h-px flex-1"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(180,160,130,0.25), transparent)' }} />
          </div>
        </div>

        {/* ── 导航区 ── */}
        <nav className="flex-1 px-2.5 py-1 space-y-5 overflow-y-auto"
          style={{ scrollbarWidth: 'none' }}>
          {NAV_GROUPS.map((group, gi) => (
            <div key={group.label}>
              {/* 分组标签 */}
              <p className="px-3 mb-1.5 text-[9px] font-medium tracking-[0.15em] uppercase"
                style={{
                  color: GROUP_COLORS[gi].dot,
                  fontFamily: 'var(--font-sans)',
                  opacity: 0.7,
                }}>
                {group.label}
              </p>

              {/* 组内项 */}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const active = isActive(item.href, item.exact)
                  const hovering = hoveredItem === item.href

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] font-medium tracking-[0.03em] transition-all duration-200 relative',
                        active
                          ? 'text-white'
                          : 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
                      )}
                      style={{
                        ...(active ? {
                          background: 'linear-gradient(135deg, #9b7a4a, #7a5a3a, #6b4a2a)',
                          boxShadow: '0 2px 8px rgba(80,50,20,0.15), 0 1px 2px rgba(0,0,0,0.08)',
                        } : {
                          background: hovering ? 'rgba(210,195,170,0.15)' : 'transparent',
                        }),
                      }}
                      onMouseEnter={() => setHoveredItem(item.href)}
                      onMouseLeave={() => setHoveredItem(null)}>

                      {/* 左侧指示条 */}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-full transition-all duration-300"
                        style={{
                          height: active ? '60%' : hovering ? '40%' : '0%',
                          background: active
                            ? 'linear-gradient(180deg, #d4a853, #f0c060)'
                            : 'rgba(180,150,120,0.3)',
                          opacity: active || hovering ? 1 : 0,
                        }} />

                      {/* 图标 — hover微弹 */}
                      <span className={cn(
                        'text-sm w-5 text-center flex-shrink-0 transition-transform duration-300',
                        hovering && !active && 'scale-110 -translate-y-0.5'
                      )}>
                        {item.icon}
                      </span>

                      {/* 标签 */}
                      <span className="flex-1 truncate">{item.label}</span>

                      {/* Badge */}
                      {item.badge != null && item.badge > 0 && (
                        <span className="flex-shrink-0 min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-[9px] font-bold"
                          style={{
                            background: active
                              ? 'rgba(255,255,255,0.25)'
                              : 'linear-gradient(135deg, #d4855e, #c07050)',
                            color: active ? '#fff' : '#fff',
                          }}>
                          {item.badge}
                        </span>
                      )}

                      {/* 激活项右侧光点 */}
                      {active && (
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-white/60"
                          style={{ boxShadow: '0 0 4px rgba(255,255,255,0.3)' }} />
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* ── 底部卡片 ── */}
        <div className="px-3 pb-5 pt-2">
          {/* 上方微妙的装饰点 */}
          <div className="flex justify-center gap-1 mb-3">
            {[0,1,2].map(i => (
              <span key={i} className="block rounded-full"
                style={{
                  width: 3 + i, height: 3 + i,
                  background: `rgba(180,150,120,${0.3 - i * 0.08})`,
                }}
              />
            ))}
          </div>

          <div className="p-3.5 rounded-xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, rgba(245,238,225,0.7), rgba(240,230,215,0.5))',
              border: '1px solid rgba(200,180,160,0.2)',
            }}>
            {/* 贴纸角 */}
            <div className="absolute -top-1.5 -right-1.5 w-6 h-3 rounded-[1px]"
              style={{
                background: 'rgba(185,210,190,0.45)',
                transform: 'rotate(12deg)',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
              }} />

            <p className="text-[9px] leading-relaxed tracking-[0.06em] text-center handwriting"
              style={{ color: 'var(--ink-faint)' }}>
              2026 · 筠连<br />
              <span className="text-[12px] font-semibold tracking-[0.04em]"
                style={{ color: 'var(--ink-soft)', fontFamily: 'var(--font-serif)' }}>
                13天夏令营
              </span>
            </p>

            {/* 底部小字 — 像手账里写的 */}
            <p className="text-[8px] text-center mt-1.5 tracking-[0.1em] handwriting"
              style={{ color: 'var(--faded)', opacity: 0.5 }}>
              让记忆不散场
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
