'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { COMMUNITY_RESOURCES } from '@/lib/community-resources'
import { RESOURCE_CATEGORIES, GRADE_LABELS, ResourceCategory } from '@/types'
import { useState, useMemo } from 'react'
import { Search, Download, Star, MapPin, TrendingUp, FileText, Award, Eye, Heart } from 'lucide-react'
import AuthorBadge from '@/components/community/AuthorBadge'

export default function ResourcesPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'downloads'|'rating'|'latest'>('downloads')

  const filtered = useMemo(() => {
    let items = [...COMMUNITY_RESOURCES]
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      items = items.filter(r => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q) || r.tags.some(t => t.includes(q)) || r.subject.includes(q))
    }
    if (category !== 'all') items = items.filter(r => r.category === category)
    if (sortBy === 'downloads') items.sort((a,b) => b.downloads - a.downloads)
    else if (sortBy === 'rating') items.sort((a,b) => b.rating - a.rating)
    else items.sort((a,b) => b.createdAt.localeCompare(a.createdAt))
    return items
  }, [search, category, sortBy])

  const featured = COMMUNITY_RESOURCES.filter(r => r.featured)
  const totalDownloads = COMMUNITY_RESOURCES.reduce((s,r) => s + r.downloads, 0)
  const catKeys = Object.keys(RESOURCE_CATEGORIES) as ResourceCategory[]

  return (
    <InnerLayout>
      <header className="relative mb-6 rounded-2xl overflow-hidden" style={{
        background:'linear-gradient(135deg,rgba(122,154,90,0.1),rgba(100,140,70,0.06))',
        border:'1.5px solid rgba(122,154,90,0.18)',padding:'24px 30px',
      }}>
        <h1 className="text-[24px] font-bold tracking-[0.03em] text-[var(--ink)] mb-1" style={{fontFamily:'var(--font-serif)'}}>📦 资源广场</h1>
        <p className="text-[13px]" style={{color:'var(--faded)'}}>{COMMUNITY_RESOURCES.length} 份精选资源 · {totalDownloads.toLocaleString()} 次下载 · 6 支支教队共建共享</p>
      </header>

      {/* 搜索 + 排序 */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{color:'var(--faded)',opacity:0.4}}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="搜索资源名称、科目或标签..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-[13px] outline-none"
            style={{border:'1.5px solid rgba(200,180,160,0.2)',background:'var(--surface)',color:'var(--ink)',fontFamily:'inherit'}}/>
        </div>
        <div className="flex gap-1">
          {[{k:'downloads',l:'最多下载'},{k:'rating',l:'最高评分'},{k:'latest',l:'最新上传'}].map(t=>(
            <button key={t.k} onClick={()=>setSortBy(t.k as any)}
              className="px-3 py-1.5 rounded-full text-[11px] border-none cursor-pointer transition-all"
              style={{
                background:sortBy===t.k?'linear-gradient(135deg,#7a9a5a,#5a7a3a)':'var(--surface)',
                color:sortBy===t.k?'#fff':'var(--faded)',fontWeight:sortBy===t.k?600:400,
                fontFamily:'inherit',border:`1.5px solid ${sortBy===t.k?'transparent':'rgba(200,180,160,0.18)'}`,
              }}>{t.l}</button>
          ))}
        </div>
      </div>

      {/* 分类筛选 */}
      <div className="flex gap-2 mb-5 flex-wrap">
        <button onClick={()=>setCategory('all')} className="px-3 py-1.5 rounded-full text-[11px] border-none cursor-pointer transition-all"
          style={{
            background:category==='all'?'linear-gradient(135deg,rgba(122,154,90,0.18),rgba(100,140,70,0.1))':'transparent',
            border:`1.5px solid ${category==='all'?'rgba(122,154,90,0.3)':'rgba(200,180,160,0.18)'}`,
            color:category==='all'?'var(--ink)':'var(--faded)',fontWeight:category==='all'?600:400,fontFamily:'inherit',
          }}>📋 全部</button>
        {catKeys.map(k=>{
          const cfg=RESOURCE_CATEGORIES[k]
          return <button key={k} onClick={()=>setCategory(k)} className="px-3 py-1.5 rounded-full text-[11px] border-none cursor-pointer transition-all"
            style={{
              background:category===k?'linear-gradient(135deg,rgba(122,154,90,0.18),rgba(100,140,70,0.1))':'transparent',
              border:`1.5px solid ${category===k?'rgba(122,154,90,0.3)':'rgba(200,180,160,0.18)'}`,
              color:category===k?'var(--ink)':'var(--faded)',fontWeight:category===k?600:400,fontFamily:'inherit',
            }}>{cfg.emoji} {cfg.label}</button>
        })}
      </div>

      {/* 精选推荐横幅 */}
      {category==='all'&&!search&&(
        <div className="mb-6 p-5 rounded-xl" style={{background:'linear-gradient(135deg,rgba(245,238,220,0.6),rgba(240,225,210,0.4))',border:'1.5px solid rgba(200,160,120,0.2)'}}>
          <h3 className="text-[13px] font-semibold mb-3 text-[var(--ink)] flex items-center gap-1.5" style={{fontFamily:'var(--font-serif)'}}>
            <Award size={14} style={{color:'#e08050'}}/> 编辑精选
          </h3>
          <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {featured.slice(0,4).map(r=>{
              const cfg=RESOURCE_CATEGORIES[r.category]
              return (
                <div key={r.id} className="picture-book-card p-4 cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{cfg.emoji}</span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full" style={{background:`${cfg.color}15`,color:cfg.color,border:`1px solid ${cfg.color}25`}}>{cfg.label}</span>
                  </div>
                  <h4 className="text-[13px] font-semibold text-[var(--ink)] mb-1 line-clamp-2" style={{fontFamily:'var(--font-serif)'}}>{r.title}</h4>
                  <p className="text-[10px] line-clamp-2 mb-2" style={{color:'var(--faded)'}}>{r.description.slice(0,60)}</p>
                  <div className="flex items-center justify-between text-[9px]" style={{color:'var(--faded)'}}>
                    <span className="flex items-center gap-1"><Download size={10}/> {r.downloads}</span>
                    <span className="flex items-center gap-1"><Star size={10} fill="#e8a040" color="#e8a040"/> {r.rating}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* 资源列表 */}
      {filtered.length===0?(
        <div className="text-center py-16" style={{color:'var(--faded)'}}>
          <p className="text-5xl mb-3 opacity-25">📭</p>
          <p className="handwriting text-[15px]">没有找到匹配的资源</p>
        </div>
      ):(
        <div className="space-y-3">
          {filtered.map(r=>{
            const cfg=RESOURCE_CATEGORIES[r.category]
            return (
              <div key={r.id} className="picture-book-card p-5 cursor-pointer hover:shadow-md transition-all duration-300"
                style={{transform:'rotate(-0.05deg)',borderLeft:`4px solid ${cfg.color}`}}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{background:`${cfg.color}12`,border:`1.5px solid ${cfg.color}25`}}>{cfg.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-[15px] font-semibold text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>{r.title}</h3>
                      {r.featured&&<span className="text-[9px] px-2 py-0.5 rounded-full" style={{background:'rgba(232,160,64,0.12)',color:'#e08050',border:'1px solid rgba(232,160,64,0.25)'}}>⭐精选</span>}
                    </div>
                    <p className="text-[12px] leading-relaxed mb-2.5 line-clamp-2" style={{color:'var(--ink-soft)'}}>{r.description}</p>
                    {/* 元信息行 */}
                    <div className="flex items-center gap-3 flex-wrap text-[10px]" style={{color:'var(--faded)'}}>
                      <span className="px-2 py-0.5 rounded-full" style={{background:`${cfg.color}10`,color:cfg.color,border:`1px solid ${cfg.color}20`}}>{cfg.label}</span>
                      <span>{GRADE_LABELS[r.grade]}</span>
                      <span>{r.subject}</span>
                      <span>{r.fileType} · {r.fileSize}</span>
                      <span className="flex items-center gap-1"><MapPin size={9}/> {r.location}</span>
                      <span>{r.teamName}</span>
                    </div>
                    {/* 标签 */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {r.tags.map(t=><span key={t} className="text-[8px] px-2 py-0.5 rounded-full" style={{background:'rgba(200,180,160,0.06)',color:'var(--faded)',border:'1px solid rgba(200,180,160,0.12)'}}>#{t}</span>)}
                    </div>
                  </div>
                  {/* 右：下载+评分 */}
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <button className="picture-book-btn primary flex items-center gap-1.5" style={{fontSize:11,padding:'6px 14px'}}>
                      <Download size={13}/>下载
                    </button>
                    <div className="flex items-center gap-1 text-[11px] font-semibold" style={{color:'#e8a040'}}>
                      <Star size={12} fill="#e8a040"/> {r.rating}
                    </div>
                    <span className="text-[9px]" style={{color:'var(--faded)'}}>{r.downloads}次下载</span>
                  </div>
                </div>
                {/* 作者 */}
                <div className="flex items-center gap-2 mt-3 pt-3" style={{borderTop:'1px solid rgba(200,180,160,0.1)'}}>
                  <AuthorBadge author={r.author} size="xs" />
                  <span className="text-[9px]" style={{color:'var(--faded)'}}>上传于 {r.createdAt}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* 底部统计 */}
      <div className="mt-8 picture-book-card p-5 flex items-center justify-center gap-10 flex-wrap">
        {[
          {n:COMMUNITY_RESOURCES.length,l:'总资源',e:'📦'},
          {n:totalDownloads,l:'总下载',e:'⬇️'},
          {n:featured.length,l:'精选资源',e:'⭐'},
          {n:6,l:'贡献队伍',e:'🤝'},
          {n:catKeys.length,l:'资源类型',e:'📂'},
        ].map(s=>(
          <div key={s.l} className="text-center">
            <p className="text-[22px] font-bold text-[var(--primary-skin)]" style={{fontFamily:'var(--font-serif)'}}>{s.n.toLocaleString()}</p>
            <p className="text-[10px] tracking-[0.08em]" style={{color:'var(--faded)'}}>{s.e} {s.l}</p>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-center mt-4" style={{color:'var(--faded)'}}>
        🌱 每一份资源都来自一线支教老师的实战经验 · 开源共享 · 共同进步
      </p>
    </InnerLayout>
  )
}
