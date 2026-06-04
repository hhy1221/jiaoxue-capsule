'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { STUDENT_POSTS } from '@/lib/community-data'
import { JOURNAL_ENTRIES } from '@/lib/journal-data'
import { STUDENT_CONVERSATIONS, MOCK_CURRENT_STUDENT, STUDENT_FRIENDS } from '@/lib/social-data'
import Link from 'next/link'
import { Calendar, BookOpen, MessageCircle, Users, PenLine, Camera, Sparkles, Clock, ChevronRight, Heart, Star, Send, Bell } from 'lucide-react'

export default function StudentDashboard() {
  const myFriends = STUDENT_FRIENDS[MOCK_CURRENT_STUDENT] || []
  const myPosts = STUDENT_POSTS.filter(p => p.id === MOCK_CURRENT_STUDENT)
  const todayEntry = JOURNAL_ENTRIES[JOURNAL_ENTRIES.length - 2] // 倒数第二节课
  const unreadMessages = STUDENT_CONVERSATIONS.filter(c => c.lastMessageAt === '刚刚' || c.lastMessageAt === '10分钟前').length

  return (
    <InnerLayout>
      <style>{`
        @keyframes studentFadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes studentPulse { 0%,100% { box-shadow:0 0 0 0 rgba(122,180,90,0.4); } 50% { box-shadow:0 0 0 8px rgba(122,180,90,0); } }
        .student-card { animation: studentFadeIn 0.45s cubic-bezier(0.22,0.61,0.36,1) both; }
        .pulse-dot { animation: studentPulse 2s infinite; }
      `}</style>

      {/* Welcome Banner */}
      <div className="relative mb-6 rounded-2xl overflow-hidden student-card" style={{ animationDelay: '0.05s', background: 'linear-gradient(135deg,rgba(160,200,140,0.12),rgba(180,210,160,0.08),rgba(200,220,190,0.04))', border: '1.5px solid rgba(140,180,120,0.2)', padding: '22px 28px' }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-3xl">🌟</span>
              <h1 className="text-[22px] font-bold text-[var(--ink)]" style={{ fontFamily: 'var(--font-serif)' }}>
                你好，小宇！
              </h1>
            </div>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--faded)' }}>
              三年级 · 城南小学 · 今天是夏令营 Day {JOURNAL_ENTRIES.length - 1} · 又是元气满满的一天 ☀️
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(122,180,90,0.08)', border: '1px solid rgba(122,180,90,0.18)' }}>
            <span className="w-2 h-2 rounded-full pulse-dot" style={{ background: '#6aaa50' }} />
            <span className="text-[10px] font-medium" style={{ color: '#4a7a3a' }}>在线</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6 max-md:grid-cols-2">
        {[
          { icon: BookOpen, label: '今日课程', value: '2 节', color: '#5a9ac0', bg: 'rgba(90,154,192,0.08)' },
          { icon: MessageCircle, label: '未读消息', value: `${unreadMessages} 条`, color: '#d4855e', bg: 'rgba(212,133,94,0.08)' },
          { icon: Users, label: '好友', value: `${myFriends.length} 人`, color: '#7a9a5a', bg: 'rgba(122,154,90,0.08)' },
          { icon: PenLine, label: '我的作品', value: `${myPosts.length} 件`, color: '#9880c8', bg: 'rgba(152,128,200,0.08)' },
        ].map((s, i) => (
          <div key={s.label} className="picture-book-card p-4 flex items-center gap-3 student-card hover:-translate-y-1 hover:shadow-md transition-all duration-300"
            style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: s.bg, color: s.color }}>
              <s.icon size={18} />
            </div>
            <div>
              <p className="text-[20px] font-bold text-[var(--ink)]" style={{ fontFamily: 'var(--font-serif)' }}>{s.value}</p>
              <p className="text-[10px] tracking-[0.04em]" style={{ color: 'var(--faded)' }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_260px] gap-5 max-lg:grid-cols-1 mb-6">
        {/* Main Column */}
        <div className="space-y-4">
          {/* 今日课程 */}
          <div className="picture-book-card p-5 student-card" style={{ animationDelay: '0.2s', transform: 'rotate(-0.06deg)' }}>
            <h3 className="text-[14px] font-semibold mb-3 text-[var(--ink)] flex items-center gap-1.5" style={{ fontFamily: 'var(--font-serif)' }}>
              <Calendar size={13} style={{ color: '#5a9ac0' }} /> 今日课程
            </h3>
            <div className="p-4 rounded-xl" style={{ background: 'rgba(245,238,220,0.5)', border: '1px solid rgba(200,160,120,0.12)' }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style={{ background: `${todayEntry.courseColor}15`, border: `1.5px solid ${todayEntry.courseColor}30` }}>
                  {todayEntry.courseEmoji}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[var(--ink)]">{todayEntry.courseName}</p>
                  <p className="text-[10px]" style={{ color: 'var(--faded)' }}>{todayEntry.timeSlot} · {todayEntry.teacher} · {todayEntry.location}</p>
                </div>
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: 'var(--ink-soft)' }}>{todayEntry.teachingHighlight}</p>
            </div>
            <div className="flex gap-2 mt-3">
              <Link href="/student/journal" className="picture-book-btn flex items-center gap-1" style={{ fontSize: 10, padding: '4px 12px' }}>
                <BookOpen size={11} /> 全部课程
              </Link>
              <button className="picture-book-btn primary flex items-center gap-1" style={{ fontSize: 10, padding: '4px 12px' }}>
                <PenLine size={11} /> 写感想
              </button>
            </div>
          </div>

          {/* 最近作品 */}
          <div className="picture-book-card p-5 student-card" style={{ animationDelay: '0.28s', transform: 'rotate(0.04deg)' }}>
            <h3 className="text-[14px] font-semibold mb-3 text-[var(--ink)] flex items-center gap-1.5" style={{ fontFamily: 'var(--font-serif)' }}>
              <Camera size={13} style={{ color: '#9880c8' }} /> 我的作品
            </h3>
            {myPosts.length > 0 ? (
              myPosts.map((p, i) => (
                <div key={p.id} className="p-3.5 rounded-xl mb-2" style={{ background: 'rgba(245,240,230,0.3)', border: '1px solid rgba(200,180,160,0.1)' }}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-lg">{p.studentAvatar}</span>
                    <span className="text-[12px] font-semibold text-[var(--ink)]">{p.studentName}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(152,128,200,0.08)', color: '#8068b0' }}>{p.type === 'artwork' ? '🎨 作品' : '📖 故事'}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed mb-1.5" style={{ color: 'var(--ink-soft)' }}>{p.content}</p>
                  <div className="flex items-center gap-3 text-[9px]" style={{ color: 'var(--faded)' }}>
                    <span className="flex items-center gap-1"><Heart size={9} /> {p.likes}</span>
                    <span className="flex items-center gap-1"><MessageCircle size={9} /> 评论</span>
                    <span>{p.createdAt}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[11px] text-center py-4 handwriting" style={{ color: 'var(--faded)' }}>还没有作品，去创作吧 ✨</p>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-3 student-card" style={{ animationDelay: '0.3s' }}>
          {/* 快捷入口 */}
          <div className="picture-book-card p-4" style={{ transform: 'rotate(0.05deg)' }}>
            <h3 className="text-[12px] font-semibold mb-3 text-[var(--ink)] flex items-center gap-1.5" style={{ fontFamily: 'var(--font-serif)' }}>
              <Sparkles size={12} style={{ color: 'var(--primary-skin)' }} /> 快捷入口
            </h3>
            <div className="space-y-1">
              {[
                { e: '📖', l: '课程日志', h: '/student/journal', desc: '查看每节课的记录和感想' },
                { e: '📝', l: '我的作业', h: '/student/assignments', desc: '查看和提交作业' },
                { e: '💬', l: '蒲公英聊天', h: '/community/social', desc: '和好朋友们聊天' },
                { e: '✉️', l: '联系老师', h: '/community/social', desc: '给老师发消息', badge: 1 },
              ].map(item => (
                <Link key={item.l} href={item.h} className="flex items-center gap-2.5 p-2.5 rounded-lg no-underline transition-all hover:bg-[rgba(200,160,120,0.06)] group">
                  <span className="text-lg">{item.e}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-[var(--ink)]">{item.l}</p>
                    <p className="text-[9px] truncate" style={{ color: 'var(--faded)' }}>{item.desc}</p>
                  </div>
                  {item.badge && (
                    <span className="min-w-[16px] h-4 rounded-full flex items-center justify-center text-[8px] font-bold" style={{ background: '#d4855e', color: '#fff' }}>{item.badge}</span>
                  )}
                  <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" style={{ color: 'var(--faded)' }} />
                </Link>
              ))}
            </div>
          </div>

          {/* 好友在线 */}
          <div className="picture-book-card p-4" style={{ transform: 'rotate(-0.04deg)' }}>
            <h3 className="text-[12px] font-semibold mb-3 text-[var(--ink)] flex items-center gap-1.5" style={{ fontFamily: 'var(--font-serif)' }}>
              <Users size={12} style={{ color: '#7a9a5a' }} /> 好友动态
            </h3>
            <div className="space-y-2">
              {myFriends.slice(0, 4).map(f => (
                <div key={f.studentId} className="flex items-center gap-2">
                  <span className="text-lg">{f.studentAvatar}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-semibold text-[var(--ink)]">{f.studentName}</p>
                    <p className="text-[8px] truncate" style={{ color: 'var(--faded)' }}>{f.interestGroup}</p>
                  </div>
                  <span className="flex items-center gap-1 text-[8px]" style={{ color: 'var(--faded)' }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#6aaa50' }} />
                    {f.lastActive}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </InnerLayout>
  )
}
