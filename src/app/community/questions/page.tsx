'use client'

import InnerLayout from '@/components/layout/InnerLayout'
import { QUESTIONS } from '@/lib/community-data'
import { SUBJECT_LABELS, SUBJECT_EMOJIS, QuestionSubject } from '@/types'
import { useState, useMemo } from 'react'
import { Search, MessageCircle, Eye, ThumbsUp, CheckCircle, Clock, User, Filter, MapPin, ChevronDown, ChevronUp } from 'lucide-react'
import AuthorBadge from '@/components/community/AuthorBadge'

const REGIONS = ['全部','西南','西北','华东','华中','华南','东北']

export default function QuestionsPage() {
  const [search, setSearch] = useState('')
  const [subject, setSubject] = useState<string>('all')
  const [region, setRegion] = useState('全部')
  const [status, setStatus] = useState<string>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [liked, setLiked] = useState<Set<string>>(new Set())
  const [answerTexts, setAnswerTexts] = useState<Record<string, string>>({})
  const [answerSubmitted, setAnswerSubmitted] = useState<Set<string>>(new Set())

  const filtered = useMemo(()=>{
    let items = QUESTIONS
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

  const totalAnswers = QUESTIONS.reduce((s,q)=>s+q.answers.length,0)

  return (<InnerLayout>
    <header className="relative mb-6 rounded-2xl overflow-hidden" style={{
      background:'linear-gradient(135deg,rgba(200,160,100,0.1),rgba(180,140,80,0.06))',
      border:'1.5px solid rgba(200,160,120,0.18)',padding:'24px 30px',
    }}>
      <h1 className="text-[24px] font-bold tracking-[0.03em] text-[var(--ink)] mb-1" style={{fontFamily:'var(--font-serif)'}}>📚 教学问答</h1>
      <p className="text-[13px]" style={{color:'var(--faded)'}}>{QUESTIONS.length} 个问题 · {totalAnswers} 条回答 · 按学科地区分类检索</p>
    </header>

    {/* 搜索 + 筛选 */}
    <div className="space-y-3 mb-6">
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{color:'var(--faded)',opacity:0.4}}/>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="搜索问题、标签或关键词…"
          className="w-full pl-11 pr-5 py-3 rounded-2xl text-[14px] outline-none transition-all"
          style={{
            border:'1.5px solid rgba(200,180,160,0.2)',
            background:'var(--surface)',
            color:'var(--ink)',
            fontFamily:'inherit',
            boxShadow:'0 1px 3px rgba(80,40,20,0.02)',
          }}
          onFocus={e=>{e.target.style.borderColor='rgba(180,140,100,0.4)';e.target.style.boxShadow='0 2px 8px rgba(80,40,20,0.04)'}}
          onBlur={e=>{e.target.style.borderColor='rgba(200,180,160,0.2)';e.target.style.boxShadow='0 1px 3px rgba(80,40,20,0.02)'}}
        />
      </div>

      <div className="flex gap-2 flex-wrap items-center">
        {/* 学科标签 */}
        <div className="flex gap-1.5 flex-wrap">
          {([{k:'all',e:'📋',l:'全部学科'} as const, ...(Object.entries(SUBJECT_LABELS) as [QuestionSubject, string][]).map(([k,l])=>({k,e:SUBJECT_EMOJIS[k],l}) as const)]).map(s=>(
            <button key={s.k} onClick={()=>setSubject(s.k)}
              className="px-3 py-1.5 rounded-full text-[11px] border-none cursor-pointer transition-all hover:-translate-y-0.5"
              style={{
                background: subject===s.k?'linear-gradient(135deg,rgba(200,160,110,0.18),rgba(180,140,90,0.1))':'var(--surface)',
                border: `1.5px solid ${subject===s.k?'rgba(180,140,100,0.35)':'rgba(200,180,160,0.18)'}`,
                color: subject===s.k?'var(--ink)':'var(--faded)',
                fontWeight: subject===s.k?600:400,
                fontFamily:'inherit',
              }}>{s.e} {s.l}</button>
          ))}
        </div>
        <span className="w-px h-5 mx-1" style={{background:'rgba(200,180,160,0.2)'}}/>
        {/* 地区 + 状态 */}
        <select value={region} onChange={e=>setRegion(e.target.value)}
          className="px-3 py-1.5 rounded-full text-[11px] outline-none cursor-pointer"
          style={{border:'1.5px solid rgba(200,180,160,0.18)',background:'var(--surface)',color:'var(--ink)',fontFamily:'inherit'}}>
          {REGIONS.map(r=><option key={r} value={r}>{r==='全部'?'🌏 全部地区':r}</option>)}
        </select>
        <select value={status} onChange={e=>setStatus(e.target.value)}
          className="px-3 py-1.5 rounded-full text-[11px] outline-none cursor-pointer"
          style={{border:'1.5px solid rgba(200,180,160,0.18)',background:'var(--surface)',color:'var(--ink)',fontFamily:'inherit'}}>
          <option value="all">全部状态</option><option value="open">🟡 待回答</option><option value="answered">🟢 已回答</option>
        </select>
        <span className="text-[11px] ml-auto font-medium" style={{color:'var(--faded)'}}>{filtered.length} 个问题</span>
      </div>
    </div>

    {/* 问题列表 */}
    <div className="space-y-4">
      {filtered.map(q=>{
        const expanded = expandedId === q.id
        const isLiked = liked.has(q.id)
        const hasBest = q.answers.some(a=>a.isAccepted)

        return (<div key={q.id} role="button" tabIndex={0}
          className={`picture-book-card p-0 overflow-hidden cursor-pointer transition-all duration-300 ${expanded?'shadow-md':''}`}
          style={{...(expanded?{borderColor:'rgba(160,130,90,0.45)'}:{})}}
          onClick={()=>setExpandedId(expanded?null:q.id)}
          onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setExpandedId(expanded?null:q.id)}}}>

          <div className="p-5">
            {/* 状态 + 学科标签 */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-[10px] px-2.5 py-1 rounded-full font-medium"
                style={{background:hasBest?'rgba(122,180,90,0.1)':'rgba(240,180,60,0.08)',color:hasBest?'#5a8a3a':'#b08030',
                  border:`1px solid ${hasBest?'rgba(122,180,90,0.2)':'rgba(240,180,60,0.15)'}`}}>
                {q.status==='resolved'?<><CheckCircle size={10}/> 已解决</>:q.status==='answered'?<><CheckCircle size={10}/> 已回答</>:<><Clock size={10}/> 待回答</>}
              </span>
              <span className="text-[10px] px-2.5 py-1 rounded-full"
                style={{background:'rgba(200,160,120,0.06)',color:'var(--ink-soft)',border:'1px solid rgba(200,160,120,0.12)'}}>
                {SUBJECT_EMOJIS[q.subject]} {SUBJECT_LABELS[q.subject]}
              </span>
              <span className="text-[10px] px-2.5 py-1 rounded-full"
                style={{background:'rgba(160,180,200,0.06)',color:'var(--ink-soft)',border:'1px solid rgba(160,180,200,0.12)'}}>
                {q.gradeRange}
              </span>
            </div>

            {/* 标题 */}
            <h3 className="text-[17px] font-semibold text-[var(--ink)] mb-3 leading-snug" style={{fontFamily:'var(--font-serif)'}}>{q.title}</h3>

            {/* 摘要 */}
            <p className={`text-[13px] leading-[1.9] mb-3 ${expanded?'':'line-clamp-3'}`} style={{color:'var(--ink-soft)'}}>
              {q.content.split('\n')[0]}
            </p>

            {/* 标签 */}
            <div className="flex flex-wrap gap-1 mb-3">
              {q.tags.map(t=><span key={t} className="text-[9px] px-2 py-0.5 rounded-full"
                style={{background:'rgba(200,180,160,0.05)',color:'var(--faded)',border:'1px solid rgba(200,180,160,0.1)'}}>#{t}</span>)}
            </div>

            {/* 作者 + 互动 */}
            <div className="flex items-center justify-between text-[11px]" style={{color:'var(--faded)'}}>
              <div className="flex items-center gap-2">
                <AuthorBadge author={q.author} size="xs" />
                <span className="flex items-center gap-1"><MapPin size={10}/> {q.region}</span>
                <span>{q.createdAt}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1"><Eye size={11}/> {q.views}</span>
                <button onClick={(e)=>{e.stopPropagation();setLiked(prev=>{const n=new Set(prev);n.has(q.id)?n.delete(q.id):n.add(q.id);return n})}}
                  className="flex items-center gap-1 bg-transparent border-none cursor-pointer" style={{color:isLiked?'var(--primary-skin)':'var(--faded)',fontFamily:'inherit',fontSize:11}}>
                  <ThumbsUp size={11} fill={isLiked?'var(--primary-skin)':'none'}/> {q.likes + (isLiked?1:0)}
                </button>
                <span className="flex items-center gap-1"><MessageCircle size={11}/> {q.answers.length}</span>
              </div>
            </div>
          </div>

          {/* 答案区 — 展开 */}
          {expanded && q.answers.length>0 && (<div className="px-5 pb-5 space-y-3" style={{borderTop:'1px solid rgba(200,180,160,0.1)'}}>
            <div className="pt-4 text-[12px] font-semibold text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>
              {q.answers.length} 条回答
            </div>
            {q.answers.map(a=>(<div key={a.id} className="p-5 rounded-xl" style={{
              background: a.isAccepted?'linear-gradient(135deg,rgba(200,230,170,0.18),rgba(210,240,190,0.12))':'rgba(245,240,230,0.35)',
              border:`1.5px solid ${a.isAccepted?'rgba(140,200,120,0.3)':'rgba(200,180,160,0.12)'}`,
            }}>
              {/* 回答者 */}
              <div className="flex items-center gap-2.5 mb-3">
                <AuthorBadge author={a.author} size="sm" />
                <div className="flex items-center gap-2 ml-auto">
                  {a.isAccepted&&<span className="text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1"
                    style={{background:'rgba(122,180,90,0.12)',color:'#5a8a3a',border:'1px solid rgba(122,180,90,0.25)'}}>
                    <CheckCircle size={10}/> 最佳答案</span>}
                  <span className="text-[10px]" style={{color:'var(--faded)'}}><ThumbsUp size={10}/> {a.likes}</span>
                </div>
              </div>
              {/* 回答内容 */}
              <div className="text-[13px] leading-[2.1]" style={{color:'var(--ink-soft)'}}>
                {a.content.split('\n').map((p,i)=><p key={i} className="mb-2">{p}</p>)}
              </div>
            </div>))}
          </div>)}

          {/* 空答案提示 */}
          {expanded && q.answers.length===0 && !answerSubmitted.has(q.id) && (<div className="px-5 pb-5 pt-4" style={{borderTop:'1px solid rgba(200,180,160,0.1)'}}>
            <p className="text-[12px] handwriting text-center" style={{color:'var(--faded)'}}>还没有人回答这个问题，期待你的帮助 ✨</p>
            <textarea placeholder="写下你的回答…" rows={3}
              value={answerTexts[q.id] || ''}
              onChange={e => setAnswerTexts(prev => ({...prev, [q.id]: e.target.value}))}
              className="w-full mt-3 p-4 rounded-xl text-[13px] outline-none resize-none"
              style={{border:'1.5px solid rgba(200,180,160,0.2)',background:'var(--surface)',color:'var(--ink)',fontFamily:'inherit'}}/>
            <div className="flex justify-end mt-2">
              <button
                disabled={!answerTexts[q.id]?.trim()}
                className="picture-book-btn primary"
                style={{fontSize:12, opacity: answerTexts[q.id]?.trim() ? 1 : 0.5}}
                onClick={(e) => {
                  e.stopPropagation()
                  if (!answerTexts[q.id]?.trim()) return
                  setAnswerSubmitted(prev => new Set(prev).add(q.id))
                }}>发布回答</button>
            </div>
          </div>)}
          {answerSubmitted.has(q.id) && (
            <div className="px-5 pb-5 pt-4 text-center" style={{borderTop:'1px solid rgba(200,180,160,0.1)'}}>
              <p className="text-[13px] text-green-600 handwriting">✅ 回答已发布！感谢你的帮助</p>
            </div>
          )}
        </div>)
      })}

      {filtered.length===0&&(
        <div className="text-center py-16" style={{color:'var(--faded)'}}>
          <p className="text-5xl mb-3 opacity-25">🔍</p>
          <p className="handwriting text-[16px]">没有找到匹配的问题</p>
          <p className="text-[12px] mt-1 opacity-60">试试其他关键词或筛选条件</p>
        </div>
      )}
    </div>
  </InnerLayout>)
}
