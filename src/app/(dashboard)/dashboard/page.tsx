'use client'
import { MOCK_STUDENTS } from '@/lib/mock-data'
import { JOURNAL_ENTRIES } from '@/lib/journal-data'
import Link from 'next/link'
import { useState, useMemo, useEffect, useRef } from 'react'
import { Calendar, Clock, Users, BookOpen, PenLine, Camera, MessageCircle, MapPin, ChevronRight, Plus, Bell, Sparkles, ArrowRight, TrendingUp, Zap } from 'lucide-react'

const TODAY_DAY = 5 // 模拟今天是 Day 5

// 模拟今日课表 — 来自 schedule 数据
const TODAY_CLASSES = [
  { time:'7:00–8:00',name:'起床+早餐',emoji:'🌅',type:'生活'},
  { time:'8:00–9:00',name:'碳足迹侦探营（上）',emoji:'🌍',teacher:'周老师',location:'教室B',type:'智育'},
  { time:'9:15–10:15',name:'数学游戏——数字接龙',emoji:'🧮',teacher:'黄老师',location:'教室A',type:'智育'},
  { time:'10:30–11:30',name:'家乡的叶子——茶叶与茶文化',emoji:'🍵',teacher:'周老师',location:'多功能厅',type:'劳育'},
  { time:'11:30–13:30',name:'午休',emoji:'🍱',type:'生活'},
  { time:'14:30–15:30',name:'创意手工——纸箱恐龙制作',emoji:'🦕',teacher:'黄老师',location:'教室A',type:'美育'},
  { time:'15:45–16:45',name:'体育课',emoji:'⚽',teacher:'体育老师',location:'操场',type:'体育'},
  { time:'17:00–18:00',name:'自习/作业辅导',emoji:'📝',teacher:'黄老师',location:'教室A',type:'智育'},
]

// 模拟最近的队伍动态
const RECENT_ACTIVITIES = [
  { student:'刘小宇',avatar:'🌟',action:'提交了纸箱恐龙作品',time:'30分钟前',type:'作品'},
  { student:'浩然',avatar:'🚀',action:'在课堂上主动担任小组长',time:'1小时前',type:'课堂'},
  { student:'小雨',avatar:'🌻',action:'画了一幅向日葵并贴在了走廊画廊',time:'2小时前',type:'作品'},
  { student:'大勇',avatar:'🦁',action:'修好了教室里的风扇',time:'3小时前',type:'其他'},
  { student:'黄老师',avatar:'👨',action:'写下了今天碳足迹课的反思',time:'4小时前',type:'日志'},
]

// 待办提醒
const REMINDERS = [
  { text:'为小宇写评语（上次是3天前）',urgent:true },
  { text:'准备明天赵一曼红色文化课的课件',urgent:false },
  { text:'给欣怡的家长发学习反馈',urgent:false },
  { text:'更新浩然的成长档案——他最近进步很大',urgent:true },
]

