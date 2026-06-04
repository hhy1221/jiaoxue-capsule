'use client'
import StudentLayout from '@/components/layout/StudentLayout'
import { JOURNAL_ENTRIES } from '@/lib/journal-data'
import { STUDENT_CONVERSATIONS, MOCK_CURRENT_STUDENT, STUDENT_FRIENDS } from '@/lib/social-data'
import { STUDENT_POSTS } from '@/lib/community-data'
import Link from 'next/link'
import { Calendar, BookOpen, MessageCircle, Users, PenLine, Camera, Sparkles, Clock, ChevronRight, Heart, Star, Send, Bell, Zap, Sun } from 'lucide-react'

const TODAY_DAY = 5
const myFriends = STUDENT_FRIENDS[MOCK_CURRENT_STUDENT] || []
const myPosts = STUDENT_POSTS.filter(p => p.id === MOCK_CURRENT_STUDENT)
const todayEntry = JOURNAL_ENTRIES.find(e => e.dayNum === TODAY_DAY) || JOURNAL_ENTRIES[4]
const unreadMsg = STUDENT_CONVERSATIONS.filter(c => c.lastMessageAt === '刚刚' || c.lastMessageAt === '10分钟前').length

// 今日课表（模拟）
const TODAY_SCHEDULE = [
  { time:'8:00–9:00',name:'碳足迹侦探营',emoji:'🌍',teacher:'周老师',room:'教室B' },
  { time:'9:15–10:15',name:'数学游戏——数字接龙',emoji:'🧮',teacher:'黄老师',room:'教室A' },
  { time:'10:30–11:30',name:'家乡的叶子——茶文化',emoji:'🍵',teacher:'周老师',room:'多功能厅' },
  { time:'14:30–15:30',name:'创意手工——纸箱恐龙',emoji:'🦕',teacher:'黄老师',room:'教室A' },
  { time:'15:45–16:45',name:'体育课',emoji:'⚽',teacher:'体育老师',room:'操场' },
]

