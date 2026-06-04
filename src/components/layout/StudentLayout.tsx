'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import BackToTop from '../ui/BackToTop'
import { Bell, Search, Home, BookOpen, PenLine, MessageCircle, Heart, Camera, ChevronDown } from 'lucide-react'

/* ═══════════════════════════════
   学生端顶部导航
   ═══════════════════════════════ */
const NAV_ITEMS = [
  { href: '/student', label: '首页', icon: '🏠', exact: true },
  { href: '/student/class', label: '今日课堂', icon: '📖' },
  { href: '/student/journal', label: '成长日志', icon: '🌱' },
  { href: '/student/works', label: '我的作品', icon: '🎨' },
  { href: '/student/assignments', label: '作业', icon: '📝' },
  { href: '/student/chat', label: '聊天', icon: '💬', badge: 2 },
  { href: '/student/contact', label: '联系老师', icon: '✉️' },
]

// 模拟当前学生
const CURRENT_STUDENT = { id:'sp1', name:'小宇', avatar:'🌟', grade:'三年级', school:'城南小学' }

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [notificationDismissed, setNotificationDismissed] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* ═══════════════════════════════════════
          🔝 顶部导航栏
          ═══════════════════════════════════════ */}
      <nav className="sticky top-0 z-50 transition-all duration-300" style={{
        background: scrolled
          ? 'linear-gradient(180deg,rgba(254,252,247,0.97),rgba(253,249,242,0.95))'
          : 'linear-gradient(180deg,#fefcf8,#fdf9f3)',
        borderBottom: scrolled
          ? '1.5px solid rgba(200,180,160,0.25)'
          : '1.5px solid rgba(200,180,160,0.15)',
        boxShadow: scrolled ? '0 2px 12px rgba(80,40,20,0.06)' : 'none',
        backdropFilter: 'blur(8px)',
      }}>
        <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center justify-between max-sm:px-3">
          {/* 左侧：Logo + 学生信息 */}
          <div className="flex items-center gap-4">
            <Link href="/student" className="flex items-center gap-2 no-underline">
              <span className="text-2xl">🌱</span>
              <span className="text-[15px] font-bold text-[var(--ink)]" style={{ fontFamily: 'var(--font-serif)' }}>
                蒲公英
              </span>
            </Link>
            {/* 当前学生 */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full max-sm:hidden"
              style={{ background: 'rgba(200,160,120,0.08)', border: '1px solid rgba(200,160,120,0.15)' }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                style={{ background: 'linear-gradient(135deg,#f5e6d0,#e8d4b8)', border: '2px solid #fff' }}>
                {CURRENT_STUDENT.avatar}
              </div>
              <div>
                <p className="text-[11px] font-semibold text-[var(--ink)] leading-tight">{CURRENT_STUDENT.name}</p>
                <p className="text-[8px]" style={{ color: 'var(--faded)' }}>{CURRENT_STUDENT.grade} · {CURRENT_STUDENT.school}</p>
              </div>
            </div>
          </div>

          {/* 中间：导航项 */}
          <div className="flex items-center gap-1 max-md:gap-0.5">
            {NAV_ITEMS.map(item => {
              const active = isActive(item.href, item.exact)
              return (
                <Link key={item.href} href={item.href}
                  className="relative flex flex-col items-center px-3 py-1.5 rounded-xl no-underline transition-all duration-200 hover:-translate-y-0.5 max-sm:px-2"
                  style={{
                    background: active ? 'linear-gradient(135deg,rgba(122,180,90,0.15),rgba(100,160,70,0.08))' : 'transparent',
                    border: active ? '1px solid rgba(122,180,90,0.25)' : '1px solid transparent',
                  }}>
                  <span className="text-xl max-sm:text-lg">{item.icon}</span>
                  <span className="text-[11px] font-semibold max-sm:text-[9px]"
                    style={{ color: active ? '#5a8a3a' : 'var(--ink-soft)', fontFamily: 'var(--font-sans)' }}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 rounded-full flex items-center justify-center text-[8px] font-bold"
                      style={{ background: '#d4855e', color: '#fff', padding: '0 4px' }}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>

          {/* 右侧：通知 + 切换端 */}
          <div className="flex items-center gap-3 max-sm:gap-1">
            {/* 通知铃铛 */}
            <button className="relative w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer bg-transparent hover:bg-[rgba(200,180,160,0.08)] transition-colors">
              <Bell size={17} style={{ color: 'var(--faded)' }} />
              {!notificationDismissed && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full" style={{ background: '#d4855e' }} />
              )}
            </button>
            {/* 切换到教师端 */}
            <Link href="/dashboard"
              className="no-underline text-[10px] px-3 py-1.5 rounded-full transition-all hover:-translate-y-0.5 max-sm:hidden"
              style={{ background: 'rgba(200,160,120,0.08)', color: 'var(--faded)', border: '1px solid rgba(200,160,120,0.15)', fontFamily: 'inherit' }}>
              👨‍🏫 我是老师
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════
          📄 页面内容
          ═══════════════════════════════════════ */}
      <main className="max-w-[1100px] mx-auto px-6 py-6 max-sm:px-3 max-sm:py-4 page-enter">
        {children}
      </main>

      {/* 欢迎提示（仅首次） */}
      {!notificationDismissed && (
        <div className="fixed bottom-6 right-6 z-40 max-w-[280px] p-4 rounded-2xl shadow-lg"
          style={{ background: 'linear-gradient(135deg,#7a9a5a,#5a7a3a)', color: '#fff' }}>
          <div className="flex items-start gap-3">
            <span className="text-2xl">👋</span>
            <div>
              <p className="text-[12px] font-semibold mb-1">欢迎来到蒲公英！</p>
              <p className="text-[10px] leading-relaxed opacity-90">这里是你专属的学习成长空间。看课程、写日志、和好朋友们聊天~</p>
              <button onClick={() => setNotificationDismissed(true)}
                className="mt-2 text-[10px] bg-white/20 border-none rounded-full px-3 py-1 cursor-pointer transition-colors hover:bg-white/30" style={{ fontFamily: 'inherit', color: '#fff' }}>
                知道了
              </button>
            </div>
          </div>
        </div>
      )}

      <BackToTop />
    </div>
  )
}
