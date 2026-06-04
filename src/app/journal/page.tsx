'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { JOURNAL_ENTRIES, JournalEntry } from '@/lib/journal-data'
import { useState, useMemo } from 'react'
import { Calendar, Sparkles, Camera, PenLine, Heart, Filter, Star, ChevronDown, ChevronUp, MapPin, Clock, MessageCircle, Image, Video, Plus, Send } from 'lucide-react'

const DAYS_ALL = [1,2,3,4,5,6,7,8,9,10,11,12,13]
const DAY_LABELS: Record<number,string> = {1:'开营日',2:'探索日',3:'文化日',4:'创意日',5:'科学日',6:'户外日',7:'总结日',8:'启程日',9:'艺术日',10:'科技日',11:'传承日',12:'实践日',13:'结营日'}

export default function JournalPage() {
  const [filterDay, setFilterDay] = useState<number|null>(null)
  const [expandedId, setExpandedId] = useState<string|null>(null)
  const [viewMode, setViewMode] = useState<'timeline'|'gallery'>('timeline')
  const [teacherNote, setTeacherNote] = useState('')
  const [showNoteInput, setShowNoteInput] = useState(false)

  const filtered = useMemo(() => {
    if (!filterDay) return JOURNAL_ENTRIES
    return JOURNAL_ENTRIES.filter(e => e.dayNum === filterDay)
  }, [filterDay])

  const totalPhotos = JOURNAL_ENTRIES.reduce((s,e)=>s+e.teacherPhotos.length+e.studentPhotos.length,0)
  const totalReflections = JOURNAL_ENTRIES.reduce((s,e)=>s+e.studentReflections.length+1,0) // +1 for teacher each
  const letterMoments = JOURNAL_ENTRIES.reduce((s,e)=>s+e.keyMoments.filter(m=>m.forLetter).length,0)

  return (
    <InnerLayout>
      <style>{`
        @keyframes journalFadeIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes timelineDotGlow { 0%,100% { box-shadow:0 0 0 0 var(--primary-skin); } 50% { box-shadow:0 0 0 8px rgba(200,160,110,0); } }
        @keyframes highlightPulse { 0%,100% { background:rgba(240,200,120,0.15); } 50% { background:rgba(240,200,120,0.3); } }
        .journal-entry { animation: journalFadeIn 0.5s cubic-bezier(0.22,0.61,0.36,1) both; }
        .timeline-dot-active { animation: timelineDotGlow 2.5s infinite; }
        .key-moment-card { animation: highlightPulse 3s infinite; }
      `}</style>

      {/* Header */}
      <header className="relative mb-6 rounded-2xl overflow-hidden" style={{
        background:'linear-gradient(135deg,rgba(200,150,110,0.12),rgba(180,130,80,0.06),rgba(240,200,140,0.04))',
        border:'1.5px solid rgba(200,160,120,0.2)',padding:'24px 30px',
      }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[24px] font-bold tracking-[0.03em] text-[var(--ink)] flex items-center gap-2" style={{fontFamily:'var(--font-serif)'}}>
              📖 成长日志
            </h1>
            <p className="text-[12px] mt-0.5 tracking-[0.04em]" style={{color:'var(--faded)'}}>
              13天夏令营 · 12节精选课堂 · {totalReflections}条感言 · {letterMoments}个可写进临别信的瞬间
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border p-0.5" style={{borderColor:'rgba(200,180,160,0.2)',background:'rgba(245,240,230,0.3)'}}>
              <button onClick={()=>setViewMode('timeline')} className="px-3 py-1.5 rounded-md text-[11px] font-medium border-none cursor-pointer transition-all"
                style={{background:viewMode==='timeline'?'linear-gradient(135deg,#9b7a4a,#7a5a3a)':'transparent',color:viewMode==='timeline'?'#fff':'var(--ink-soft)',fontFamily:'inherit'}}>📋 时间线</button>
              <button onClick={()=>setViewMode('gallery')} className="px-3 py-1.5 rounded-md text-[11px] font-medium border-none cursor-pointer transition-all"
                style={{background:viewMode==='gallery'?'linear-gradient(135deg,#9b7a4a,#7a5a3a)':'transparent',color:viewMode==='gallery'?'#fff':'var(--ink-soft)',fontFamily:'inherit'}}>🖼️ 瞬间</button>
            </div>
          </div>
        </div>

        {/* 13天快速导航 */}
        <div className="flex gap-1.5 mt-4 flex-wrap">
          <button onClick={()=>setFilterDay(null)} className="px-2.5 py-1 rounded-full text-[10px] border-none cursor-pointer transition-all"
            style={{background:!filterDay?'var(--primary-skin)':'transparent',color:!filterDay?'#fff':'var(--faded)',fontFamily:'inherit',border:`1px solid ${!filterDay?'transparent':'rgba(200,180,160,0.2)'}`}}>
            全部
          </button>
          {DAYS_ALL.map(d=>(
            <button key={d} onClick={()=>setFilterDay(d)} className="px-2.5 py-1 rounded-full text-[10px] border-none cursor-pointer transition-all"
              style={{background:filterDay===d?'var(--primary-skin)':'transparent',color:filterDay===d?'#fff':'var(--faded)',fontFamily:'inherit',border:`1px solid ${filterDay===d?'transparent':'rgba(200,180,160,0.2)'}`}}>
              Day{d}
            </button>
          ))}
        </div>
      </header>

      {/* ═══ 时间线模式 ═══ */}
      {viewMode === 'timeline' && (
        <div className="relative">
          {/* 时间线竖线 */}
          <div className="absolute left-[27px] top-2 bottom-2 w-[2px] rounded-full"
            style={{background:'repeating-linear-gradient(180deg,rgba(200,180,160,0.3) 0px,rgba(200,180,160,0.3) 4px,transparent 4px,transparent 10px)'}}/>

          <div className="space-y-6">
            {filtered.map((entry, idx) => {
              const expanded = expandedId === entry.id
              const letterMomentsForEntry = entry.keyMoments.filter(m=>m.forLetter)
              return (
                <div key={entry.id} className="journal-entry flex gap-5" style={{animationDelay:`${idx*0.08}s`}}>
                  {/* 时间线节点 */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-xl"
                      style={{background:`${entry.courseColor}15`,border:`2px solid ${entry.courseColor}30`,boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
                      {entry.courseEmoji}
                    </div>
                    <div className="text-center mt-1">
                      <span className="text-[10px] font-bold" style={{color:entry.courseColor}}>Day{entry.dayNum}</span>
                    </div>
                  </div>

                  {/* 内容卡片 */}
                  <div className="flex-1 picture-book-card p-5 cursor-pointer hover:shadow-md transition-all duration-300"
                    style={{borderLeft:`4px solid ${entry.courseColor}`}}
                    onClick={()=>setExpandedId(expanded?null:entry.id)}>
                    {/* 头部 */}
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                      <div>
                        <h3 className="text-[16px] font-semibold text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>
                          {entry.courseName}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5 text-[10px]" style={{color:'var(--faded)'}}>
                          <span className="flex items-center gap-1"><Calendar size={10}/>{entry.date}</span>
                          <span className="flex items-center gap-1"><Clock size={10}/>{entry.timeSlot}</span>
                          <span className="flex items-center gap-1"><MapPin size={10}/>{entry.location}</span>
                          <span>{entry.teacher}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {letterMomentsForEntry.length>0&&(
                          <span className="text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1" style={{background:'rgba(240,200,120,0.15)',color:'#c8862e',border:'1px solid rgba(240,200,120,0.25)'}}>
                            <Star size={9}/> {letterMomentsForEntry.length}个临别瞬间
                          </span>
                        )}
                        <button className="bg-transparent border-none cursor-pointer" style={{color:'var(--faded)'}}>
                          {expanded?<ChevronUp size={16}/>:<ChevronDown size={16}/>}
                        </button>
                      </div>
                    </div>

                    {/* 摘要：教学亮点 */}
                    <div className="p-3 rounded-lg mb-3" style={{background:'rgba(245,238,220,0.5)',border:'1px solid rgba(200,160,120,0.12)'}}>
                      <p className="text-[10px] font-semibold mb-1" style={{color:'var(--primary-skin)'}}>💡 教学亮点</p>
                      <p className="text-[12px] leading-relaxed" style={{color:'var(--ink-soft)'}}>{entry.teachingHighlight}</p>
                    </div>

                    {/* 展开内容 */}
                    {expanded && (
                      <div className="space-y-4 pt-3" style={{borderTop:'1px solid rgba(200,160,120,0.1)'}}>
                        {/* 教师反思 */}
                        <div>
                          <h4 className="text-[11px] font-semibold mb-2 text-[var(--ink)] flex items-center gap-1.5">
                            <PenLine size={12} style={{color:'var(--faded)'}}/> 教师反思
                          </h4>
                          <p className="text-[12px] leading-[2] text-[var(--ink-soft)] whitespace-pre-line">{entry.teacherReflection}</p>
                        </div>

                        {/* 学生感言 */}
                        {entry.studentReflections.length>0&&(
                          <div>
                            <h4 className="text-[11px] font-semibold mb-2 text-[var(--ink)] flex items-center gap-1.5">
                              <MessageCircle size={12} style={{color:'var(--faded)'}}/> 学生感言
                            </h4>
                            <div className="space-y-2">
                              {entry.studentReflections.map((sr,i)=>(
                                <div key={i} className="flex gap-2.5 p-2.5 rounded-lg" style={{background:'rgba(245,240,230,0.3)',border:'1px solid rgba(200,180,160,0.08)'}}>
                                  <span className="text-lg flex-shrink-0">{sr.studentAvatar}</span>
                                  <div>
                                    <p className="text-[11px] font-semibold text-[var(--ink)]">{sr.studentName}</p>
                                    <p className="text-[11px] leading-relaxed" style={{color:'var(--ink-soft)'}}>{sr.content}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* ⭐ 可写进临别信的关键瞬间 */}
                        {letterMomentsForEntry.length>0&&(
                          <div>
                            <h4 className="text-[11px] font-semibold mb-2 text-[var(--ink)] flex items-center gap-1.5">
                              <Star size={12} fill="#e8a040" style={{color:'#e8a040'}}/> 临别信素材
                            </h4>
                            <div className="space-y-1.5">
                              {letterMomentsForEntry.map((m,i)=>(
                                <div key={i} className="p-2.5 rounded-lg key-moment-card flex items-start gap-2"
                                  style={{border:'1px solid rgba(240,200,120,0.25)'}}>
                                  <span className="text-xs mt-0.5">{m.type==='teacher'?'👨‍🏫':'🧒'}</span>
                                  <div>
                                    <p className="text-[11px] leading-relaxed" style={{color:'var(--ink-soft)'}}>{m.content}</p>
                                    <p className="text-[9px] mt-0.5" style={{color:'var(--faded)'}}>— {m.author}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 教师补充笔记输入框 */}
                        {!showNoteInput ? (
                          <button onClick={(e)=>{e.stopPropagation();setShowNoteInput(true)}}
                            className="picture-book-btn flex items-center gap-1.5 w-full justify-center" style={{fontSize:11}}>
                            <Plus size={12}/> 补充笔记
                          </button>
                        ) : (
                          <div className="space-y-2" onClick={e=>e.stopPropagation()}>
                            <textarea value={teacherNote} onChange={e=>setTeacherNote(e.target.value)}
                              placeholder="记录你的观察和感想…" rows={3}
                              className="w-full p-3 rounded-xl text-[12px] outline-none resize-none"
                              style={{border:'1.5px solid rgba(200,180,160,0.2)',background:'var(--surface)',color:'var(--ink)',fontFamily:'inherit'}}/>
                            <div className="flex gap-2 justify-end">
                              <button onClick={()=>setShowNoteInput(false)} className="picture-book-btn" style={{fontSize:10}}>取消</button>
                              <button onClick={()=>{setShowNoteInput(false);setTeacherNote('')}}
                                className="picture-book-btn primary flex items-center gap-1" style={{fontSize:10}}>
                                <Send size={11}/>保存
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* 标签 */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {entry.tags.map(t=><span key={t} className="text-[9px] px-2 py-0.5 rounded-full"
                        style={{background:'rgba(200,180,160,0.06)',color:'var(--faded)',border:'1px solid rgba(200,180,160,0.12)'}}>#{t}</span>)}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ═══ 画廊模式 — 关键瞬间卡片墙 ═══ */}
      {viewMode === 'gallery' && (
        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
          {JOURNAL_ENTRIES.flatMap(e=>e.keyMoments.filter(m=>m.forLetter).map(m=>({...m,entry:e}))).map((item,i)=>(
            <div key={i} className="picture-book-card p-5 journal-entry" style={{animationDelay:`${i*0.08}s`,borderLeft:`4px solid ${item.entry.courseColor}`,transform:'rotate(-0.1deg)'}}>
              <div className="text-3xl mb-2">{item.entry.courseEmoji}</div>
              <p className="text-[10px] font-semibold mb-1" style={{color:item.entry.courseColor}}>Day{item.entry.dayNum} · {item.entry.courseName}</p>
              <p className="text-[12px] leading-relaxed mb-2" style={{color:'var(--ink-soft)'}}>"{item.content}"</p>
              <div className="flex items-center justify-between text-[9px]" style={{color:'var(--faded)'}}>
                <span>{item.type==='teacher'?'👨‍🏫':'🧒'} {item.author}</span>
                <span className="px-2 py-0.5 rounded-full" style={{background:'rgba(240,200,120,0.1)',color:'#c8862e',border:'1px solid rgba(240,200,120,0.2)'}}>⭐ 临别信素材</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 底部统计 */}
      <div className="mt-8 picture-book-card p-5 flex items-center justify-center gap-10 flex-wrap">
        {[{n:JOURNAL_ENTRIES.length,l:'课堂日志',e:'📖'},{n:totalReflections,l:'师生感言',e:'💬'},{n:letterMoments,l:'临别信素材',e:'⭐'},{n:8,l:'活跃学生',e:'🧒'},{n:4,l:'授课老师',e:'👨‍🏫'}].map(s=>(
          <div key={s.l} className="text-center">
            <p className="text-[22px] font-bold text-[var(--primary-skin)]" style={{fontFamily:'var(--font-serif)'}}>{s.n}</p>
            <p className="text-[10px] tracking-[0.08em]" style={{color:'var(--faded)'}}>{s.e} {s.l}</p>
          </div>
        ))}
      </div>
    </InnerLayout>
  )
}
