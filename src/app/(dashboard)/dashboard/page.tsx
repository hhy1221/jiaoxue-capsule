'use client'
import { MOCK_DASHBOARD, MOCK_NOTIFICATIONS } from '@/lib/mock-data'
import Link from 'next/link'
import { TrendingUp, Bell, Calendar, Users, BookOpen, Camera, PenLine, Sparkles } from 'lucide-react'

const QUICK_ACTIONS=[
  {e:'👧',l:'新建学生',h:'/students'},{e:'📝',l:'写评语',h:'/students'},
  {e:'📅',l:'课表',h:'/schedule'},{e:'✨',l:'AI工坊',h:'/ai-workshop'},
  {e:'💌',l:'笔友',h:'/penpal-square'},{e:'🌳',l:'树洞',h:'/ai-workshop/treehole'},
]

const STATS=[{icon:Users,label:'学生',value:0,color:'#c8862e',bg:'rgba(200,134,46,0.08)'},{icon:PenLine,label:'评语',value:0,color:'#7a9a5a',bg:'rgba(122,154,90,0.08)'},{icon:Camera,label:'照片',value:0,color:'#6baed6',bg:'rgba(107,174,214,0.08)'},{icon:BookOpen,label:'课程',value:0,color:'#d4855e',bg:'rgba(212,133,94,0.08)'}]

