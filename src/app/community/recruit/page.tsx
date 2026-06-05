'use client'

import InnerLayout from '@/components/layout/InnerLayout'
import { RECRUITS, OFFICIAL_ACCOUNTS } from '@/lib/community-data'
import { RECRUIT_LABELS, RECRUIT_EMOJIS, RecruitmentType, CommunityRecruit } from '@/types'
import { useState } from 'react'
import { MapPin, Clock, Eye, Phone, Mail, Calendar, X } from 'lucide-react'

export default function RecruitPage() {
  const [tab, setTab] = useState<RecruitmentType | 'all'>('all')
  const [showPublish, setShowPublish] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  const filtered = tab==='all' ? RECRUITS : RECRUITS.filter(r=>r.type===tab)

  return (<InnerLayout>
    <header className="flex items-center justify-between pb-[22px] mb-5 flex-wrap gap-3 relative" style={{borderBottom:'1.5px solid rgba(180,160,130,0.25)'}}>
      <div>
        <h1 className="text-[22px] font-semibold tracking-[0.03em] text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>🌟 招募广场</h1>
        <p className="text-[12px] mt-0.5 tracking-[0.06em]" style={{color:'var(--faded)'}}>支教队招新 · 志愿者自荐 · 支教地需求 · 物资互助</p>
      </div>
      <button className="picture-book-btn primary" style={{fontSize:12}} onClick={()=>setShowPublish(true)}>✏️ 发布信息</button>
    </header>

    {/* 发布弹窗 */}
    {showPublish && <RecruitPublishForm onClose={()=>setShowPublish(false)}/>}
    {successMsg && <div className="mb-4 p-3 rounded-lg text-center text-[12px] font-medium" style={{background:'rgba(122,180,90,0.1)',color:'#5a8a3a',border:'1px solid rgba(122,180,90,0.2)'}}>{successMsg}</div>}

    {/* Tab 切换 */}
    <div className="flex gap-2 mb-5 flex-wrap">
      {([{k:'all',e:'📋',l:'全部'} as const, ...(Object.entries(RECRUIT_LABELS) as [RecruitmentType, string][]).map(([k,l])=>({k,e:RECRUIT_EMOJIS[k],l}) as const)]).map(t=>(
        <button key={t.k} onClick={()=>setTab(t.k)}
          className="px-3 py-1.5 rounded-full text-[11px] border-none cursor-pointer transition-all"
          style={{
            background: tab===t.k?'linear-gradient(135deg,rgba(200,160,120,0.2),rgba(180,140,100,0.1))':'transparent',
            border: `1.5px solid ${tab===t.k?'rgba(180,140,100,0.4)':'rgba(200,180,160,0.2)'}`,
            color: tab===t.k?'var(--ink)':'var(--faded)',fontWeight: tab===t.k?600:400,fontFamily:'inherit',
          }}>{t.e} {t.l}</button>
      ))}
      <span className="text-[10px] ml-auto self-center" style={{color:'var(--faded)'}}>{filtered.length} 条信息</span>
    </div>

    {/* 招募卡片列表 */}
    <div className="space-y-4">
      {filtered.map(r=>(
        <RecruitCard key={r.id} recruit={r}/>
      ))}
    </div>
  </InnerLayout>)
}

function RecruitPublishForm({onClose}:{onClose:()=>void}) {
  const [title,setTitle]=useState('')
  const [content,setContent]=useState('')
  const [success,setSuccess]=useState(false)
  const submit = () => {
    if(!title.trim()) return
    setSuccess(true)
    setTimeout(()=>onClose(),2000)
  }
  if (success) return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/20"/>
      <div className="relative picture-book-card p-8 text-center" onClick={e=>e.stopPropagation()}>
        <div className="text-4xl mb-3">✅</div>
        <p className="text-[15px] font-bold text-green-600 mb-1">发布成功！</p>
        <p className="text-[11px]" style={{color:'var(--faded)'}}>你的信息已提交审核，通过后将在招募广场展示</p>
      </div>
    </div>
  )
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/20"/>
      <div className="relative picture-book-card p-6 w-[440px] max-h-[80vh] overflow-y-auto" onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-bold text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>✏️ 发布招募/需求</h3>
          <button onClick={onClose} className="bg-transparent border-none cursor-pointer" style={{color:'var(--faded)'}}><X size={16}/></button>
        </div>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="标题（必填）" className="w-full px-4 py-2.5 rounded-xl text-[13px] outline-none mb-3" style={{border:'1.5px solid rgba(200,180,160,0.25)',background:'var(--surface)',color:'var(--ink)',fontFamily:'inherit'}}/>
        <textarea value={content} onChange={e=>setContent(e.target.value)} rows={5} placeholder="详细描述…" className="w-full p-4 rounded-xl text-[13px] outline-none resize-none mb-3" style={{border:'1.5px solid rgba(200,180,160,0.25)',background:'var(--surface)',color:'var(--ink)',fontFamily:'inherit'}}/>
        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="picture-book-btn" style={{fontSize:11}}>取消</button>
          <button onClick={submit} disabled={!title.trim()} className="picture-book-btn primary" style={{fontSize:11,opacity:title.trim()?1:0.5}}>提交发布</button>
        </div>
      </div>
    </div>
  )
}

