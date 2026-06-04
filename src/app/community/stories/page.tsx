'use client'

import InnerLayout from '@/components/layout/InnerLayout'
import { STORIES } from '@/lib/community-data'
import { useState, useMemo } from 'react'
import { Heart, MessageCircle, MapPin, Clock, Eye, Share2, Search, TrendingUp, Flame, ChevronDown, ChevronUp, Filter } from 'lucide-react'

export default function StoriesPage() {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'latest'|'hot'>('latest')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [liked, setLiked] = useState<Set<string>>(new Set())

  const filtered = useMemo(()=>{
    let items = [...STORIES]
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      items = items.filter(s=>s.title.toLowerCase().includes(q)||s.content.toLowerCase().includes(q)||s.tags.some(t=>t.includes(q))||s.location.includes(q))
    }
    if (sortBy==='hot') items.sort((a,b)=>b.likes-a.likes)
    else items.sort((a,b)=>b.createdAt.localeCompare(a.createdAt))
    return items
  },[search,sortBy])

  const topLiked = [...STORIES].sort((a,b)=>b.likes-a.likes).slice(0,5)
  const totalLikes = STORIES.reduce((s,x)=>s+x.likes,0)
  const totalComments = STORIES.reduce((s,x)=>s+x.comments.length,0)
  const locations = [...new Set(STORIES.map(s=>s.location))]

  return (<InnerLayout>
    <header className="relative mb-6 rounded-2xl overflow-hidden" style={{background:'linear-gradient(135deg,rgba(200,180,140,0.1),rgba(180,160,120,0.06))',border:'1.5px solid rgba(200,160,120,0.18)',padding:'24px 30px'}}>
      <h1 className="text-[24px] font-bold tracking-[0.03em] text-[var(--ink)] mb-1" style={{fontFamily:'var(--font-serif)'}}>📸 支教故事</h1>
      <p className="text-[13px]" style={{color:'var(--faded)'}}>{STORIES.length} 篇温暖记录 · {locations.length} 个支教地 · ❤️ {totalLikes} 个赞 · 💬 {totalComments} 条评论</p>
    </header>

    <div className="grid grid-cols-[1fr_320px] gap-6 max-lg:grid-cols-1">
      {/* ═══ 左：故事列表 ═══ */}
      <div>
        {/* 搜索 + 排序 */}
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{color:'var(--faded)',opacity:0.4}}/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="搜索故事、地点或标签…"
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-[13px] outline-none"
              style={{border:'1.5px solid rgba(200,180,160,0.2)',background:'var(--surface)',color:'var(--ink)',fontFamily:'inherit'}}/>
          </div>
          <div className="flex gap-1">
            {[{k:'latest',l:'最新'},{k:'hot',l:'最热'}].map(t=>{
              const isActive = sortBy===t.k
              return (<button key={t.k} onClick={()=>setSortBy(t.k as 'latest'|'hot')}
                className="px-4 py-1.5 rounded-full text-[11px] border-none cursor-pointer transition-all"
                style={{background:isActive?'linear-gradient(135deg,#9b7a4a,#7a5a3a)':'var(--surface)',color:isActive?'#fff':'var(--faded)',fontWeight:isActive?600:400,fontFamily:'inherit',border:`1.5px solid ${isActive?'transparent':'rgba(200,180,160,0.18)'}`}}>
                {t.k==='hot'?<span><Flame size={11}/> {t.l}</span>:t.l}
              </button>)
            })}
          </div>
        </div>

        {/* 故事列表 */}
        <div className="space-y-5">
          {filtered.map((s,idx)=>{
            const expanded=expandedId===s.id, isLiked=liked.has(s.id)
            const hasPhoto=s.images.length>0&&s.images[0].startsWith('/')
            return (<article key={s.id} className="picture-book-card overflow-hidden hover:shadow-md transition-all duration-300"
              style={{transform:`rotate(${idx%2===0?'-0.1deg':'0.08deg'})`}}>
              <div className="relative" style={{background:hasPhoto?'#1a1510':'linear-gradient(180deg,rgba(245,238,220,0.6),rgba(240,230,215,0.3))'}}>
                {hasPhoto?<>
                  <div className="relative" style={{maxHeight:'400px',overflow:'hidden'}}>
                    <img src={s.images[0]} alt={s.title} className="w-full object-cover" style={{maxHeight:'400px'}}/>
                    <div className="absolute bottom-0 left-0 right-0 h-32" style={{background:'linear-gradient(0deg,rgba(30,20,10,0.7),transparent)'}}/>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-10">
                    <h2 className="text-[20px] font-bold leading-snug mb-2 drop-shadow-lg" style={{fontFamily:'var(--font-serif)'}}>{s.title}</h2>
                    <div className="flex items-center gap-3 text-[11px] text-white/80 flex-wrap">
                      <span className="flex items-center gap-1"><MapPin size={11}/>{s.location}</span>
                      <span className="flex items-center gap-1"><Clock size={11}/>{s.createdAt}</span>
                      <span>{s.teamName}</span>
                    </div>
                  </div>
                </>:<>
                  <div className="p-5">
                    <h2 className="text-[20px] font-bold text-[var(--ink)] leading-snug mb-2" style={{fontFamily:'var(--font-serif)'}}>{s.title}</h2>
                    <div className="flex items-center gap-3 text-[11px]" style={{color:'var(--faded)'}}>
                      <span className="flex items-center gap-1"><MapPin size={11}/>{s.location}</span>
                      <span>{s.createdAt}</span>
                      <span className="font-medium text-[var(--ink-soft)]">{s.teamName}</span>
                    </div>
                  </div>
                </>}
              </div>

              <div className="px-5 pb-4">
                <div className={`text-[13px] leading-[2.1] mt-3 text-[var(--ink-soft)] ${expanded?'':'line-clamp-4'}`}>
                  {s.content.split('\n').map((p,i)=><p key={i} className="mb-2" style={{textIndent:i>0?'2em':0}}>{p}</p>)}
                </div>
                <button onClick={()=>setExpandedId(expanded?null:s.id)} className="text-[11px] mt-1 bg-transparent border-none cursor-pointer handwriting flex items-center gap-1" style={{color:'var(--primary-skin)',fontFamily:'inherit'}}>
                  {expanded?<>收起 <ChevronUp size={13}/></>:`展开全文（约${Math.ceil(s.content.length/500)}分钟阅读）<ChevronDown size={13}/>`}</button>
                <div className="flex flex-wrap gap-1 mt-3">{s.tags.map(t=><span key={t} className="text-[9px] px-2 py-0.5 rounded-full" style={{background:'rgba(200,180,160,0.06)',color:'var(--faded)',border:'1px solid rgba(200,180,160,0.12)'}}>#{t}</span>)}</div>

                <div className="flex items-center justify-between mt-4 pt-4" style={{borderTop:'1px solid rgba(200,180,160,0.1)'}}>
                  <div className="flex items-center gap-2.5">
                    {typeof s.author.avatar==='string'&&s.author.avatar.includes('/')?(
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0" style={{border:'2px solid #fff',outline:'1px solid rgba(180,150,120,0.3)',boxShadow:'0 2px 6px rgba(100,70,40,0.08)'}}>
                        <img src={s.author.avatar} alt="" className="w-full h-full object-cover"/></div>
                    ):<span className="text-lg">{s.author.avatar}</span>}
                    <div><p className="text-[11px] font-semibold text-[var(--ink)]">{s.author.name}{s.author.verified&&<span className="text-[8px] text-green-600 ml-1">✓</span>}</p><p className="text-[9px]" style={{color:'var(--faded)'}}>{s.author.badge}</p></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={(e)=>{e.stopPropagation();setLiked(prev=>{const n=new Set(prev);n.has(s.id)?n.delete(s.id):n.add(s.id);return n})}}
                      className="flex items-center gap-1 bg-transparent border-none cursor-pointer hover:scale-105 transition-transform"
                      style={{color:isLiked?'#e06050':'var(--faded)',fontFamily:'inherit',fontSize:12}}><Heart size={14} fill={isLiked?'#e06050':'none'}/> {s.likes+(isLiked?1:0)}</button>
                    <span className="flex items-center gap-1" style={{color:'var(--faded)',fontSize:12}}><MessageCircle size={13}/> {s.comments.length}</span>
                    <button className="bg-transparent border-none cursor-pointer" style={{color:'var(--faded)'}}><Share2 size={12}/></button>
                  </div>
                </div>

                {s.comments.length>0&&(expanded||s.comments.length<=2)&&(
                  <div className="mt-4 pt-4 space-y-2.5" style={{borderTop:'1px solid rgba(200,180,160,0.08)'}}>
                    {s.comments.map(c=>(<div key={c.id} className="flex gap-2 text-[11px]">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] flex-shrink-0" style={{background:'rgba(200,160,120,0.1)',color:'var(--ink-soft)'}}>{c.author.avatar}</span>
                      <div><span className="font-semibold text-[var(--ink)]">{c.author.name}</span>{c.author.verified&&<span className="text-[7px] text-green-600 ml-0.5">✓</span>}<span className="ml-1.5" style={{color:'var(--ink-soft)'}}>{c.content}</span><span className="text-[9px] ml-1.5" style={{color:'var(--faded)'}}>{c.createdAt}</span></div>
                    </div>))}
                  </div>
                )}
              </div>
            </article>)
          })}
          {filtered.length===0&&<div className="text-center py-16" style={{color:'var(--faded)'}}><p className="text-5xl mb-3 opacity-25">🔍</p><p className="handwriting text-[15px]">没有找到匹配的故事</p></div>}
        </div>
      </div>

      {/* ═══ 右栏 ═══ */}
      <div className="space-y-4 max-lg:hidden">
        {/* 热门榜 */}
        <div className="picture-book-card p-4 sticky top-24" style={{transform:'rotate(0.05deg)'}}>
          <h3 className="text-[14px] font-semibold mb-4 text-[var(--ink)] flex items-center gap-1.5" style={{fontFamily:'var(--font-serif)'}}><Flame size={14} style={{color:'#e08050'}}/> 故事热榜</h3>
          {topLiked.map((s,i)=>(<div key={s.id} className="flex gap-2.5 py-2 group cursor-pointer" style={{borderBottom:i<4?'1px solid rgba(200,180,160,0.08)':'none'}}>
            <span className="text-[20px] font-bold flex-shrink-0 w-7 text-center" style={{color:i===0?'#e08050':i===1?'#d4a040':i===2?'#b89860':'var(--faded)',fontFamily:'var(--font-serif)'}}>{i+1}</span>
            <div className="min-w-0">
              <p className="text-[12px] leading-snug line-clamp-2 font-medium" style={{color:'var(--ink-soft)'}}>{s.title}</p>
              <p className="text-[9px] mt-0.5 flex items-center gap-2" style={{color:'var(--faded)'}}><span>❤️ {s.likes}</span><span>💬 {s.comments.length}</span><span>{s.location}</span></p>
            </div>
          </div>))}

          {/* 作者榜单 */}
          <h3 className="text-[13px] font-semibold mt-5 mb-3 text-[var(--ink)] flex items-center gap-1.5" style={{fontFamily:'var(--font-serif)'}}><TrendingUp size={13} style={{color:'#6baed6'}}/> 活跃支教队</h3>
          {[...new Set(STORIES.map(s=>s.teamName))].slice(0,6).map((tn,i)=>(<div key={tn} className="flex items-center justify-between py-1.5 text-[11px]" style={{borderBottom:i<4?'1px solid rgba(200,180,160,0.06)':'none'}}>
            <span className="font-medium text-[var(--ink-soft)]">{tn}</span>
            <span className="text-[9px]" style={{color:'var(--faded)'}}>{STORIES.filter(s=>s.teamName===tn).length} 篇故事</span>
          </div>))}

          {/* 地区标签 */}
          <h3 className="text-[12px] font-semibold mt-5 mb-2 text-[var(--ink)] flex items-center gap-1.5" style={{fontFamily:'var(--font-serif)'}}>🗺️ 支教地区</h3>
          <div className="flex flex-wrap gap-1">{locations.map(l=>(<span key={l} className="text-[9px] px-2 py-0.5 rounded-full" style={{background:'rgba(200,180,160,0.06)',color:'var(--faded)',border:'1px solid rgba(200,180,160,0.12)'}}>{l}</span>))}</div>
        </div>
      </div>
    </div>
  </InnerLayout>)}
