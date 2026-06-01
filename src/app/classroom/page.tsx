'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { MOCK_CLASSROOMS } from '@/lib/mock-data'
import Link from 'next/link'
import { useState } from 'react'
import { Bell, CheckCircle2, Camera, FileText, PenLine, ChevronDown, Clock, MapPin, User, Sparkles } from 'lucide-react'

const DAYS = [1,2,3,4,5,6,7,8,9,10,11,12,13]
const DAY_LABELS:Record<number,string> = {
  1:'报到·开营',2:'AI启蒙',3:'低碳+科学',4:'地理+绘画',5:'阅读+茶文化',
  6:'生物+历史',7:'数学+运动会',8:'地质+思维',9:'写作+书法',10:'历史+能源',
  11:'非遗+文化',12:'展览+汇演',13:'告别·结营'
}

export default function ClassroomListPage() {
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([1,4,7,11]))

  const toggleDay = (d:number) => {
    setExpandedDays(prev => { const s=new Set(prev); s.has(d)?s.delete(d):s.add(d); return s })
  }
  const coursesByDay = (day:number) => MOCK_CLASSROOMS.filter(c=>c.dayNum===day)

  return (<InnerLayout>
    <header className="flex items-center justify-between pb-[22px] mb-5 flex-wrap gap-3 relative" style={{borderBottom:'1.5px solid rgba(180,160,130,0.25)'}}>
      <div>
        <h1 className="text-[19px] font-semibold tracking-[0.03em] text-[var(--ink)]" style={{fontFamily:"var(--font-serif)"}}>🏫 课堂</h1>
        <p className="text-[11px] mt-0.5 tracking-[0.06em]" style={{color:'var(--faded)'}}>13天夏令营 · {MOCK_CLASSROOMS.length}节课 · 点击展开每日课程</p>
      </div>
      <div className="flex gap-2">
        <button onClick={()=>setExpandedDays(new Set(DAYS))} className="picture-book-btn" style={{fontSize:10,padding:'3px 10px'}}>全部展开</button>
        <button onClick={()=>setExpandedDays(new Set())} className="picture-book-btn" style={{fontSize:10,padding:'3px 10px'}}>全部折叠</button>
      </div>
      <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 text-[7px] tracking-[7px] whitespace-nowrap"
        style={{color:'rgba(180,160,130,0.5)'}}>· · · · · · · · · · · ·</div>
    </header>

    <div className="space-y-4">
      {DAYS.map(day => {
        const courses = coursesByDay(day)
        if (!courses.length) return null
        const isExpanded = expandedDays.has(day)
        return (
          <div key={day} className="picture-book-card overflow-hidden" style={{transform:'rotate(-0.1deg)'}}>
            {/* Day header — clickable fold */}
            <div
              className="flex items-center gap-4 px-6 py-4 cursor-pointer transition-all duration-300 hover:opacity-90 relative"
              style={{
                background: `linear-gradient(135deg, ${courses[0].courseColor}08, ${courses[0].courseColor}03 60%, transparent)`,
                borderBottom: isExpanded ? `1px solid ${courses[0].courseColor}15` : 'none',
              }}
              onClick={()=>toggleDay(day)}>
              {/* Day number badge */}
              <div className="w-14 h-14 rounded-xl flex flex-col items-center justify-center flex-shrink-0 relative"
                style={{
                  background: `linear-gradient(135deg, ${courses[0].courseColor}18, ${courses[0].courseColor}08)`,
                  border: `1.5px solid ${courses[0].courseColor}25`,
                  boxShadow: `0 2px 10px ${courses[0].courseColor}0a`,
                }}>
                <span className="text-[13px] font-bold tracking-[0.04em]" style={{color:courses[0].courseColor,fontFamily:'var(--font-serif)'}}>Day</span>
                <span className="text-[18px] font-bold leading-none" style={{color:courses[0].courseColor,fontFamily:'var(--font-serif)'}}>{day}</span>
              </div>

              {/* Day info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-[16px] font-bold tracking-[0.04em] text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>
                    {DAY_LABELS[day]||''}
                  </h2>
                  <div className="flex gap-1">
                    {courses.slice(0,5).map((c,i)=>(<div key={i} className="w-2 h-2 rounded-full" style={{background:c.courseColor,opacity:0.3+i*0.15}}/>))}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-[11px]" style={{color:'var(--faded)'}}>
                  <span>{courses.length}节课</span>
                  <span>·</span>
                  <span>{courses.length>0?courses[0].date:'—'}</span>
                </div>
              </div>

              {/* Right side: expand arrow + mini stat */}
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="flex items-center gap-3 text-[10px]" style={{color:'var(--ink-faint)'}}>
                  <span className="flex items-center gap-1"><FileText size={12}/>{courses.reduce((a,c)=>a+c.materials.length,0)}</span>
                  <span className="flex items-center gap-1"><Camera size={12}/>{courses.reduce((a,c)=>a+c.moments.length,0)}</span>
                  <span className="flex items-center gap-1"><PenLine size={12}/>{courses.reduce((a,c)=>a+c.teachingNotes.length,0)}</span>
                </div>
                <ChevronDown size={18} className="transition-transform duration-400" style={{transform:isExpanded?'rotate(180deg)':'rotate(0deg)',color:'var(--faded)'}}/>
              </div>
            </div>

            {/* Expanded courses */}
            {isExpanded && (
              <div className="px-5 pb-5 pt-2 space-y-3">
                {courses.map((c,i) => (
                  <Link key={c.id} href={`/classroom/${c.id}`} className="no-underline block group">
                    <div className="flex items-center gap-5 p-4 rounded-xl transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md cursor-pointer relative overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${c.courseColor}05, ${c.courseColor}02 40%, transparent 80%)`,
                        border: `1px solid ${c.courseColor}12`,
                        borderLeft: `4px solid ${c.courseColor}`,
                      }}>
                      {/* Time strip */}
                      <div className="flex-shrink-0 w-[72px] text-center">
                        <div className="text-[10px] font-semibold tracking-[0.06em] mb-1 px-2 py-0.5 rounded-full"
                          style={{background:`${c.courseColor}10`,color:c.courseColor}}>
                          {c.timeSlot.split('-')[0]}
                        </div>
                        <div className="text-[9px] tracking-[0.04em]" style={{color:'var(--faded)'}}>
                          {c.timeSlot.split('-')[1]}
                        </div>
                      </div>

                      {/* Emoji + info */}
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                        style={{background:`${c.courseColor}12`,border:`1.5px solid ${c.courseColor}22`,boxShadow:`0 2px 8px ${c.courseColor}08`}}>
                        {c.courseEmoji}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="text-[14px] font-semibold tracking-[0.03em] text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>
                            {c.courseName}
                          </h3>
                          {c.preNotified?(
                            <span className="flex items-center gap-0.5 text-[8px] px-1.5 py-0.5 rounded-full flex-shrink-0"
                              style={{background:'rgba(122,154,90,0.08)',border:'1px solid rgba(122,154,90,0.15)',color:'#5a7a3a'}}>
                              <CheckCircle2 size={8}/>已通知
                            </span>
                          ):(
                            <span className="flex items-center gap-0.5 text-[8px] px-1.5 py-0.5 rounded-full flex-shrink-0"
                              style={{background:'rgba(200,160,80,0.08)',border:'1px solid rgba(200,160,80,0.15)',color:'#8b6a3a'}}>
                              <Bell size={8}/>待通知
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-[10px] flex-wrap" style={{color:'var(--faded)'}}>
                          <span className="flex items-center gap-1"><User size={10}/>{c.teacher}</span>
                          <span className="flex items-center gap-1"><MapPin size={10}/>{c.location}</span>
                        </div>
                      </div>

                      {/* Stats pills */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-full"
                          style={{background:`${c.courseColor}08`,color:'var(--ink-faint)'}}>
                          <FileText size={10}/>{c.materials.length}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-full"
                          style={{background:`${c.courseColor}08`,color:'var(--ink-faint)'}}>
                          <Camera size={10}/>{c.moments.length}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-full"
                          style={{background:`${c.courseColor}08`,color:'var(--ink-faint)'}}>
                          <PenLine size={10}/>{c.teachingNotes.length}
                        </span>
                      </div>

                      {/* Hover arrow */}
                      <span className="handwriting text-[14px] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
                        style={{color:c.courseColor}}>→</span>

                      {/* Decorative dot pattern on hover */}
                      <div className="absolute top-0 right-0 w-20 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{background:`radial-gradient(circle, ${c.courseColor}08 1px, transparent 1px)`,backgroundSize:'12px 12px'}}/>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>

    {/* Empty state */}
    <div className="mt-8 picture-book-card p-5 text-center" style={{border:'2px dashed rgba(200,180,160,0.2)',background:'linear-gradient(135deg,rgba(245,238,225,0.2),rgba(240,230,215,0.1))'}}>
      <p className="text-[12px] tracking-[0.06em] handwriting" style={{color:'var(--ink-faint)'}}>
        💡 点击每天标题展开查看当日课程 · 点击具体课程进入管理
      </p>
    </div>
  </InnerLayout>)
}
