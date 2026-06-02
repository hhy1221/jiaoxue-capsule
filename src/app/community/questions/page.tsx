'use client'

import InnerLayout from '@/components/layout/InnerLayout'
import { MOCK_QUESTIONS } from '@/lib/mock-data'
import { SUBJECT_LABELS, SUBJECT_EMOJIS, QuestionSubject } from '@/types'
import { useState, useMemo } from 'react'
import { Search, MessageCircle, User, MapPin, CheckCircle, Clock, ThumbsUp } from 'lucide-react'

const REGIONS = ['全部','西南','西北','华东','华中','华南','东北']

export default function QuestionsPage() {
  const [search, setSearch] = useState('')
  const [subject, setSubject] = useState<string>('all')
  const [region, setRegion] = useState('全部')
  const [status, setStatus] = useState<string>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = useMemo(()=>{
    let items = [...MOCK_QUESTIONS]
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      items = items.filter(x=>x.title.toLowerCase().includes(q)||x.content.toLowerCase().includes(q)||x.tags.some(t=>t.includes(q)))
    }
    if (subject!=='all') items = items.filter(x=>x.subject===subject)
    if (region!=='全部') items = items.filter(x=>x.region===region)
    if (status==='open') items = items.filter(x=>x.status==='open')
    if (status==='answered') items = items.filter(x=>x.status==='answered'||x.status==='resolved')
    return items
  },[search,subject,region,status])

  return (<InnerLayout>
    <header className="flex items-center justify-between pb-[22px] mb-5 flex-wrap gap-3 relative" style={{borderBottom:'1.5px solid rgba(180,160,130,0.25)'}}>
      <div>
        <h1 className="text-[22px] font-semibold tracking-[0.03em] text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>📚 教学问答</h1>
        <p className="text-[12px] mt-0.5 tracking-[0.06em]" style={{color:'var(--faded)'}}>教学难题求助 · 经验教师解答 · 按学科/地区分类</p>
      </div>
      <button className="picture-book-btn primary" style={{fontSize:12}}>✏️ 我要提问</button>
    </header>

    {/* 搜索 + 筛选 */}
    <div className="space-y-3 mb-5">
      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{color:'var(--faded)',opacity:0.5}}/>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="搜索问题、标签…" className="w-full pl-10 pr-4 py-2.5 rounded-xl text-[13px] outline-none"
          style={{border:'1.5px solid rgba(180,150,120,0.25)',background:'var(--surface)',color:'var(--ink)',fontFamily:'inherit'}}/>
      </div>
      <div className="flex gap-2 flex-wrap items-center">
        {/* 学科标签 */}
        <div className="flex gap-1.5 flex-wrap">
          {[{k:'all',e:'📋',l:'全部'} as any,...Object.entries(SUBJECT_LABELS).map(([k,l])=>({k,e:SUBJECT_EMOJIS[k as QuestionSubject],l}))].map((s:any)=>(
            <button key={s.k} onClick={()=>setSubject(s.k)}
              className="px-2.5 py-1 rounded-full text-[10px] border-none cursor-pointer transition-all"
              style={{
                background: subject===s.k?'linear-gradient(135deg,rgba(200,160,120,0.2),rgba(180,140,100,0.1))':'transparent',
                border: `1.5px solid ${subject===s.k?'rgba(180,140,100,0.4)':'rgba(200,180,160,0.2)'}`,
                color: subject===s.k?'var(--ink)':'var(--faded)',
                fontWeight: subject===s.k?600:400,
                fontFamily:'inherit',
              }}>{s.e} {s.l}</button>
          ))}
        </div>
        <span className="w-px h-4 mx-1" style={{background:'rgba(200,180,160,0.2)'}}/>
        {/* 地区 */}
        <select value={region} onChange={e=>setRegion(e.target.value)} className="px-3 py-1.5 rounded-full text-[10px] outline-none cursor-pointer"
          style={{border:'1.5px solid rgba(200,180,160,0.2)',background:'var(--surface)',color:'var(--ink)',fontFamily:'inherit'}}>
          {REGIONS.map(r=><option key={r} value={r}>{r==='全部'?'🌏 全部地区':r}</option>)}
        </select>
        {/* 状态 */}
        <select value={status} onChange={e=>setStatus(e.target.value)} className="px-3 py-1.5 rounded-full text-[10px] outline-none cursor-pointer"
          style={{border:'1.5px solid rgba(200,180,160,0.2)',background:'var(--surface)',color:'var(--ink)',fontFamily:'inherit'}}>
          <option value="all">全部状态</option><option value="open">🟡 待回答</option><option value="answered">🟢 已回答</option>
        </select>
        <span className="text-[10px] ml-auto" style={{color:'var(--faded)'}}>{filtered.length} 个问题</span>
      </div>
    </div>

    {/* 问题列表 */}
    <div className="space-y-4">
      {filtered.map(q=>{
        const expanded = expandedId === q.id
        return (
          <div key={q.id} className="picture-book-card p-5 cursor-pointer transition-all duration-300"
            style={{transform:'rotate(-0.1deg)',...(expanded?{borderColor:'rgba(160,130,100,0.5)',boxShadow:'var(--shadow-md)'}:{})}}
            onClick={()=>setExpandedId(expanded?null:q.id)}>
            {/* 问题头部 */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                style={{background:'rgba(200,160,120,0.1)',color:'var(--ink-soft)',border:'1.5px solid rgba(200,160,120,0.12)'}}>{q.author.avatar}</div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[15px] font-semibold text-[var(--ink)] mb-2 flex items-start gap-2" style={{fontFamily:'var(--font-serif)'}}>
                  {q.title}
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full flex-shrink-0 mt-0.5" style={{
                    background:q.status==='answered'||q.status==='resolved'?'rgba(122,180,90,0.1)':'rgba(240,180,60,0.1)',
                    color:q.status==='answered'||q.status==='resolved'?'#5a8a3a':'#b08030',
                    border:`1px solid ${q.status==='answered'||q.status==='resolved'?'rgba(122,180,90,0.2)':'rgba(240,180,60,0.2)'}`,
                  }}>{q.status==='answered'?'已回答':q.status==='resolved'?'已解决':'待回答'}</span>
                </h3>
                <p className={`text-[12px] leading-relaxed ${expanded?'':'line-clamp-2'}`} style={{color:'var(--ink-soft)'}}>{q.content}</p>
                {/* 标签行 */}
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className="text-[10px] px-2 py-0.5 rounded-full" style={{background:'rgba(200,160,120,0.08)',color:'var(--ink-soft)',border:'1px solid rgba(200,160,120,0.15)'}}>{SUBJECT_EMOJIS[q.subject]} {SUBJECT_LABELS[q.subject]}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full" style={{background:'rgba(160,180,200,0.08)',color:'var(--ink-soft)',border:'1px solid rgba(160,180,200,0.15)'}}>{q.gradeRange}</span>
                  {q.tags.slice(0,3).map(t=><span key={t} className="text-[9px]" style={{color:'var(--faded)'}}>#{t}</span>)}
                </div>
                <div className="flex items-center gap-4 mt-2.5 text-[10px]" style={{color:'var(--faded)'}}>
                  <span className="flex items-center gap-1"><User size={10}/> {q.author.name}{q.author.verified&&<span className="text-[8px] text-green-600 ml-0.5">✓</span>}</span>
                  <span className="flex items-center gap-1"><MessageCircle size={10}/> {q.answers.length} 回答</span>
                  <span>{q.views} 浏览</span>
                  <span>{q.createdAt}</span>
                </div>
              </div>
            </div>

            {/* 答案区 — 展开时显示 */}
            {expanded && q.answers.length > 0 && (
              <div className="mt-4 pt-4 space-y-3" style={{borderTop:'1px solid rgba(200,180,160,0.12)'}}>
                {q.answers.map(a=>(
                  <div key={a.id} className="p-4 rounded-lg" style={{
                    background: a.isAccepted?'rgba(200,230,180,0.15)':'rgba(245,240,230,0.3)',
                    border:`1px solid ${a.isAccepted?'rgba(140,200,120,0.3)':'rgba(200,180,160,0.1)'}`,
                  }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm">{a.author.avatar}</span>
                      <span className="text-[11px] font-semibold text-[var(--ink)]">{a.author.name}</span>
                      {a.author.verified&&<span className="text-[8px] text-green-600">✓ {a.author.badge}</span>}
                      {a.isAccepted&&<span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{background:'rgba(122,180,90,0.15)',color:'#5a8a3a',border:'1px solid rgba(122,180,90,0.25)'}}><CheckCircle size={10}/> 最佳答案</span>}
                    </div>
                    <p className="text-[13px] leading-[1.9]" style={{color:'var(--ink-soft)'}}>{a.content}</p>
                    <div className="flex items-center gap-3 mt-2 text-[9px]" style={{color:'var(--faded)'}}>
                      <span className="flex items-center gap-1"><ThumbsUp size={10}/> {a.likes}</span>
                      <span>{a.createdAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {expanded && (
              <div className="mt-3 pt-3 flex gap-2" style={{borderTop:'1px solid rgba(200,180,160,0.1)'}}>
                <textarea placeholder="写下你的回答…" rows={2} className="flex-1 p-3 rounded-lg text-[12px] outline-none resize-none"
                  style={{border:'1.5px solid rgba(200,180,160,0.25)',background:'var(--surface)',color:'var(--ink)',fontFamily:'inherit'}}/>
                <button className="picture-book-btn primary self-end" style={{fontSize:11,padding:'8px 16px'}}>发布回答</button>
              </div>
            )}
          </div>
        )
      })}
      {filtered.length===0&&(
        <div className="text-center py-12" style={{color:'var(--faded)'}}>
          <p className="text-4xl mb-3 opacity-30">🔍</p>
          <p className="handwriting text-[15px]">没有找到匹配的问题</p>
        </div>
      )}
    </div>
  </InnerLayout>)
}
