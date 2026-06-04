'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { JOURNAL_ENTRIES, JournalEntry } from '@/lib/journal-data'
import { useState } from 'react'
import { Calendar, Clock, MapPin, Star, Send, Heart, ChevronDown, ChevronUp, Smile } from 'lucide-react'

const DAYS = [1,2,3,4,5,6,7,8,9,10,11,12,13]

export default function StudentJournalPage() {
  const [filterDay, setFilterDay] = useState<number|null>(null)
  const [expandedId, setExpandedId] = useState<string|null>(null)
  const [feelings, setFeelings] = useState<Record<string,string>>({})
  const [feelingInput, setFeelingInput] = useState('')

  const filtered = filterDay ? JOURNAL_ENTRIES.filter(e=>e.dayNum===filterDay) : JOURNAL_ENTRIES

  const saveFeeling = (entryId: string) => {
    if (!feelingInput.trim()) return
    setFeelings(p=>({...p,[entryId]:feelingInput}))
    setFeelingInput('')
  }

  const QUICK_REACTIONS = ['😊 开心','🤔 好奇','😲 惊奇','💡 有启发','❤️ 感动','🌟 自豪']

  return (
    <InnerLayout>
      <style>{`
        @keyframes journalIn { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        .entry-card { animation: journalIn 0.45s cubic-bezier(0.22,0.61,0.36,1) both; }
      `}</style>

      <header className="relative mb-5 rounded-2xl overflow-hidden" style={{
        background:'linear-gradient(135deg,rgba(200,180,140,0.12),rgba(220,200,160,0.08))',
        border:'1.5px solid rgba(200,160,120,0.18)',padding:'20px 28px',
      }}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🌟</span>
          <div>
            <h1 className="text-[20px] font-bold text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>📖 我的成长日志</h1>
            <p className="text-[10px]" style={{color:'var(--faded)'}}>回顾每一节课 · 记录你的感受 · 写给未来的自己</p>
          </div>
        </div>
        <div className="flex gap-1.5 mt-3 flex-wrap">
          <button onClick={()=>setFilterDay(null)} className="px-2.5 py-1 rounded-full text-[10px] border-none cursor-pointer"
            style={{background:!filterDay?'var(--primary-skin)':'transparent',color:!filterDay?'#fff':'var(--faded)',fontFamily:'inherit',border:`1px solid ${!filterDay?'transparent':'rgba(200,180,160,0.2)'}`}}>
            📅 全部
          </button>
          {DAYS.map(d=>(
            <button key={d} onClick={()=>setFilterDay(d)} className="px-2.5 py-1 rounded-full text-[10px] border-none cursor-pointer"
              style={{background:filterDay===d?'var(--primary-skin)':'transparent',color:filterDay===d?'#fff':'var(--faded)',fontFamily:'inherit',border:`1px solid ${filterDay===d?'transparent':'rgba(200,180,160,0.2)'}`}}>
              D{d}
            </button>
          ))}
        </div>
      </header>

      <div className="space-y-5">
        {filtered.map((entry,idx)=>{
          const expanded = expandedId===entry.id
          const studentReflections = entry.studentReflections
          const myFeeling = feelings[entry.id]
          return (
            <div key={entry.id} className="picture-book-card p-0 overflow-hidden entry-card" style={{animationDelay:`${idx*0.08}s`,borderLeft:`4px solid ${entry.courseColor}`,transform:'rotate(-0.04deg)'}}>
              {/* 头部 */}
              <div className="p-5 cursor-pointer" onClick={()=>setExpandedId(expanded?null:entry.id)}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{background:`${entry.courseColor}12`,border:`1.5px solid ${entry.courseColor}25`}}>
                      {entry.courseEmoji}
                    </div>
                    <div>
                      <h3 className="text-[15px] font-semibold text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>
                        {entry.courseName}
                      </h3>
                      <div className="flex items-center gap-2 text-[9px]" style={{color:'var(--faded)'}}>
                        <span className="flex items-center gap-1"><Calendar size={9}/>Day {entry.dayNum} · {entry.date}</span>
                        <span className="flex items-center gap-1"><Clock size={9}/>{entry.timeSlot}</span>
                        <span className="flex items-center gap-1"><MapPin size={9}/>{entry.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {myFeeling && <span className="text-[9px] px-2 py-0.5 rounded-full" style={{background:'rgba(240,200,120,0.12)',color:'#c8862e',border:'1px solid rgba(240,200,120,0.2)'}}>💭 已记录</span>}
                    {expanded?<ChevronUp size={16} style={{color:'var(--faded)'}}/>:<ChevronDown size={16} style={{color:'var(--faded)'}}/>}
                  </div>
                </div>
                <p className="text-[12px] leading-relaxed" style={{color:'var(--ink-soft)'}}>{entry.teachingHighlight}</p>
              </div>

              {/* 展开 */}
              {expanded && (
                <div className="px-5 pb-5 space-y-4" style={{borderTop:'1px solid rgba(200,160,120,0.1)'}}>
                  {/* 同学们的感想 */}
                  {studentReflections.length>0&&(
                    <div className="pt-4">
                      <h4 className="text-[11px] font-semibold mb-2 text-[var(--ink)]">🧒 同学们的感想</h4>
                      <div className="space-y-2">
                        {studentReflections.map((sr,i)=>(
                          <div key={i} className="flex gap-2 p-2.5 rounded-lg" style={{background:'rgba(245,240,230,0.3)',border:'1px solid rgba(200,180,160,0.08)'}}>
                            <span className="text-lg">{sr.studentAvatar}</span>
                            <div>
                              <p className="text-[10px] font-semibold text-[var(--ink)]">{sr.studentName}</p>
                              <p className="text-[10px] leading-relaxed" style={{color:'var(--ink-soft)'}}>{sr.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 我的感受 */}
                  <div>
                    <h4 className="text-[11px] font-semibold mb-2 text-[var(--ink)]">
                      {myFeeling ? '💭 我的感受' : '💭 这节课你有什么感受？'}
                    </h4>
                    {myFeeling ? (
                      <div className="p-3 rounded-xl" style={{background:'rgba(240,200,120,0.06)',border:'1px solid rgba(240,200,120,0.15)'}}>
                        <p className="text-[11px]" style={{color:'var(--ink-soft)'}}>{myFeeling}</p>
                        <button onClick={()=>setFeelings(p=>{const n={...p};delete n[entry.id];return n})}
                          className="text-[9px] bg-transparent border-none cursor-pointer mt-1" style={{color:'var(--faded)'}}>删除重写</button>
                      </div>
                    ) : (
                      <div>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {QUICK_REACTIONS.map(r=>(
                            <button key={r} onClick={()=>setFeelings(p=>({...p,[entry.id]:r}))}
                              className="px-2.5 py-1 rounded-full text-[10px] border-none cursor-pointer transition-all hover:-translate-y-0.5"
                              style={{background:'rgba(245,240,230,0.4)',color:'var(--ink-soft)',border:'1px solid rgba(200,180,160,0.15)',fontFamily:'inherit'}}>
                              {r}
                            </button>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input value={feelingInput} onChange={e=>setFeelingInput(e.target.value)}
                            onKeyDown={e=>{if(e.key==='Enter')saveFeeling(entry.id)}}
                            placeholder="写下你的感受…" className="flex-1 px-3 py-2 rounded-lg text-[11px] outline-none"
                            style={{border:'1.5px solid rgba(200,180,160,0.2)',background:'var(--surface)',color:'var(--ink)',fontFamily:'inherit'}}/>
                          <button onClick={()=>saveFeeling(entry.id)} disabled={!feelingInput.trim()}
                            className="picture-book-btn primary flex items-center gap-1" style={{fontSize:10,opacity:feelingInput.trim()?1:0.5}}>
                            <Send size={11}/>记录
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </InnerLayout>
  )
}
