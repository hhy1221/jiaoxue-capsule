'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { MOCK_ALBUMS } from '@/lib/mock-data'
import { useState, useEffect } from 'react'
import { Camera, Image, Plus, Search, Grid3X3 } from 'lucide-react'
import Confetti from '@/components/animations/Confetti'

const COVERS=['🎉','🔬','🏃','🎨','🌟','📖','🎵','✂️','🌍','💌']
const COVER_GRADIENTS=[
  'linear-gradient(135deg,rgba(230,120,80,0.12),rgba(220,180,140,0.06))',
  'linear-gradient(135deg,rgba(70,130,180,0.12),rgba(180,200,220,0.06))',
  'linear-gradient(135deg,rgba(120,160,80,0.12),rgba(190,210,170,0.06))',
  'linear-gradient(135deg,rgba(160,100,180,0.12),rgba(210,180,220,0.06))',
]
const ACCENTS=['#d4855e','#6baed6','#7a9a5a','#a78bfa','#f0a060','#e06080','#60b8a0','#c8a060','#6a9abe','#c878d0']

export default function GalleryPage() {
  const [view,setView]=useState<'grid'|'list'>('grid')
  const [confetti, setConfetti] = useState(0)
  const total=MOCK_ALBUMS.reduce((a,b)=>a+b.count,0)
  useEffect(() => { setConfetti(1) }, [])
  return (<InnerLayout>
    <header className="flex items-center justify-between pb-[22px] mb-5 flex-wrap gap-3 relative" style={{borderBottom:'1.5px solid rgba(180,160,130,0.25)'}}>
      <div>
        <h1 className="text-[19px] font-semibold tracking-[0.03em] text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>
          📷 相册
        </h1>
        <p className="text-[11px] mt-0.5 tracking-[0.06em]" style={{color:'var(--faded)'}}>
          {total}张照片 · {MOCK_ALBUMS.length}个相册 · 夏令营的每个瞬间
        </p>
      </div>
      <div className="flex gap-2 items-center">
        <button onClick={()=>setView('grid')} className={`picture-book-btn ${view==='grid'?'primary':''}`} style={{fontSize:11,padding:'4px 10px'}}><Grid3X3 size={14}/></button>
        <button onClick={()=>setView('list')} className={`picture-book-btn ${view==='list'?'primary':''}`} style={{fontSize:11,padding:'4px 10px'}}><Search size={14}/></button>
        <button className="picture-book-btn primary" style={{fontSize:11}}><Plus size={14}/> 新建相册</button>
      </div>
      <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 text-[7px] tracking-[7px] whitespace-nowrap" style={{color:'rgba(180,160,130,0.5)'}}>· · · · · · · · · · · ·</div>
    </header>

    {view==='grid'?(
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
        {MOCK_ALBUMS.map((a,i)=>{
          const grad=COVER_GRADIENTS[i%4]
          const accent=ACCENTS[i%10]
          return(<div key={a.id} className="picture-book-card tape-top p-0 overflow-hidden cursor-pointer group hover:-translate-y-1.5 hover:shadow-lg transition-all duration-400" style={{transform:`rotate(${i%2===0?'-0.4deg':'0.25deg'})`}}>
            {/* Cover photo area */}
            <div className="h-[160px] flex items-center justify-center relative overflow-hidden" style={{background:grad}}>
              <span className="text-6xl transition-transform duration-500 group-hover:scale-110">{a.cover}</span>
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-[var(--ink)]/0 group-hover:bg-[var(--ink)]/5 transition-all duration-400 flex items-center justify-center">
                <span className="text-white text-sm font-medium tracking-[0.06em] opacity-0 group-hover:opacity-100 transition-opacity duration-400 handwriting">查看相册 →</span>
              </div>
              {/* Photo count badge */}
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-medium text-white shadow-sm" style={{background:accent}}>
                {a.count}张
              </div>
              {/* Film strip edge at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5" style={{background:`repeating-linear-gradient(90deg,transparent 0px,transparent 14px,${accent}20 14px,${accent}20 18px)`}}/>
            </div>
            {/* Info */}
            <div className="p-4">
              <h3 className="text-[14px] font-semibold tracking-[0.04em] text-[var(--ink)] mb-1" style={{fontFamily:'var(--font-serif)'}}>{a.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.06em]" style={{color:'var(--faded)'}}>{a.createdAt}</span>
                <div className="flex items-center gap-1.5">
                  <Camera size={12} style={{color:'var(--faded)'}}/>
                  <span className="text-[11px] font-medium text-[var(--ink-soft)]">{a.count}</span>
                </div>
              </div>
            </div>
          </div>)
        })}
        {/* Add new album card */}
        <div className="picture-book-card p-0 overflow-hidden cursor-pointer hover:-translate-y-1.5 hover:shadow-lg transition-all duration-400 flex items-center justify-center min-h-[240px]" style={{border:'2px dashed rgba(200,180,160,0.3)'}}>
          <div className="text-center p-6">
            <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{background:'rgba(200,180,160,0.1)'}}>
              <Plus size={24} style={{color:'var(--faded)'}}/>
            </div>
            <p className="text-[13px] font-medium tracking-[0.04em]" style={{color:'var(--ink-faint)'}}>新建相册</p>
            <p className="text-[10px] mt-1 handwriting" style={{color:'var(--faded)'}}>上传第一批照片</p>
          </div>
        </div>
      </div>
    ):(
      /* List view */
      <div className="space-y-3">
        {MOCK_ALBUMS.map((a,i)=>{
          const accent=ACCENTS[i%10]
          return(<div key={a.id} className="picture-book-card p-4 flex items-center gap-5 cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 group" style={{transform:`rotate(${i%2===0?'-0.15deg':'0.1deg'})`}}>
            <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0" style={{background:`${accent}10`,border:`1.5px solid ${accent}20`}}>{a.cover}</div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[14px] font-semibold tracking-[0.04em] text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>{a.title}</h3>
              <p className="text-[11px] mt-0.5" style={{color:'var(--faded)'}}>{a.count}张照片 · {a.createdAt}</p>
              {/* Mini photo bar */}
              <div className="flex gap-1 mt-2">
                {Array.from({length:Math.min(a.count,20)}).map((_,pi)=>(<div key={pi} className="w-2 h-5 rounded-sm" style={{background:`${accent}${20+pi*4}`}}/>))}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 text-[10px]" style={{color:'var(--faded)'}}>
              <span className="flex items-center gap-1"><Camera size={10}/>{a.count}张</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity handwriting" style={{color:'var(--primary-skin)'}}>查看 →</span>
            </div>
          </div>)
        })}
      </div>
    )}

    <div className="mt-8 picture-book-card p-6 text-center" style={{background:'linear-gradient(135deg,rgba(240,230,215,0.3),rgba(235,225,210,0.2))'}}>
      <p className="text-[25px] mb-2">📸</p>
      <p className="handwriting text-[14px] tracking-[0.06em]" style={{color:'var(--ink-faint)'}}>
        每堂课上传的照片会自动创建同名相册——去课堂模块看看吧
      </p>
    </div>
    <Confetti trigger={confetti} />
  </InnerLayout>)
}
