'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { MOCK_RESOURCES } from '@/lib/mock-data'
import { useState } from 'react'
import { Download, FileText, Search, Plus, Filter } from 'lucide-react'
import UploadResourceForm from '@/components/forms/UploadResourceForm'
import { useToast } from '@/components/animations/Toast'

const TYPE_INFO:Record<string,{emoji:string;color:string}> = { lesson_plan:{emoji:'📖',color:'#d4855e'}, worksheet:{emoji:'📝',color:'#7a9a5a'}, template:{emoji:'📋',color:'#6baed6'}, other:{emoji:'📎',color:'#a78bfa'}, }
const TYPE_NAMES:Record<string,string>={lesson_plan:'教案',worksheet:'练习',template:'模板',other:'其他'}

export default function ResourcesPage() {
  const [filter,setFilter]=useState<string>('all')
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const { toast } = useToast()

  let items = filter==='all'?MOCK_RESOURCES:MOCK_RESOURCES.filter(r=>r.type===filter)
  if (search.trim()) {
    const q = search.trim().toLowerCase()
    items = items.filter(r => r.title.toLowerCase().includes(q) || TYPE_NAMES[r.type].includes(q))
  }

  const handleDownload = (title: string) => {
    toast(`"${title}" 下载开始！`, 'success')
  }

  return (<InnerLayout>
    <header className="flex items-center justify-between pb-[22px] mb-5 flex-wrap gap-3 relative" style={{borderBottom:'1.5px solid rgba(180,160,130,0.25)'}}>
      <div>
        <h1 className="text-[19px] font-semibold tracking-[0.03em] text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>
          📚 资源库
        </h1>
        <p className="text-[11px] mt-0.5 tracking-[0.06em]" style={{color:'var(--faded)'}}>
          教案模板 · 课件共享 · {MOCK_RESOURCES.length}份资源
        </p>
      </div>
      <div className="flex gap-2 items-center">
        <button className="picture-book-btn" style={{fontSize:11}} onClick={() => setShowSearch(!showSearch)}><Search size={14}/> 搜索</button>
        <button className="picture-book-btn primary" style={{fontSize:11}} onClick={()=>setShowForm(true)}><Plus size={14}/> 上传资源</button>
      </div>
      <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 text-[7px] tracking-[7px] whitespace-nowrap" style={{color:'rgba(180,160,130,0.5)'}}>· · · · · · · · · · · ·</div>
    </header>

    {showSearch && (
      <div className="relative mb-4">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="搜索资源名称或类型…" autoFocus
          className="w-full px-4 py-2.5 rounded-xl text-[13px] outline-none"
          style={{ border: '1.5px solid rgba(180,150,120,0.25)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit' }} />
        {search && <button onClick={() => { setSearch(''); setShowSearch(false) }} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--faded)] bg-transparent border-none cursor-pointer text-sm" style={{fontFamily:'inherit'}}>✕</button>}
      </div>
    )}

    <div className="flex gap-2 mb-5 flex-wrap">
      {[{k:'all',l:'全部',e:'📁'},{k:'lesson_plan',l:'教案',e:'📖'},{k:'worksheet',l:'练习',e:'📝'},{k:'template',l:'模板',e:'📋'},{k:'other',l:'其他',e:'📎'}].map(f=>(<button key={f.k} onClick={()=>setFilter(f.k)} className={`picture-book-tag cursor-pointer text-[11px] px-3 py-1.5`} style={filter===f.k?{background:'linear-gradient(135deg,rgba(200,160,120,0.15),rgba(180,140,100,0.08))',border:'1px solid rgba(200,160,120,0.3)'}:{}}>{f.e} {f.l}</button>))}
    </div>

    {items.length===0?(
      <div className="picture-book-card p-12 text-center">
        <p className="text-4xl mb-3">📭</p>
        <p className="handwriting text-[15px] tracking-[0.06em]" style={{color:'var(--faded)'}}>{search?'没有找到匹配的资源':'该分类暂无资源'}</p>
      </div>
    ):(
      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
        {items.map((r,i)=>{
          const ti=TYPE_INFO[r.type]
          return(<div key={r.id} className="picture-book-card tape-top p-5 cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-300 group" style={{transform:`rotate(${i%2===0?'-0.2deg':'0.15deg'})`}}>
            <div className="flex items-start gap-4 mb-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{background:`${ti.color}12`,border:`1.5px solid ${ti.color}25`}}>
                {ti.emoji}
              </div>
              <div className="min-w-0">
                <h3 className="text-[14px] font-semibold tracking-[0.04em] text-[var(--ink)] leading-tight mb-1" style={{fontFamily:'var(--font-serif)'}}>{r.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0 rounded-full" style={{background:`${ti.color}10`,color:ti.color,border:`1px solid ${ti.color}20`}}>{TYPE_NAMES[r.type]}</span>
                  <span className="text-[10px]" style={{color:'var(--faded)'}}>{r.uploadedBy}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2 pt-3" style={{borderTop:'1px solid rgba(200,180,160,0.12)'}}>
              <span className="text-[9px] tracking-[0.06em]" style={{color:'var(--faded)'}}>📅 {r.createdAt}</span>
              <button className="picture-book-btn primary group-hover:scale-105 transition-transform" style={{fontSize:10,padding:'4px 12px'}} onClick={()=>handleDownload(r.title)}><Download size={12}/>下载</button>
            </div>
            <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-sm" style={{color:ti.color}}>→</span>
            </div>
          </div>)
        })}
      </div>
    )}

    <div className="mt-8 picture-book-card p-5 flex items-center justify-center gap-8 flex-wrap">
      {[{n:MOCK_RESOURCES.length,l:'总资源',e:'📁'},{n:MOCK_RESOURCES.filter(r=>r.type==='lesson_plan').length,l:'教案',e:'📖'},{n:MOCK_RESOURCES.filter(r=>r.type==='template').length,l:'模板',e:'📋'},{n:1,l:'贡献者',e:'👤'}].map(s=>(<div key={s.l} className="text-center">
        <p className="text-[22px] font-bold text-[var(--primary-skin)]" style={{fontFamily:'var(--font-serif)'}}>{s.n}</p>
        <p className="text-[10px] tracking-[0.08em]" style={{color:'var(--faded)'}}>{s.e} {s.l}</p>
      </div>))}
    </div>
    <button className="add-new-btn mt-4" onClick={()=>setShowForm(true)}>＋ 上传新资源（PPT/PDF/Word/图片）</button>
    <UploadResourceForm open={showForm} onClose={()=>setShowForm(false)} />
  </InnerLayout>)
}