function RecruitCard({recruit:r}:{recruit:CommunityRecruit}) {
  const [expanded, setExpanded] = useState(false)
  const icon = RECRUIT_EMOJIS[r.type]
  const label = RECRUIT_LABELS[r.type]

  return (
    <div className="picture-book-card p-5 cursor-pointer transition-all duration-300" role="button" tabIndex={0}
      style={{transform:'rotate(-0.08deg)',...(expanded?{borderColor:'rgba(160,130,100,0.5)',boxShadow:'var(--shadow-md)'}:{})}}
      onClick={()=>setExpanded(!expanded)}
      onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setExpanded(!expanded)}}}>
      <div className="flex items-start gap-3">
        {/* 类型标识 */}
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
          style={{background:r.type==='team_recruit'?'rgba(200,134,46,0.08)':r.type==='volunteer_wanted'?'rgba(212,133,94,0.08)':r.type==='material_request'?'rgba(107,174,214,0.08)':'rgba(122,154,90,0.08)',
            border:`1.5px solid ${r.type==='team_recruit'?'rgba(200,134,46,0.2)':r.type==='volunteer_wanted'?'rgba(212,133,94,0.2)':r.type==='material_request'?'rgba(107,174,214,0.2)':'rgba(122,154,90,0.2)'}`}}>{icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-[10px] px-2 py-0.5 rounded-full" style={{
              background:r.type==='team_recruit'?'rgba(200,134,46,0.08)':'rgba(212,133,94,0.06)',
              color:r.type==='team_recruit'?'#a07030':'#c07040',border:`1px solid ${r.type==='team_recruit'?'rgba(200,134,46,0.2)':'rgba(212,133,94,0.15)'}`}}>{label}</span>
            {r.status==='closed'&&<span className="text-[9px] px-1.5 py-0.5 rounded-full bg-zinc-100 text-zinc-500 border border-zinc-200">已结束</span>}
          </div>
          <h3 className="text-[15px] font-semibold text-[var(--ink)] mb-1.5" style={{fontFamily:'var(--font-serif)'}}>{r.title}</h3>
          <p className={`text-[12px] leading-relaxed ${expanded?'':'line-clamp-2'}`} style={{color:'var(--ink-soft)'}}>{r.content}</p>

          <div className="flex items-center gap-3 mt-2.5 flex-wrap text-[10px]" style={{color:'var(--faded)'}}>
            <span className="flex items-center gap-1"><MapPin size={10}/> {r.region}</span>
            {r.deadline&&<span className="flex items-center gap-1"><Calendar size={10}/> {r.deadline}截止</span>}
            <span className="flex items-center gap-1"><Eye size={10}/> {r.views}</span>
            <span>{r.createdAt}</span>
          </div>

          {/* 发布者 */}
          <div className="flex items-center gap-1.5 mt-2 text-[10px]">
            <span>{r.author.avatar}</span>
            <span style={{color:'var(--ink-soft)'}}>{r.author.name}</span>
            {r.author.verified&&<span className="text-[8px] px-1 py-0 rounded-full" style={{background:'rgba(74,180,74,0.12)',color:'#4a8a4a'}}>✓</span>}
            <span style={{color:'var(--faded)'}}>{r.author.badge}</span>
          </div>

          {r.tags.length>0&&(
            <div className="flex flex-wrap gap-1 mt-2">
              {r.tags.map(t=><span key={t} className="text-[9px] px-2 py-0.5 rounded-full" style={{background:'rgba(200,180,160,0.06)',color:'var(--faded)',border:'1px solid rgba(200,180,160,0.12)'}}>#{t}</span>)}
            </div>
          )}

          {/* 联系方式 — 展开时 */}
          {expanded && r.contact && (
            <div className="mt-3 p-3 rounded-lg flex items-center gap-2 text-[12px]" style={{background:'rgba(245,238,220,0.4)',border:'1px solid rgba(200,180,160,0.15)'}}>
              <Mail size={13} style={{color:'var(--faded)'}}/>
              <span style={{color:'var(--ink-soft)'}}>{r.contact}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