export default function DashboardPage() {
  const [reminders, setReminders] = useState(REMINDERS)
  const doneReminder = (i:number) => setReminders(p=>p.filter((_,idx)=>idx!==i))

  // CountUP refs
  const statRefs = useRef<(HTMLDivElement|null)[]>([])
  const [visible, setVisible] = useState(false)
  useEffect(()=>{setVisible(true)},[])

  const stats = [
    { icon:Users,label:'本队学生',value:MOCK_STUDENTS.length,color:'#c8862e',bg:'rgba(200,134,46,0.08)' },
    { icon:BookOpen,label:'今日课程',value:'8节',color:'#5a9ac0',bg:'rgba(90,154,192,0.08)' },
    { icon:PenLine,label:'成长日志',value:JOURNAL_ENTRIES.length+'篇',color:'#7a9a5a',bg:'rgba(122,154,90,0.08)' },
    { icon:Camera,label:'课堂照片',value:'342',color:'#6baed6',bg:'rgba(107,174,214,0.08)' },
  ]

  const now = new Date()
  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()

  return (
    <>
      <style>{`
        @keyframes dashFadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulseDot { 0%,100%{box-shadow:0 0 0 0 rgba(200,134,46,0.4)} 50%{box-shadow:0 0 0 8px rgba(200,134,46,0)} }
        .dash-card { animation:dashFadeUp 0.45s cubic-bezier(0.22,0.61,0.36,1) both; }
        .live-dot { animation:pulseDot 2s infinite; }
      `}</style>

      {/* Header */}
      <header className="flex items-center justify-between pb-[22px] mb-5 flex-wrap gap-3 relative" style={{borderBottom:'1.5px solid rgba(180,160,130,0.25)'}}>
        <div>
          <h1 className="text-[22px] font-semibold tracking-[0.03em] text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>📊 仪表盘</h1>
          <p className="text-[12px] mt-0.5 tracking-[0.04em]" style={{color:'var(--faded)'}}>
            凡星支教队 · 夏令营 Day {TODAY_DAY} · {['日','一','二','三','四','五','六'][new Date().getDay()]}曜日
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{background:'rgba(200,160,120,0.08)',border:'1px solid rgba(200,160,120,0.15)'}}>
            <span className="w-2 h-2 rounded-full live-dot" style={{background:'var(--primary-skin)'}}/>
            <span className="text-[11px] font-medium" style={{color:'var(--primary-skin)'}}>工作中</span>
          </div>
        </div>
        <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 text-[7px] tracking-[7px] whitespace-nowrap" style={{color:'rgba(180,160,130,0.5)'}}>· · · · · · · · · · · ·</div>
      </header>

      <div className="grid grid-cols-[1fr_300px] gap-5 max-lg:grid-cols-1 mb-6">
        {/* ═══ 左列 ═══ */}
        <div className="space-y-4">
          {/* ═══ 今日课表 — 核心模块 ═══ */}
          <div className="picture-book-card p-0 overflow-hidden dash-card" style={{animationDelay:'0.05s',transform:'rotate(-0.06deg)'}}>
            <div className="flex items-center justify-between p-4" style={{borderBottom:'1px solid rgba(200,180,160,0.12)'}}>
              <h3 className="text-[15px] font-semibold text-[var(--ink)] flex items-center gap-2" style={{fontFamily:'var(--font-serif)'}}>
                <Calendar size={15} style={{color:'#c8862e'}}/> 今日课表
              </h3>
              <Link href="/schedule" className="text-[10px] no-underline flex items-center gap-0.5" style={{color:'var(--faded)'}}>
                完整课表 <ChevronRight size={10}/>
              </Link>
            </div>
            <div className="p-3 space-y-0.5">
              {TODAY_CLASSES.map((c,i)=>{
                const timeParts = c.time.split('–')
                const startHour = parseInt(timeParts[0].split(':')[0])
                const isCurrent = startHour === currentHour // 简化的"当前课程"判断
                const isPast = startHour < currentHour
                const isLife = c.type === '生活'
                return (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg transition-colors"
                    style={{
                      background:isCurrent?'rgba(200,160,110,0.12)':isLife?'rgba(245,240,230,0.25)':'transparent',
                      opacity:isPast&&!isCurrent?0.5:1,
                    }}>
                    <span className="text-base w-7 text-center">{c.emoji}</span>
                    <span className="w-[100px] text-[10px] font-medium flex-shrink-0" style={{color:isCurrent?'var(--primary-skin)':'var(--faded)'}}>
                      {c.time}
                      {isCurrent && <span className="ml-1 w-1.5 h-1.5 rounded-full inline-block" style={{background:'var(--primary-skin)'}}/>}
                    </span>
                    <span className="text-[11px] font-medium text-[var(--ink-soft)] flex-1">{c.name}</span>
                    {c.teacher && <span className="text-[9px] flex-shrink-0" style={{color:'var(--faded)'}}>{c.teacher}</span>}
                    {c.type !== '生活' && (
                      <span className="text-[8px] px-1.5 py-0.5 rounded-full flex-shrink-0" style={{background:'rgba(200,160,120,0.06)',color:'var(--faded)'}}>{c.type}</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* ═══ 统计卡片行 ═══ */}
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            {stats.map((s,i)=>(
              <div key={s.label} ref={el=>{statRefs.current[i]=el}}
                className="picture-book-card p-4 flex items-center gap-3 dash-card hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                style={{animationDelay:`${0.15+i*0.08}s`,transform:`rotate(${i%2===0?'-0.2deg':'0.15deg'})`}}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{background:s.bg,color:s.color}}>
                  <s.icon size={18}/>
                </div>
                <div>
                  <p className="text-[20px] font-bold text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>{s.value}</p>
                  <p className="text-[10px] tracking-[0.04em]" style={{color:'var(--faded)'}}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ 右列 ═══ */}
        <div className="space-y-4">
          {/* ── 待办提醒 ── */}
          <div className="picture-book-card p-4 dash-card" style={{animationDelay:'0.2s',transform:'rotate(0.06deg)',borderLeft:'4px solid #d4855e'}}>
            <h3 className="text-[13px] font-semibold mb-3 text-[var(--ink)] flex items-center gap-1.5" style={{fontFamily:'var(--font-serif)'}}>
              <Bell size={12} style={{color:'#d4855e'}}/> 待办提醒
            </h3>
            <div className="space-y-1.5">
              {reminders.length === 0 ? (
                <p className="text-[10px] text-center py-3 handwriting" style={{color:'var(--faded)'}}>全部完成，太棒了！🎉</p>
              ) : (
                reminders.map((r,i)=>(
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-[rgba(200,160,120,0.05)] transition-colors"
                    onClick={()=>doneReminder(i)}>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[8px]"
                      style={{background:r.urgent?'rgba(212,133,94,0.12)':'rgba(200,180,160,0.08)',color:r.urgent?'#d4855e':'var(--faded)',border:`1px solid ${r.urgent?'rgba(212,133,94,0.25)':'rgba(200,180,160,0.15)'}`}}>
                      {r.urgent?'!':'·'}
                    </div>
                    <span className="text-[10px] flex-1 line-clamp-1" style={{color:'var(--ink-soft)',textDecoration:'none'}}>{r.text}</span>
                    <span className="text-[8px] flex-shrink-0" style={{color:'var(--faded)'}}>点击完成</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ── 快捷操作 ── */}
          <div className="picture-book-card p-4 dash-card" style={{animationDelay:'0.25s',transform:'rotate(-0.05deg)'}}>
            <h3 className="text-[13px] font-semibold mb-3 text-[var(--ink)] flex items-center gap-1.5" style={{fontFamily:'var(--font-serif)'}}>
              <Zap size={12} style={{color:'var(--primary-skin)'}}/> 快捷操作
            </h3>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                {e:'👧',l:'新建学生档案',h:'/students'},
                {e:'✏️',l:'写课堂评语',h:'/students'},
                {e:'📖',l:'记录成长日志',h:'/journal'},
                {e:'📅',l:'查看完整课表',h:'/schedule'},
                {e:'✨',l:'AI 工坊',h:'/ai-workshop'},
                {e:'💌',l:'写临别信',h:'/letters'},
              ].map(a=>(
                <Link key={a.l} href={a.h} className="flex items-center gap-2 p-2 rounded-md no-underline transition-all hover:-translate-y-0.5 hover:shadow-sm text-[10px]"
                  style={{color:'var(--ink-soft)',border:'1px solid rgba(200,180,160,0.12)',background:'rgba(245,240,230,0.25)'}}>
                  <span className="text-sm">{a.e}</span>{a.l}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ 最近动态 ═══ */}
      <div className="picture-book-card p-5 dash-card" style={{animationDelay:'0.3s',transform:'rotate(0.04deg)'}}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-semibold text-[var(--ink)] flex items-center gap-2" style={{fontFamily:'var(--font-serif)'}}>
            <TrendingUp size={14} style={{color:'#7a9a5a'}}/> 最近动态
          </h3>
          <Link href="/journal" className="text-[10px] no-underline flex items-center gap-0.5" style={{color:'var(--faded)'}}>
            查看全部 <ChevronRight size={10}/>
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto" style={{scrollbarWidth:'thin'}}>
          {RECENT_ACTIVITIES.map((a,i)=>(
            <div key={i} className="flex-shrink-0 p-3.5 rounded-xl min-w-[200px]"
              style={{background:'rgba(245,240,230,0.3)',border:'1px solid rgba(200,180,160,0.1)'}}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                  style={{background:'linear-gradient(135deg,rgba(200,160,120,0.12),rgba(180,140,100,0.06))',border:'1.5px solid rgba(200,160,120,0.15)'}}>
                  {a.avatar}
                </div>
                <span className="text-[11px] font-semibold text-[var(--ink)]">{a.student}</span>
              </div>
              <p className="text-[10px] leading-relaxed mb-1.5" style={{color:'var(--ink-soft)'}}>{a.action}</p>
              <div className="flex items-center justify-between text-[8px]" style={{color:'var(--faded)'}}>
                <span>{a.time}</span>
                <span className="px-1.5 py-0.5 rounded-full" style={{background:'rgba(200,180,160,0.06)'}}>{a.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
