'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { MOCK_STUDENTS } from '@/lib/mock-data'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, Play, Pause, Download, Camera, Heart, Sparkles } from 'lucide-react'

const AVATAR_GRADS=['linear-gradient(135deg,#ecdcc8,#ddc8b0,#e4d4c0)','linear-gradient(135deg,#d8e8d4,#c8dcc0,#d4e0cc)','linear-gradient(135deg,#d8dde8,#c8d3e0,#d4dce8)']
const MOCK_SCENES = [
  {label:'封面：闪亮的星',emoji:'⭐',duration:'0-5秒'},
  {label:'Day1：安静怕生',emoji:'🤫',duration:'5-12秒'},
  {label:'Day3：作品展出',emoji:'🎨',duration:'12-22秒'},
  {label:'Day7：首次举手',emoji:'🙋',duration:'22-35秒'},
  {label:'Day12：全班合影',emoji:'📸',duration:'35-50秒'},
  {label:'成长关键词',emoji:'🌟',duration:'50-58秒'},
  {label:'凡星支教队·2026',emoji:'🌱',duration:'58-60秒'},
]

export default function VideoDetailPage() {
  const { studentId }=useParams()
  const s=MOCK_STUDENTS.find(st=>st.id===studentId)||MOCK_STUDENTS[0]
  const [playing,setPlaying]=useState(false)

  return(<InnerLayout>
    <Link href="/growth-video" className="inline-flex items-center gap-1.5 text-[12px] tracking-wider mb-5 no-underline hover:opacity-70 transition-opacity" style={{color:'var(--ink-soft)'}}><ArrowLeft size={14}/>返回</Link>

    <div className="grid grid-cols-[1fr_360px] gap-6 max-lg:grid-cols-1">
      {/* Left: Video player */}
      <div className="picture-book-card p-0 overflow-hidden" style={{transform:'rotate(-0.1deg)'}}>
        {/* Player area */}
        <div className="relative aspect-video flex items-center justify-center cursor-pointer group" style={{background:'linear-gradient(170deg,rgba(0,0,0,0.85),rgba(20,10,5,0.9))'}} onClick={()=>setPlaying(!playing)}>
          {/* Student avatar + title overlay */}
          <div className="text-center z-[1]">
            <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl" style={{background:AVATAR_GRADS[0],boxShadow:'0 4px 30px rgba(255,255,255,0.06)',border:'3px solid rgba(255,255,255,0.15)'}}>
              {s.avatar}
            </div>
            <h2 className="text-[22px] font-bold text-white tracking-[0.04em] mb-1" style={{fontFamily:'var(--font-serif)'}}>{s.name}</h2>
            <p className="text-[12px] text-white/50 tracking-[0.06em]">成长纪念视频 · 60秒 · AI生成</p>
          </div>

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
            <div className="w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110" style={{background:'rgba(255,255,255,0.2)',backdropFilter:'blur(4px)'}}>
              {playing?<Pause size={28} className="text-white"/>:<Play size={28} className="text-white ml-1"/>}
            </div>
          </div>
        </div>

        {/* Info bar */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[11px] flex-wrap" style={{color:'var(--faded)'}}>
            <span className="flex items-center gap-1"><Camera size={12}/>8张照片</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Heart size={12}/>温馨配乐</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Sparkles size={12}/>AI旁白</span>
          </div>
          <button className="picture-book-btn primary flex items-center gap-1.5" style={{fontSize:11,padding:'5px 14px'}}>
            <Download size={13}/>下载MP4
          </button>
        </div>
      </div>

      {/* Right: Scene list + student info */}
      <div className="space-y-4">
        {/* Student card */}
        <div className="picture-book-card p-5" style={{transform:'rotate(0.15deg)'}}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-full flex items-center justify-center text-xl flex-shrink-0" style={{background:AVATAR_GRADS[0],border:'2.5px solid #fff',outline:'1px solid rgba(180,150,120,0.35)',boxShadow:'0 2px 8px rgba(100,70,40,0.08)'}}>{s.avatar}</div>
            <div>
              <h3 className="text-[14px] font-semibold tracking-[0.04em] text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>{s.name} · {s.nickname}</h3>
              <p className="text-[10px] tracking-[0.06em]" style={{color:'var(--faded)'}}>{s.grade} · {s.age}岁</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {s.tags.map(t=>(<span key={t} className="picture-book-tag text-[9px]" style={{transform:'rotate(-0.8deg)'}}>{t}</span>))}
          </div>
        </div>

        {/* Scene list */}
        <div className="picture-book-card p-5" style={{transform:'rotate(-0.1deg)'}}>
          <h3 className="text-[12px] font-semibold tracking-[0.04em] text-[var(--ink)] mb-4" style={{fontFamily:'var(--font-serif)'}}>🎬 视频分镜</h3>
          <div className="space-y-1">
            {MOCK_SCENES.map((sc,i)=>(<div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-[var(--surface-hover)] transition-colors cursor-default group">
              <span className="text-lg w-7 text-center flex-shrink-0">{sc.emoji}</span>
              <span className="text-[12px] text-[var(--ink-soft)] flex-1">{sc.label}</span>
              <span className="text-[9px] tracking-[0.04em] opacity-0 group-hover:opacity-100 transition-opacity" style={{color:'var(--faded)'}}>{sc.duration}</span>
            </div>))}
          </div>
        </div>
      </div>
    </div>

    {/* Bottom note */}
    <div className="mt-6 picture-book-card p-4 text-center" style={{background:'linear-gradient(135deg,rgba(245,238,225,0.2),rgba(240,230,215,0.1))'}}>
      <p className="handwriting text-[12px] tracking-[0.06em]" style={{color:'var(--ink-faint)'}}>
        💡 视频由AI自动从8张精选照片和12天评语中生成 · 音乐：温馨钢琴 · 旁白：温柔女声
      </p>
    </div>
  </InnerLayout>)
}
