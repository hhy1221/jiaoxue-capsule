'use client'
import StudentLayout from '@/components/layout/StudentLayout'
import { JOURNAL_ENTRIES } from '@/lib/journal-data'
import { useState } from 'react'
import { Calendar, Clock, MapPin, Star, Send, ChevronDown, ChevronUp } from 'lucide-react'

const DAYS = [1,2,3,4,5,6,7,8,9,10,11,12,13]

const QUICK_REACTIONS = ['😊 开心','🤔 好奇','😲 惊奇','💡 有启发','❤️ 感动','🌟 自豪']

export default function StudentJournalPage() {
  const [filterDay, setFilterDay] = useState<number|null>(null)
  const [expandedId, setExpandedId] = useState<string|null>(null)
  const [feelings, setFeelings] = useState<Record<string,string>>({})
  const [feelingInput, setFeelingInput] = useState('')

  const filtered = filterDay ? JOURNAL_ENTRIES.filter(e => e.dayNum === filterDay) : JOURNAL_ENTRIES

  const saveFeeling = (entryId: string) => {
    if (!feelingInput.trim()) return
    setFeelings(p => ({ ...p, [entryId]: feelingInput }))
    setFeelingInput('')
  }

  return (
    <StudentLayout>
      <style>{`
        @keyframes entryIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .entry-row { animation:entryIn 0.4s cubic-bezier(0.22,0.61,0.36,1) both; }
      `}</style>

      <div className="mb-6">
        <h1 className="text-[24px] font-bold text-[var(--ink)]" style={{ fontFamily:'var(--font-serif)' }}>
          🌱 成长日志
        </h1>
        <p className="text-[13px] mt-1" style={{ color:'var(--faded)' }}>回顾每一节课 · 记录你的感受 · 写给未来的自己</p>
      </div>

      {/* 日期筛选 */}
      <div className="flex gap-1.5 mb-6 flex-wrap">
        <button onClick={() => setFilterDay(null)}
          className="px-3 py-1.5 rounded-full text-[12px] border-none cursor-pointer"
          style={{ background: !filterDay ? 'linear-gradient(135deg,#7a9a5a,#5a7a3a)' : 'transparent', color: !filterDay ? '#fff' : 'var(--faded)', fontFamily: 'inherit', border: `1.5px solid ${!filterDay ? 'transparent' : 'rgba(200,180,160,0.2)'}` }}>
          📅 全部
        </button>
        {DAYS.map(d => (
          <button key={d} onClick={() => setFilterDay(d)}
            className="px-3 py-1.5 rounded-full text-[12px] border-none cursor-pointer"
            style={{ background: filterDay === d ? 'linear-gradient(135deg,#7a9a5a,#5a7a3a)' : 'transparent', color: filterDay === d ? '#fff' : 'var(--faded)', fontFamily: 'inherit', border: `1.5px solid ${filterDay === d ? 'transparent' : 'rgba(200,180,160,0.2)'}` }}>
            D{d}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((entry, idx) => {
          const expanded = expandedId === entry.id
          const studentReflections = entry.studentReflections
          const myFeeling = feelings[entry.id]
          return (
            <div key={entry.id} className="picture-book-card p-0 overflow-hidden entry-row"
              style={{ animationDelay: `${idx * 0.08}s`, borderLeft: `4px solid ${entry.courseColor}`, transform: 'rotate(-0.03deg)' }}>
              {/* 头部 */}
              <div className="p-5 cursor-pointer" onClick={() => setExpandedId(expanded ? null : entry.id)}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-[50px] h-[50px] rounded-xl flex items-center justify-center text-2xl"
                      style={{ background: `${entry.courseColor}15`, border: `1.5px solid ${entry.courseColor}30` }}>
                      {entry.courseEmoji}
                    </div>
                    <div>
                      <h3 className="text-[16px] font-bold text-[var(--ink)]" style={{ fontFamily: 'var(--font-serif)' }}>{entry.courseName}</h3>
                      <div className="flex items-center gap-2 text-[11px]" style={{ color: 'var(--faded)' }}>
                        <span className="flex items-center gap-1"><Calendar size={10} />Day {entry.dayNum}</span>
                        <span className="flex items-center gap-1"><Clock size={10} />{entry.timeSlot}</span>
                        <span>{entry.teacher}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {myFeeling && <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(240,200,120,0.15)', color: '#c8862e', border: '1px solid rgba(240,200,120,0.25)' }}>💭 已记录</span>}
                    {expanded ? <ChevronUp size={18} style={{ color: 'var(--faded)' }} /> : <ChevronDown size={18} style={{ color: 'var(--faded)' }} />}
                  </div>
                </div>
                <p className="text-[13px] leading-relaxed" style={{ color: 'var(--ink-soft)' }}>{entry.teachingHighlight}</p>
              </div>

              {/* 展开 */}
              {expanded && (
                <div className="px-5 pb-5 space-y-4" style={{ borderTop: '1px solid rgba(200,160,120,0.1)' }}>
                  {studentReflections.length > 0 && (
                    <div className="pt-4">
                      <h4 className="text-[13px] font-bold mb-2 text-[var(--ink)]">🧒 同学们的感想</h4>
                      <div className="space-y-2">
                        {studentReflections.map((sr, i) => (
                          <div key={i} className="flex gap-2.5 p-3 rounded-xl" style={{ background: 'rgba(245,240,230,0.3)', border: '1px solid rgba(200,180,160,0.08)' }}>
                            <span className="text-xl">{sr.studentAvatar}</span>
                            <div>
                              <p className="text-[12px] font-bold text-[var(--ink)]">{sr.studentName}</p>
                              <p className="text-[12px] leading-relaxed" style={{ color: 'var(--ink-soft)' }}>{sr.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="text-[13px] font-bold mb-2 text-[var(--ink)]">{myFeeling ? '💭 我的感受' : '💭 这节课你有什么感受？'}</h4>
                    {myFeeling ? (
                      <div className="p-3 rounded-xl" style={{ background: 'rgba(240,200,120,0.06)', border: '1px solid rgba(240,200,120,0.15)' }}>
                        <p className="text-[13px]" style={{ color: 'var(--ink-soft)' }}>{myFeeling}</p>
                        <button onClick={() => setFeelings(p => { const n = { ...p }; delete n[entry.id]; return n })}
                          className="text-[10px] bg-transparent border-none cursor-pointer mt-1" style={{ color: 'var(--faded)' }}>删除重写</button>
                      </div>
                    ) : (
                      <div>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {QUICK_REACTIONS.map(r => (
                            <button key={r} onClick={() => setFeelings(p => ({ ...p, [entry.id]: r }))}
                              className="px-3 py-1.5 rounded-full text-[12px] border-none cursor-pointer transition-all hover:-translate-y-0.5"
                              style={{ background: 'rgba(245,240,230,0.4)', color: 'var(--ink-soft)', border: '1px solid rgba(200,180,160,0.15)', fontFamily: 'inherit' }}>{r}</button>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input value={feelingInput} onChange={e => setFeelingInput(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') saveFeeling(entry.id) }}
                            placeholder="写下你的感受…" className="flex-1 px-4 py-2.5 rounded-xl text-[13px] outline-none"
                            style={{ border: '1.5px solid rgba(200,180,160,0.2)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit' }} />
                          <button onClick={() => saveFeeling(entry.id)} disabled={!feelingInput.trim()}
                            className="picture-book-btn primary flex items-center gap-1" style={{ fontSize: 12, opacity: feelingInput.trim() ? 1 : 0.5 }}>
                            <Send size={12} />记录
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
    </StudentLayout>
  )
}