export default function StudentHome() {
  return (
    <StudentLayout>
      <style>{`
        @keyframes kidFadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes kidPop { 0%{opacity:0;transform:scale(0.9)} 60%{transform:scale(1.04)} 100%{opacity:1;transform:scale(1)} }
        @keyframes sunPulse { 0%,100%{box-shadow:0 0 0 0 rgba(240,192,96,0.4)} 50%{box-shadow:0 0 0 10px rgba(240,192,96,0)} }
        .kid-card { animation:kidFadeUp 0.5s cubic-bezier(0.22,0.61,0.36,1) both; }
        .kid-pop { animation:kidPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
        .sun-glow { animation:sunPulse 3s infinite; }
      `}</style>

      {/* ═══ 欢迎横幅 ═══ */}
      <div className="relative mb-6 rounded-3xl overflow-hidden kid-card" style={{ animationDelay:'0.05s' }}>
        <div style={{ background:'linear-gradient(135deg,#6aaa50 0%,#8cc860 40%,#a0d870 100%)', padding:'28px 32px', color:'#fff' }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl sun-glow"
                  style={{ background:'rgba(255,255,255,0.2)', backdropFilter:'blur(4px)' }}>
                  <Sun size={30} style={{ color:'#fff' }} />
                </div>
                <div>
                  <h1 className="text-[26px] font-bold" style={{ fontFamily:'var(--font-serif)', textShadow:'0 1px 3px rgba(0,0,0,0.1)' }}>
                    早上好，小宇！☀️
                  </h1>
                  <p className="text-[14px] text-white/80 mt-0.5">夏令营 Day {TODAY_DAY} · 又是元气满满的一天！</p>
                </div>
              </div>
            </div>
            <div className="text-right max-sm:hidden">
              <div className="text-[40px] font-bold" style={{ fontFamily:'var(--font-serif)' }}>{TODAY_SCHEDULE.length}</div>
              <div className="text-[13px] text-white/70">节课今天</div>
            </div>
          </div>
        </div>
        {/* 下边区 */}
        <div style={{ background:'rgba(255,255,255,0.95)', padding:'16px 32px', borderTop:'1px solid rgba(0,0,0,0.04)' }}>
          <div className="flex items-center gap-2 text-[13px] max-sm:text-[11px]">
            <span style={{ color:'var(--faded)' }}>📣</span>
            <span style={{ color:'var(--ink-soft)' }}>今天的创意手工课要做纸箱恐龙，记得带一个废纸箱来哦～</span>
            <span className="text-[10px] ml-auto flex-shrink-0" style={{ color:'var(--faded)' }}>黄老师 · 早上 7:30</span>
          </div>
        </div>
      </div>

      {/* ═══ 四宫格快捷入口 ═══ */}
      <div className="grid grid-cols-4 gap-3 mb-6 max-md:grid-cols-2">
        {[
          { e:'📖',l:'今日课堂',desc:'查看今天的5节课',h:'/student/class',color:'#5a9ac0',bg:'rgba(90,154,192,0.08)' },
          { e:'🌱',l:'成长日志',desc:'回顾每节课的收获',h:'/student/journal',color:'#7a9a5a',bg:'rgba(122,154,90,0.08)' },
          { e:'💬',l:'聊天',desc:unreadMsg+'条新消息',h:'/student/chat',color:'#d4855e',bg:'rgba(212,133,94,0.08)',badge:unreadMsg },
          { e:'✉️',l:'联系老师',desc:'有问题随时问',h:'/student/contact',color:'#9880c8',bg:'rgba(152,128,200,0.08)' },
        ].map((s,i)=>(
          <Link key={s.l} href={s.h} className="kid-pop picture-book-card p-5 no-underline hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
            style={{ animationDelay:`${0.1+i*0.08}s` }}>
            <div className="text-3xl mb-3">{s.e}</div>
            <h3 className="text-[16px] font-bold text-[var(--ink)] mb-1" style={{ fontFamily:'var(--font-serif)' }}>{s.l}</h3>
            <p className="text-[12px]" style={{ color:'var(--faded)' }}>{s.desc}</p>
            {s.badge && s.badge > 0 && (
              <span className="absolute top-3 right-3 min-w-[22px] h-[22px] rounded-full flex items-center justify-center text-[10px] font-bold"
                style={{ background:'#d4855e',color:'#fff' }}>{s.badge}</span>
            )}
          </Link>
        ))}
      </div>

      {/* ═══ 今日课表预览 + 好友在线 ═══ */}
      <div className="grid grid-cols-[1fr_300px] gap-5 max-lg:grid-cols-1 mb-6">
        {/* 今日课表 */}
        <div className="picture-book-card p-5 kid-card" style={{ animationDelay:'0.25s' }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[17px] font-bold text-[var(--ink)] flex items-center gap-2" style={{ fontFamily:'var(--font-serif)' }}>
              <Calendar size={16} style={{ color:'#5a9ac0' }}/> 今日课表
            </h3>
            <Link href="/student/class" className="text-[12px] no-underline flex items-center gap-1" style={{ color:'var(--faded)' }}>
              详细 <ChevronRight size={12}/>
            </Link>
          </div>
          <div className="space-y-1">
            {TODAY_SCHEDULE.map((c,i)=>{
              const nowHour = new Date().getHours()
              const startH = parseInt(c.time.split(':')[0])
              const isCurrent = startH === nowHour || (startH <= nowHour && nowHour < startH+1)
              return (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl transition-colors"
                  style={{
                    background:isCurrent?'rgba(200,160,110,0.15)':'rgba(245,240,230,0.3)',
                    border:isCurrent?'1.5px solid rgba(200,160,110,0.3)':'1px solid transparent',
                  }}>
                  <span className="text-2xl w-9 text-center">{c.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-[var(--ink)]">{c.name}</p>
                    <p className="text-[10px]" style={{ color:'var(--faded)' }}>{c.teacher} · {c.room}</p>
                  </div>
                  <span className="text-[11px] font-medium flex-shrink-0" style={{ color:isCurrent?'var(--primary-skin)':'var(--faded)' }}>
                    {c.time}
                    {isCurrent && <span className="ml-1.5 w-2 h-2 rounded-full inline-block sun-glow" style={{ background:'var(--primary-skin)' }}/>}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* 好友在线 + 我的作品 */}
        <div className="space-y-3 kid-card" style={{ animationDelay:'0.3s' }}>
          {/* 好友 */}
          <div className="picture-book-card p-4" style={{ transform:'rotate(0.04deg)' }}>
            <h3 className="text-[14px] font-bold mb-3 text-[var(--ink)] flex items-center gap-2" style={{ fontFamily:'var(--font-serif)' }}>
              <Users size={13} style={{ color:'#7a9a5a' }}/> 好友在线
            </h3>
            <div className="space-y-2">
              {myFriends.slice(0,4).map(f=>(
                <div key={f.studentId} className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
                    style={{ background:'linear-gradient(135deg,rgba(200,160,120,0.08),rgba(180,140,100,0.04))',border:'2px solid #fff' }}>
                    {f.studentAvatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-[var(--ink)]">{f.studentName}</p>
                    <p className="text-[9px] truncate" style={{ color:'var(--faded)' }}>{f.interestGroup}</p>
                  </div>
                  <span className="flex items-center gap-1 text-[9px]" style={{ color:'var(--faded)' }}>
                    <span className="w-2 h-2 rounded-full" style={{ background:'#6aaa50' }}/>在线
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 最近作品 */}
          {myPosts.length > 0 && (
            <div className="picture-book-card p-4" style={{ transform:'rotate(-0.03deg)' }}>
              <h3 className="text-[14px] font-bold mb-3 text-[var(--ink)] flex items-center gap-2" style={{ fontFamily:'var(--font-serif)' }}>
                <Camera size={13} style={{ color:'#9880c8' }}/> 我的作品
              </h3>
              {myPosts.slice(0,2).map(p=>(
                <div key={p.id} className="flex items-start gap-2 mb-2">
                  {p.image.startsWith('/') ? (
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0" style={{ border:'1.5px solid rgba(200,180,160,0.15)' }}>
                      <img src={p.image} alt="" className="w-full h-full object-cover" loading="lazy"/>
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                      style={{ background:'rgba(200,160,120,0.06)',border:'1.5px solid rgba(200,180,160,0.15)' }}>{p.image}</div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] leading-relaxed line-clamp-2" style={{ color:'var(--ink-soft)' }}>{p.content}</p>
                    <div className="flex items-center gap-2 text-[9px] mt-0.5" style={{ color:'var(--faded)' }}>
                      <span className="flex items-center gap-0.5"><Heart size={8}/>{p.likes}</span>
                      <span>{p.createdAt}</span>
                    </div>
                  </div>
                </div>
              ))}
              <Link href="/student/works" className="text-[10px] no-underline flex items-center gap-0.5 mt-2" style={{ color:'var(--faded)' }}>
                查看全部 <ChevronRight size={10}/>
              </Link>
            </div>
          )}
        </div>
      </div>
    </StudentLayout>
  )
}