export default function DashboardPage() {
  const d=MOCK_DASHBOARD
  STATS[0].value=d.studentCount;STATS[1].value=d.diaryCount;STATS[2].value=d.photoCount;STATS[3].value=d.classCount
  const maxTag=Math.max(...d.tagDistribution.map(t=>t.count))
  return (<>
    <header className="flex items-center justify-between pb-[22px] mb-5 flex-wrap gap-3 relative" style={{borderBottom:'1.5px solid rgba(180,160,130,0.25)'}}>
      <div>
        <h1 className="text-[19px] font-semibold tracking-[0.03em] text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>📊 仪表盘</h1>
        <p className="text-[11px] mt-0.5 tracking-[0.06em]" style={{color:'var(--faded)'}}>2026筠连夏令营 · 凡星支教队 · 13天进行中</p>
      </div>
      <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 text-[7px] tracking-[7px] whitespace-nowrap" style={{color:'rgba(180,160,130,0.5)'}}>· · · · · · · · · · · ·</div>
    </header>

    {/* Stats row */}
    <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4 mb-6">
      {STATS.map((s,i)=>(<div key={s.label} className="picture-book-card p-4 flex items-center gap-4 cursor-default hover:-translate-y-1 hover:shadow-md transition-all duration-300" style={{transform:`rotate(${i%2===0?'-0.2deg':'0.15deg'})`}}>
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:s.bg,color:s.color}}><s.icon size={20}/></div>
        <div><p className="text-[24px] font-bold text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>{s.value}</p><p className="text-[10px] tracking-[0.08em]" style={{color:'var(--faded)'}}>{s.label}</p></div>
      </div>))}
      <div className="picture-book-card p-4 flex items-center gap-4 cursor-default hover:-translate-y-1 hover:shadow-md transition-all duration-300" style={{transform:'rotate(-0.15deg)',borderColor:'rgba(122,180,90,0.25)'}}>
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:'rgba(122,180,90,0.08)',color:'#6aaa50'}}><TrendingUp size={20}/></div>
        <div><p className="text-[24px] font-bold text-green-600" style={{fontFamily:'var(--font-serif)'}}>↑{d.activeTrend}%</p><p className="text-[10px] tracking-[0.08em]" style={{color:'var(--faded)'}}>活跃度</p></div>
      </div>
    </div>

    {/* Main grid */}
    <div className="grid grid-cols-[1.5fr_1fr] gap-5 max-lg:grid-cols-1 mb-6">
      {/* Tag distribution */}
      <div className="picture-book-card p-6" style={{transform:'rotate(-0.12deg)'}}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[14px] font-semibold tracking-[0.04em] text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>🏷 标签分布</h3>
          <span className="text-[9px] tracking-[0.08em]" style={{color:'var(--faded)'}}>{d.tagDistribution.length}种标签</span>
        </div>
        <div className="space-y-3">
          {d.tagDistribution.map((t,i)=>(<div key={t.name} className="flex items-center gap-3 group cursor-default">
            <span className="text-[11px] w-16 flex-shrink-0 text-right font-medium text-[var(--ink-soft)]">{t.name}</span>
            <div className="flex-1 h-6 rounded-full overflow-hidden relative" style={{background:'rgba(210,195,170,0.12)'}}>
              <div className="h-full rounded-full transition-all duration-700 ease-out group-hover:brightness-110" style={{width:`${(t.count/maxTag)*100}%`,background:`linear-gradient(90deg,rgba(200,140,80,${0.25+i*0.06}),rgba(200,140,80,${0.5+i*0.08}))`}}/>
              {/* Label on bar */}
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[9px] font-semibold text-[var(--ink)] whitespace-nowrap">{t.count}人</span>
            </div>
          </div>))}
        </div>
      </div>

      {/* Right column: upcoming + quick actions */}
      <div className="space-y-4">
        <div className="picture-book-card p-5" style={{transform:'rotate(0.1deg)'}}>
          <h3 className="text-[14px] font-semibold tracking-[0.04em] mb-3 text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>⏰ 待上课提醒</h3>
          {d.upcomingClasses.map((c,i)=>(<div key={i} className="flex items-center gap-3 py-2.5 last:border-0" style={{borderBottom:i<d.upcomingClasses.length-1?'1px solid rgba(200,180,160,0.1)':'none'}}>
            <Calendar size={14} style={{color:'var(--faded)'}}/>
            <div><p className="text-[12px] font-medium text-[var(--ink)]">{c.title}</p><p className="text-[10px]" style={{color:'var(--faded)'}}>{c.time}</p></div>
          </div>))}
          <Link href="/schedule" className="text-[11px] mt-2 inline-block no-underline hover:underline handwriting" style={{color:'var(--primary-skin)'}}>查看全部课表 →</Link>
        </div>

        <div className="picture-book-card p-5" style={{transform:'rotate(-0.08deg)'}}>
          <h3 className="text-[14px] font-semibold tracking-[0.04em] mb-3 text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>🚀 快捷操作</h3>
          <div className="grid grid-cols-2 gap-2">
            {QUICK_ACTIONS.map(a=>(<Link key={a.l} href={a.h} className="flex items-center gap-2.5 p-2.5 rounded-md text-[11px] no-underline transition-all hover:-translate-y-0.5 hover:shadow-sm" style={{color:'var(--ink-soft)',border:'1px solid rgba(200,180,160,0.12)',background:'rgba(245,240,230,0.25)'}}>
              <span className="text-base w-5 text-center">{a.e}</span>{a.l}
            </Link>))}
          </div>
        </div>
      </div>
    </div>

    {/* Recent diaries */}
    <div className="picture-book-card p-6 mb-6" style={{transform:'rotate(0.08deg)'}}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[14px] font-semibold tracking-[0.04em] text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>📝 最近评语</h3>
        <Link href="/students" className="text-[11px] no-underline hover:underline handwriting" style={{color:'var(--primary-skin)'}}>查看全部 →</Link>
      </div>
      <div className="space-y-3">
        {d.recentDiaries.map((rd,i)=>(<div key={i} className="flex items-start gap-3 p-3.5 rounded-md transition-colors hover:shadow-sm cursor-default" style={{background:'rgba(245,240,230,0.3)',border:'1px solid rgba(200,180,160,0.08)'}}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5" style={{background:'rgba(200,160,120,0.1)',color:'var(--ink-soft)',border:'1.5px solid rgba(200,160,120,0.12)'}}>{rd.studentName[0]}</div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-0.5"><span className="text-[12px] font-semibold text-[var(--ink)]">{rd.studentName}</span><span className="text-[10px]" style={{color:'var(--faded)'}}>{rd.timeAgo}</span></div>
            <p className="text-[12px] leading-relaxed line-clamp-2" style={{color:'var(--ink-soft)'}}>{rd.content}</p>
          </div>
          <span className="text-[9px] px-2 py-0.5 rounded-full flex-shrink-0 mt-1" style={{background:'rgba(122,154,90,0.08)',color:'#6a8a4a',border:'1px solid rgba(122,154,90,0.12)'}}>查看</span>
        </div>))}
      </div>
    </div>

    {/* Notifications */}
    <div className="picture-book-card p-6" style={{transform:'rotate(-0.06deg)'}}>
      <h3 className="text-[14px] font-semibold tracking-[0.04em] mb-4 text-[var(--ink)] flex items-center gap-2" style={{fontFamily:'var(--font-serif)'}}><Bell size={16} style={{color:'var(--faded)'}}/>通知</h3>
      <div className="space-y-2">
        {MOCK_NOTIFICATIONS.map(n=>(<div key={n.id} className="flex items-start gap-3 p-3 rounded-md transition-colors" style={{background:n.read?'rgba(245,240,230,0.15)':'rgba(240,225,190,0.25)',border:`1px solid ${n.read?'rgba(200,180,160,0.08)':'rgba(200,160,100,0.15)'}`,opacity:n.read?0.55:1}}>
          <span className="picture-book-tag mt-0.5 text-[8px] px-1.5 py-0.5 flex-shrink-0" style={{background:n.type==='success'?'rgba(180,210,160,0.12)':n.type==='warning'?'rgba(240,210,140,0.12)':'rgba(200,190,180,0.12)',border:`1px solid ${n.type==='success'?'rgba(140,180,120,0.25)':n.type==='warning'?'rgba(200,170,100,0.25)':'rgba(180,160,140,0.25)'}`}}>{n.type==='success'?'✓':n.type==='warning'?'⚠':'ℹ'}</span>
          <div className="flex-1"><p className="text-[12px] font-medium text-[var(--ink)]">{n.title}</p><p className="text-[11px] mt-0.5" style={{color:'var(--ink-faint)'}}>{n.content} · {n.createdAt}</p></div>
          {!n.read&&<span className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{background:'var(--primary-skin)'}}/>}
        </div>))}
      </div>
    </div>
  </>)
}
