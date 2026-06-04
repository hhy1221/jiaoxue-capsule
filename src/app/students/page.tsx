'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { MOCK_STUDENTS } from '@/lib/mock-data'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import { Plus, Search } from 'lucide-react'
import CreateStudentForm from '@/components/forms/CreateStudentForm'

const TAG_DEFS=[{bg:'linear-gradient(135deg,#f5e6d0,#e8d4b8)',rot:'-1.8deg'},{bg:'linear-gradient(135deg,#d8e8d4,#c8dcc0)',rot:'1.2deg'},{bg:'linear-gradient(135deg,#d8dce8,#c8d4e0)',rot:'-1.0deg'},{bg:'linear-gradient(135deg,#f8e4d8,#f0d4c8)',rot:'1.5deg'},{bg:'linear-gradient(135deg,#f8f0d8,#f4e8c8)',rot:'-0.8deg'}]

function StudentAvatar({student}:{student:typeof MOCK_STUDENTS[0]}) {
  const [loaded, setLoaded] = useState(true)
  if (!loaded) {
    return (
      <div className="w-12 h-12 rounded-full relative z-[1] flex items-center justify-center text-2xl"
        style={{background:'linear-gradient(135deg,#ecdcc8,#ddc8b0,#e4d4c0)',boxShadow:'0 2px 10px rgba(100,70,40,0.1)',border:'3px solid #fff',outline:'1px solid rgba(180,150,120,0.35)'}}>
        {student.avatar}
      </div>
    )
  }
  return (
    <div className="w-12 h-12 rounded-full relative z-[1] overflow-hidden"
      style={{boxShadow:'0 2px 10px rgba(100,70,40,0.1)',border:'3px solid #fff',outline:'1px solid rgba(180,150,120,0.35)'}}>
      <img src={student.photo} alt={student.name} className="w-full h-full object-cover" onError={()=>setLoaded(false)}/>
    </div>
  )
}

export default function StudentsPage() {
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const filtered = useMemo(() => {
    if (!search.trim()) return MOCK_STUDENTS
    const q = search.trim().toLowerCase()
    return MOCK_STUDENTS.filter(s =>
      s.name.includes(q) || s.nickname?.includes(q) || s.tags.some(t => t.includes(q)) || s.grade.includes(q)
    )
  }, [search])

  return (<InnerLayout>
    <header className="flex items-center justify-between pb-[22px] mb-5 flex-wrap gap-3 relative" style={{borderBottom:'1.5px solid rgba(180,160,130,0.25)'}}>
      <div><h1 className="text-[19px] font-semibold tracking-[0.03em] text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>📒 学生档案</h1><p className="text-[11px] mt-0.5 tracking-[0.06em]" style={{color:'var(--faded)'}}>共 {MOCK_STUDENTS.length} 位学生 · 汇聚来自全国各地的孩子</p></div>
      <div className="flex gap-2 flex-wrap"><button className="picture-book-btn" style={{fontSize:11}} onClick={() => setShowSearch(!showSearch)}><Search size={14}/> 搜索</button><button className="picture-book-btn primary" style={{fontSize:11}} onClick={()=>setShowForm(true)}><Plus size={14}/> 添加学生</button></div>
      <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 text-[7px] tracking-[7px] whitespace-nowrap" style={{color:'rgba(180,160,130,0.5)'}}>· · · · · · · · · · · ·</div>
    </header>

    {showSearch && (
      <div className="relative mb-4">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="搜索学生姓名、标签或年级…" autoFocus
          className="w-full px-4 py-2.5 rounded-xl text-[13px] outline-none"
          style={{ border: '1.5px solid rgba(180,150,120,0.25)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit' }} />
        {search && <button onClick={() => { setSearch(''); setShowSearch(false) }} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--faded)] bg-transparent border-none cursor-pointer text-sm" style={{fontFamily:'inherit'}}>✕</button>}
      </div>
    )}

    <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-5">
      {filtered.map((s,i)=>(<Link key={s.id} href={`/students/${s.id}`} className="no-underline" style={{transform:`rotate(${i%2===0?'-0.35deg':'0.25deg'})`}}>
        <div className="picture-book-card tape-top p-5 cursor-pointer hover:-translate-y-1.5 hover:shadow-lg transition-all duration-400 group">
          <div className="flex items-center gap-4 mb-3">
            <div className="relative flex-shrink-0">
              <div className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{background:'radial-gradient(circle,rgba(200,160,120,0.15),transparent 70%)'}}/>
              <StudentAvatar student={s}/>
              <div className="absolute -top-1 -right-1.5 w-6 h-3 rounded-[1px] z-[5]" style={{background:'rgba(228,180,165,0.5)',transform:'rotate(12deg)',boxShadow:'0 1px 2px rgba(0,0,0,0.04)'}}/>
            </div>
            <div className="min-w-0">
              <h3 className="text-[15px] font-bold tracking-[0.04em] text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>{s.name}</h3>
              <p className="text-[10px] handwriting tracking-[0.04em]" style={{color:'var(--ink-faint)'}}>—— {s.nickname}</p>
              <div className="flex items-center gap-1.5 mt-0.5 text-[10px] tracking-[0.04em]" style={{color:'var(--faded)'}}><span>{s.grade}</span><span>·</span><span>{s.age}岁</span></div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {s.tags.map((tag,ti)=>{const ct=TAG_DEFS[ti%5];return(<span key={tag} className="picture-book-tag text-[10px]" style={{transform:`rotate(${ct.rot})`,background:ct.bg}}>{tag}</span>)})}
            <span className="picture-book-tag text-[9px] opacity-40" style={{transform:'rotate(0.6deg)',background:'rgba(200,190,180,0.15)'}}>+</span>
          </div>
          <div className="w-10 h-px my-3 mx-auto" style={{background:'linear-gradient(90deg,transparent,rgba(180,160,130,0.25),transparent)'}}/>
          <p className="text-[11px] leading-relaxed line-clamp-2 mb-3" style={{color:'var(--ink-faint)'}}>{s.personality}</p>
          <div className="flex items-center justify-between" style={{borderTop:'1px solid rgba(200,180,160,0.1)',paddingTop:8}}>
            <span className="handwriting text-[10px] tracking-[0.04em]" style={{color:'var(--faded)'}}>📅 {s.createdAt}</span>
            <span className="flex items-center gap-1 text-[11px] opacity-0 group-hover:opacity-100 transition-opacity duration-400 handwriting" style={{color:'var(--primary-skin)'}}>查看档案 →</span>
          </div>
        </div>
      </Link>))}
    </div>
    {filtered.length === 0 && (
      <div className="text-center py-12" style={{color:'var(--faded)'}}>
        <div className="text-4xl mb-3 opacity-30">🔍</div>
        <p className="handwriting text-[15px]">没有找到匹配的学生</p>
      </div>
    )}
    <button className="add-new-btn mt-6" onClick={()=>setShowForm(true)}>＋ 新建学生档案</button>
    <CreateStudentForm open={showForm} onClose={()=>setShowForm(false)} />
  </InnerLayout>)
}