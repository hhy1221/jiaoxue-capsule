'use client'
import { MOCK_DASHBOARD, MOCK_NOTIFICATIONS, MOCK_STUDENTS } from '@/lib/mock-data'
import Link from 'next/link'
import { TrendingUp, Bell, Calendar, Users, BookOpen, Camera, PenLine, Sparkles } from 'lucide-react'
import CountUp from '@/components/animations/CountUp'
import { useEffect, useRef, useMemo } from 'react'

const QUICK_ACTIONS=[
  {e:'👧',l:'新建学生',h:'/students'},{e:'📝',l:'写评语',h:'/students'},
  {e:'📅',l:'课表',h:'/schedule'},{e:'✨',l:'AI工坊',h:'/ai-workshop'},
  {e:'💌',l:'笔友',h:'/penpal-square'},{e:'🌳',l:'树洞',h:'/ai-workshop/treehole'},
]

export default function DashboardPage() {
  const d = MOCK_DASHBOARD
  const stats = useMemo(() => [
    { icon: Users, label: '学生', value: d.studentCount, color: '#c8862e', bg: 'rgba(200,134,46,0.08)' },
    { icon: PenLine, label: '评语', value: d.diaryCount, color: '#7a9a5a', bg: 'rgba(122,154,90,0.08)' },
    { icon: Camera, label: '照片', value: d.photoCount, color: '#6baed6', bg: 'rgba(107,174,214,0.08)' },
    { icon: BookOpen, label: '课程', value: d.classCount, color: '#d4855e', bg: 'rgba(212,133,94,0.08)' },
  ], [d.studentCount, d.diaryCount, d.photoCount, d.classCount])
  const maxTag = useMemo(() => Math.max(...d.tagDistribution.map(t => t.count)), [d.tagDistribution])

  // 标签条藤蔓生长
  const barRefs = useRef<(HTMLDivElement|null)[]>([])
  useEffect(() => {
    const bars = barRefs.current.filter(Boolean) as HTMLDivElement[]
    bars.forEach((bar, i) => {
      const targetWidth = bar.dataset.width || '0%'
      // 初始清零
      bar.style.transition = 'none'
      bar.style.width = '0%'
      void bar.offsetHeight
      // 生长动画
      setTimeout(() => {
        bar.style.transition = 'width 0.7s cubic-bezier(0.16,1,0.3,1)'
        bar.style.width = targetWidth
      }, 300 + i * 120)
    })
  }, [])
  return (<>
    <header className="flex items-center justify-between pb-[22px] mb-5 flex-wrap gap-3 relative" style={{borderBottom:'1.5px solid rgba(180,160,130,0.25)'}}>
      <div>
        <h1 className="text-[22px] font-semibold tracking-[0.03em] text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>📊 仪表盘</h1>
        <p className="text-[12px] mt-0.5 tracking-[0.06em]" style={{color:'var(--faded)'}}>全国支教数据总览 · 多队协作 · 实时更新</p>
      </div>
      <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 text-[7px] tracking-[7px] whitespace-nowrap" style={{color:'rgba(180,160,130,0.5)'}}>· · · · · · · · · · · ·</div>
    </header>

    {/* Stats row */}
    <div className="grid grid-cols-5 gap-4 mb-6 max-lg:grid-cols-3 max-sm:grid-cols-2">
      {stats.map((s,i)=>(<div key={s.label} className="picture-book-card p-4 flex items-center gap-4 cursor-default hover:-translate-y-1 hover:shadow-md transition-all duration-300" style={{transform:`rotate(${i%2===0?'-0.2deg':'0.15deg'})`}}>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:s.bg,color:s.color}}><s.icon size={22}/></div>
        <div><p className="text-[28px] font-bold" style={{fontFamily:'var(--font-serif)',color:'var(--ink)'}}><CountUp target={s.value} style={{color:'var(--ink)'}} /></p><p className="text-[11px] tracking-[0.06em]" style={{color:'var(--faded)'}}>{s.label}</p></div>
      </div>))}
      <div className="picture-book-card p-4 flex items-center gap-4 cursor-default hover:-translate-y-1 hover:shadow-md transition-all duration-300" style={{transform:'rotate(-0.15deg)',borderColor:'rgba(122,180,90,0.25)'}}>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:'rgba(122,180,90,0.08)',color:'#6aaa50'}}><TrendingUp size={22}/></div>
        <div><p className="text-[28px] font-bold text-green-600" style={{fontFamily:'var(--font-serif)'}}>↑<CountUp target={d.activeTrend} suffix="%" style={{color:'#6aaa50'}} /></p><p className="text-[11px] tracking-[0.06em]" style={{color:'var(--faded)'}}>活跃度</p></div>
      </div>
    </div>

    {/* Main grid */}
    <div className="grid grid-cols-[1.5fr_1fr] gap-5 max-lg:grid-cols-1 mb-6">
      {/* Tag distribution — 底部彩色标签云填充空白 */}
      <div className="picture-book-card p-6 flex flex-col" style={{transform:'rotate(-0.12deg)'}}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[16px] font-semibold tracking-[0.04em] text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>🏷 标签分布</h3>
          <span className="text-[10px] tracking-[0.08em] px-2 py-0.5 rounded-full" style={{background:'rgba(200,160,120,0.08)',color:'var(--faded)',border:'1px solid rgba(200,160,120,0.12)'}}>{d.tagDistribution.length}种标签</span>
        </div>
        <div className="space-y-3.5 flex-1">
          {d.tagDistribution.map((t,i)=>(<div key={t.name} className="flex items-center gap-3 group cursor-default">
            <span className="text-[12px] w-16 flex-shrink-0 text-right font-semibold text-[var(--ink-soft)]">{t.name}</span>
            <div className="flex-1 h-7 rounded-full overflow-hidden relative" style={{background:'rgba(210,195,170,0.10)'}}>
              <div
                ref={el => { barRefs.current[i] = el }}
                data-width={`${(t.count/maxTag)*100}%`}
                className="h-full rounded-full group-hover:brightness-110"
                style={{
                  background: `linear-gradient(90deg,rgba(200,140,80,${0.25+i*0.06}),rgba(200,140,80,${0.5+i*0.08}))`,
                  width: `${(t.count/maxTag)*100}%`,
                }}
              />
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-[var(--ink)] whitespace-nowrap">{t.count}人</span>
            </div>
          </div>))}
        </div>
        {/* 底部彩色标签云 — 填满空白 */}
        <div className="flex flex-wrap gap-1.5 mt-4 pt-4 justify-center" style={{borderTop:'1px solid rgba(200,180,160,0.12)'}}>
          {d.tagDistribution.map((t,i)=>{
            const cs = ['#d4a853','#e07050','#6aaa60','#5a98cc','#b078a8','#c0a070']
            const c = cs[i % cs.length]
            return (<span key={t.name} className="text-[10px] px-2.5 py-1 rounded-full"
              style={{background:`${c}10`,color:c,border:`1px solid ${c}25`,transform:`rotate(${(i%3-1)*1.2}deg)`}}>{t.name} · {t.count}</span>)
          })}
        </div>
      </div>

      {/* Right column: upcoming + quick actions */}
      <div className="space-y-4">
        <div className="picture-book-card p-5" style={{transform:'rotate(0.1deg)'}}>
          <h3 className="text-[16px] font-semibold tracking-[0.04em] mb-3 text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>⏰ 待上课提醒</h3>
          {d.upcomingClasses.map((c,i)=>(<div key={i} className="flex items-center gap-3 py-2.5 last:border-0" style={{borderBottom:i<d.upcomingClasses.length-1?'1px solid rgba(200,180,160,0.1)':'none'}}>
            <Calendar size={15} style={{color:'var(--faded)'}}/>
            <div><p className="text-[13px] font-medium text-[var(--ink)]">{c.title}</p><p className="text-[11px]" style={{color:'var(--faded)'}}>{c.time}</p></div>
          </div>))}
          <Link href="/schedule" className="text-[12px] mt-2 inline-block no-underline hover:underline handwriting" style={{color:'var(--primary-skin)'}}>查看全部课表 →</Link>
        </div>

        <div className="picture-book-card p-5" style={{transform:'rotate(-0.08deg)'}}>
          <h3 className="text-[16px] font-semibold tracking-[0.04em] mb-3 text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>🚀 快捷操作</h3>
          <div className="grid grid-cols-2 gap-2">
            {QUICK_ACTIONS.map(a=>(<Link key={a.l} href={a.h} className="flex items-center gap-2.5 p-2.5 rounded-md text-[12px] no-underline transition-all hover:-translate-y-0.5 hover:shadow-sm" style={{color:'var(--ink-soft)',border:'1px solid rgba(200,180,160,0.12)',background:'rgba(245,240,230,0.25)'}}>
              <span className="text-lg w-5 text-center">{a.e}</span>{a.l}
            </Link>))}
          </div>
        </div>
      </div>
    </div>

    {/* Recent diaries */}
    <div className="picture-book-card p-6 mb-6" style={{transform:'rotate(0.08deg)'}}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[16px] font-semibold tracking-[0.04em] text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>📝 最近评语</h3>
        <Link href="/students" className="text-[12px] no-underline hover:underline handwriting" style={{color:'var(--primary-skin)'}}>查看全部 →</Link>
      </div>
      <div className="space-y-3">
        {d.recentDiaries.map((rd,i)=>(<div key={i} className="flex items-start gap-3 p-3.5 rounded-md transition-colors hover:shadow-sm cursor-default" style={{background:'rgba(245,240,230,0.3)',border:'1px solid rgba(200,180,160,0.08)'}}>
          {(() => { const stu = MOCK_STUDENTS.find(s => s.name === rd.studentName); return stu ? <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 mt-0.5" style={{boxShadow:'0 2px 6px rgba(100,70,40,0.1)',border:'2px solid #fff',outline:'1px solid rgba(180,150,120,0.35)'}}><img src={stu.photo} alt={stu.name} className="w-full h-full object-cover"/></div> : <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5" style={{background:'rgba(200,160,120,0.1)',color:'var(--ink-soft)',border:'1.5px solid rgba(200,160,120,0.12)'}}>{rd.studentName[0]}</div> })()}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-0.5"><span className="text-[13px] font-semibold text-[var(--ink)]">{rd.studentName}</span><span className="text-[11px]" style={{color:'var(--faded)'}}>{rd.timeAgo}</span></div>
            <p className="text-[13px] leading-relaxed line-clamp-2" style={{color:'var(--ink-soft)'}}>{rd.content}</p>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0 mt-1" style={{background:'rgba(122,154,90,0.08)',color:'#6a8a4a',border:'1px solid rgba(122,154,90,0.12)'}}>查看</span>
        </div>))}
      </div>
    </div>

    {/* Notifications */}
    <div className="picture-book-card p-6" style={{transform:'rotate(-0.06deg)'}}>
      <h3 className="text-[16px] font-semibold tracking-[0.04em] mb-4 text-[var(--ink)] flex items-center gap-2" style={{fontFamily:'var(--font-serif)'}}><Bell size={16} style={{color:'var(--faded)'}}/>通知</h3>
      <div className="space-y-2">
        {MOCK_NOTIFICATIONS.map(n=>(<div key={n.id} className="flex items-start gap-3 p-3 rounded-md transition-colors" style={{background:n.read?'rgba(245,240,230,0.15)':'rgba(240,225,190,0.25)',border:`1px solid ${n.read?'rgba(200,180,160,0.08)':'rgba(200,160,100,0.15)'}`,opacity:n.read?0.55:1}}>
          <span className="picture-book-tag mt-0.5 text-[9px] px-1.5 py-0.5 flex-shrink-0" style={{background:n.type==='success'?'rgba(180,210,160,0.12)':n.type==='warning'?'rgba(240,210,140,0.12)':'rgba(200,190,180,0.12)',border:`1px solid ${n.type==='success'?'rgba(140,180,120,0.25)':n.type==='warning'?'rgba(200,170,100,0.25)':'rgba(180,160,140,0.25)'}`}}>{n.type==='success'?'✓':n.type==='warning'?'⚠':'ℹ'}</span>
          <div className="flex-1"><p className="text-[13px] font-medium text-[var(--ink)]">{n.title}</p><p className="text-[12px] mt-0.5" style={{color:'var(--ink-faint)'}}>{n.content} · {n.createdAt}</p></div>
          {!n.read&&<span className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{background:'var(--primary-skin)'}}/>}
        </div>))}
      </div>
    </div>
  </>)
}
