'use client'

import InnerLayout from '@/components/layout/InnerLayout'
import { STORIES, AUTHORS } from '@/lib/community-data'
import { useState } from 'react'
import { Heart, MessageCircle, MapPin, Clock, Eye, Share2, ChevronDown, ChevronUp } from 'lucide-react'

export default function StoriesPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [liked, setLiked] = useState<Set<string>>(new Set())

  return (<InnerLayout>
    <header className="relative mb-6 rounded-2xl overflow-hidden" style={{
      background:'linear-gradient(135deg,rgba(200,180,140,0.1),rgba(180,160,120,0.06))',
      border:'1.5px solid rgba(200,160,120,0.18)',padding:'24px 30px',
    }}>
      <h1 className="text-[24px] font-bold tracking-[0.03em] text-[var(--ink)] mb-1" style={{fontFamily:'var(--font-serif)'}}>📸 支教故事</h1>
      <p className="text-[13px]" style={{color:'var(--faded)'}}>{STORIES.length} 篇温暖记录 · 课堂瞬间 · 成长故事 · 感动时刻</p>
    </header>

    {/* 故事列表 — 每篇一个杂志跨页 */}
    <div className="space-y-6">
      {STORIES.map((s, idx) => {
        const expanded = expandedId === s.id
        const isLiked = liked.has(s.id)
        const hasPhoto = s.images.length > 0 && s.images[0].startsWith('/')
        const authorName = typeof s.author === 'object' ? s.author.name : ''

        return (<article key={s.id} className="picture-book-card overflow-hidden" style={{transform:`rotate(${idx%2===0?'-0.15deg':'0.1deg'})`}}>
          {/* 图片区 — 全宽展示 */}
          <div className="relative" style={{background:'linear-gradient(180deg,rgba(245,238,220,0.6),rgba(240,230,215,0.3))'}}>
            {hasPhoto ? (
              <div className="relative" style={{maxHeight:'420px',overflow:'hidden'}}>
                <img src={s.images[0]} alt={s.title} className="w-full object-cover" style={{maxHeight:'420px'}}/>
                {/* 底部渐变遮罩 */}
                <div className="absolute bottom-0 left-0 right-0 h-24" style={{background:'linear-gradient(0deg,rgba(255,252,247,0.8),transparent)'}}/>
              </div>
            ) : (
              <div className="flex items-center justify-center py-16 text-[56px] opacity-30">{s.images[0] || '📸'}</div>
            )}

            {/* 标题浮在图上 */}
            <div className={`px-6 ${hasPhoto?'-mt-16':'pt-4'} relative z-10 pb-4`}>
              <h2 className="text-[20px] font-bold text-[var(--ink)] leading-snug" style={{fontFamily:'var(--font-serif)'}}>{s.title}</h2>
              <div className="flex items-center gap-3 mt-2 text-[11px] flex-wrap" style={{color:'var(--faded)'}}>
                <span className="flex items-center gap-1"><MapPin size={11}/> {s.location}</span>
                <span className="flex items-center gap-1"><Clock size={11}/> {s.createdAt}</span>
                <span className="font-medium text-[var(--ink-soft)]">{s.teamName}</span>
              </div>
            </div>
          </div>

          {/* 正文 */}
          <div className="px-6 pb-4">
            <div className={`text-[14px] leading-[2.2] text-[var(--ink-soft)] ${expanded?'':'line-clamp-6'}`}>
              {s.content.split('\n').map((p,i)=><p key={i} className="mb-2" style={{textIndent:i>0?'2em':0}}>{p}</p>)}
            </div>

            <div className="flex items-center justify-between mt-3">
              <button onClick={()=>setExpandedId(expanded?s.id:null)}
                className="text-[12px] bg-transparent border-none cursor-pointer handwriting flex items-center gap-1"
                style={{color:'var(--primary-skin)',fontFamily:'inherit'}}>
                {expanded?'收起阅读':`继续阅读全文（${Math.ceil(s.content.length/500)} 分钟）`}
                {expanded?<ChevronUp size={14}/>:<ChevronDown size={14}/>}
              </button>
              <div className="flex items-center gap-1 flex-wrap">
                {s.tags.map(t=><span key={t} className="text-[9px] px-2 py-0.5 rounded-full"
                  style={{background:'rgba(200,180,160,0.06)',color:'var(--faded)',border:'1px solid rgba(200,180,160,0.12)'}}>#{t}</span>)}
              </div>
            </div>

            {/* 底部互动栏 */}
            <div className="flex items-center justify-between mt-4 pt-4" style={{borderTop:'1px solid rgba(200,180,160,0.12)'}}>
              {/* 作者 */}
              <div className="flex items-center gap-2.5">
                {typeof s.author.avatar === 'string' && s.author.avatar.includes('/') ? (
                  <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0" style={{border:'2px solid #fff',outline:'1px solid rgba(180,150,120,0.35)',boxShadow:'0 2px 6px rgba(100,70,40,0.1)'}}>
                    <img src={s.author.avatar} alt="" className="w-full h-full object-cover"/>
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                    style={{background:'rgba(200,160,120,0.1)',color:'var(--ink-soft)',border:'2px solid #fff',outline:'1px solid rgba(180,150,120,0.3)'}}>{s.author.avatar}</div>
                )}
                <div>
                  <p className="text-[12px] font-semibold text-[var(--ink)] flex items-center gap-1">
                    {s.author.name}
                    {s.author.verified && <span className="text-[8px] px-1 py-0 rounded-full" style={{background:'rgba(74,180,74,0.1)',color:'#4a8a4a'}}>✓</span>}
                  </p>
                  <p className="text-[9px]" style={{color:'var(--faded)'}}>{s.author.badge}</p>
                </div>
              </div>

              {/* 互动按钮 */}
              <div className="flex items-center gap-4">
                <button onClick={(e)=>{e.stopPropagation();setLiked(prev=>{const n=new Set(prev);n.has(s.id)?n.delete(s.id):n.add(s.id);return n})}}
                  className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer transition-all hover:scale-105"
                  style={{color:isLiked?'#e06050':'var(--faded)',fontFamily:'inherit',fontSize:12}}>
                  <Heart size={15} fill={isLiked?'#e06050':'none'}/> {s.likes + (isLiked?1:0)}
                </button>
                <button className="flex items-center gap-1 bg-transparent border-none cursor-pointer" style={{color:'var(--faded)',fontFamily:'inherit',fontSize:12}}>
                  <MessageCircle size={14}/> {s.comments.length}
                </button>
                <button className="flex items-center gap-1 bg-transparent border-none cursor-pointer" style={{color:'var(--faded)',fontFamily:'inherit',fontSize:12}}>
                  <Share2 size={13}/>
                </button>
              </div>
            </div>

            {/* 评论区 — 展开时显示 */}
            {s.comments.length > 0 && (expanded || s.comments.length <= 2) && (
              <div className="mt-4 pt-4 space-y-3" style={{borderTop:'1px solid rgba(200,180,160,0.08)'}}>
                {s.comments.map(c=>(
                  <div key={c.id} className="flex gap-2 text-[12px]">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] flex-shrink-0"
                      style={{background:'rgba(200,160,120,0.1)',color:'var(--ink-soft)'}}>{c.author.avatar}</span>
                    <div>
                      <span className="font-semibold text-[var(--ink)]">{c.author.name} </span>
                      {c.author.verified&&<span className="text-[8px] text-green-600 mr-1">✓</span>}
                      <span className="text-[var(--ink-soft)]">{c.content}</span>
                      <span className="text-[9px] ml-2" style={{color:'var(--faded)'}}>{c.createdAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </article>)
      })}
    </div>
  </InnerLayout>)
}
