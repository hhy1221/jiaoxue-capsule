'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { MOCK_STUDENTS } from '@/lib/mock-data'
import Link from 'next/link'
import { Play, Download, Sparkles, CalendarDays } from 'lucide-react'
import { useToast } from '@/components/animations/Toast'
import { useState } from 'react'
import { JOURNAL_ENTRIES } from '@/lib/journal-data'
import { Loader2 } from 'lucide-react'

const AVATAR_GRADS=['linear-gradient(135deg,#ecdcc8,#ddc8b0,#e4d4c0)','linear-gradient(135deg,#d8e8d4,#c8dcc0,#d4e0cc)','linear-gradient(135deg,#d8dde8,#c8d3e0,#d4dce8)','linear-gradient(135deg,#ecd8c8,#ddc0b0,#e4d0c0)','linear-gradient(135deg,#d8ecd8,#c0d8c0,#d4e8d4)','linear-gradient(135deg,#f0e8d8,#e8dcc0,#ece4d0)','linear-gradient(135deg,#e8d8ec,#dcc0e0,#e4d4e8)','linear-gradient(135deg,#d8ece8,#c0dcd8,#d4e8e4)']
const COVER_COLORS=['#d4855e','#7a9a5a','#6baed6','#a78bfa','#f0a060','#e06880','#60b8a8','#c0a060']
const TAG_GRADIENTS=['linear-gradient(135deg,#f5e6d0,#e8d4b8)','linear-gradient(135deg,#d8e8d4,#c8dcc0)','linear-gradient(135deg,#d8dce8,#c8d4e0)','linear-gradient(135deg,#f8e4d8,#f0d4c8)']

// Demo students that have video data
const FEATURED = [MOCK_STUDENTS[0],MOCK_STUDENTS[1],MOCK_STUDENTS[2]]
const REST = MOCK_STUDENTS.slice(3)

export default function GrowthVideoPage() {
  const { toast } = useToast()
  const [generating, setGenerating] = useState(false)
  const [aiScript, setAiScript] = useState<Record<string, string>>({})
  const [scriptLoading, setScriptLoading] = useState<string | null>(null)
  return(<InnerLayout>
    <header className="flex items-center justify-between pb-[22px] mb-5 flex-wrap gap-3 relative" style={{borderBottom:'1.5px solid rgba(180,160,130,0.25)'}}>
      <div>
        <h1 className="text-[19px] font-semibold tracking-[0.03em] text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>🎬 成长纪念视频</h1>
        <p className="text-[11px] mt-0.5 tracking-[0.06em]" style={{color:'var(--faded)'}}>AI自动选取照片+评语，生成60秒专属成长纪念视频</p>
      </div>
      <button className="picture-book-btn primary" style={{fontSize:11}} onClick={()=>{setGenerating(true);setTimeout(()=>{setGenerating(false);toast('全部视频生成完成！','success')},3000)}}>{generating?'⏳ 生成中...':<><Sparkles size={14}/> 一键生成全部</>}</button>
      <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 text-[7px] tracking-[7px] whitespace-nowrap" style={{color:'rgba(180,160,130,0.5)'}}>· · · · · · · · · · · ·</div>
    </header>

    {/* ═══ 精选推荐 — 已生成视频的学生 ═══ */}
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[12px] font-semibold tracking-[0.04em] text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>✨ 精选推荐</span>
        <span className="text-[10px] tracking-[0.06em] px-2 py-0.5 rounded-full" style={{background:'rgba(200,160,120,0.08)',color:'var(--faded)'}}>AI已生成视频</span>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-5">
        {FEATURED.map((s,i)=>{
          const c=COVER_COLORS[i%8];const ag=AVATAR_GRADS[i%8]
          return(<div key={s.id} className="picture-book-card tape-top p-0 overflow-hidden hover:-translate-y-1.5 hover:shadow-lg transition-all duration-400 group" style={{transform:`rotate(${i%2===0?'-0.25deg':'0.2deg'})`}}>
            {/* Video cover — hero area */}
            <div className="relative h-[200px] flex items-center justify-center overflow-hidden" style={{background:`linear-gradient(170deg, ${c}12, ${c}06 50%, ${c}03)`}}>
              {/* Decorative background gradient blobs */}
              <div className="absolute -top-10 -right-10 w-[140px] h-[140px] rounded-full opacity-20" style={{background:`radial-gradient(circle, ${c}, transparent 70%)`}}/>
              <div className="absolute -bottom-8 -left-8 w-[100px] h-[100px] rounded-full opacity-15" style={{background:`radial-gradient(circle, ${c}, transparent 70%)`}}/>

              {/* Student avatar — large centered */}
              <div className="relative z-[1] text-center">
                <div className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-4xl relative"
                  style={{background:ag,boxShadow:`0 4px 20px ${c}30`,border:'4px solid #fff',outline:`2px solid ${c}40`}}>
                  {s.avatar}
                </div>
                <h3 className="text-[16px] font-bold tracking-[0.04em] text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>{s.name}</h3>
                <p className="text-[11px] handwriting tracking-[0.04em]" style={{color:'var(--faded)'}}>—— {s.nickname}</p>
              </div>

              {/* Play button overlay on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center z-[2]" style={{background:'rgba(0,0,0,0.06)'}}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{background:'rgba(255,255,255,0.9)',boxShadow:'0 4px 20px rgba(0,0,0,0.12)'}}>
                  <Play size={24} style={{color:c}} className="ml-0.5"/>
                </div>
              </div>

              {/* Badge top-right */}
              <div className="absolute top-4 right-4 z-[1]">
                <span className="text-[8px] px-2 py-1 rounded-full font-medium tracking-[0.06em] text-white" style={{background:c}}>60秒</span>
              </div>
            </div>

            {/* Info row */}
            <div className="p-4">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {s.tags.map((t,ti)=>(<span key={t} className="picture-book-tag text-[9px]" style={{transform:`rotate(${TAG_GRADIENTS[ti%4].includes('d8dce8')?'1deg':'-1.2deg'})`,background:TAG_GRADIENTS[ti%4]}}>{t}</span>))}
              </div>
              <p className="text-[11px] leading-relaxed line-clamp-2 mb-3" style={{color:'var(--ink-faint)'}}>
                AI已根据{s.name}的{s.tags.length}个标签、{s.personality.slice(0,20)}……生成专属纪念视频
              </p>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-[9px]" style={{color:'var(--faded)'}}><CalendarDays size={10}/> {s.createdAt}</span>
                <div className="flex gap-2">
                  <Link href={`/growth-video/${s.id}`} className="picture-book-btn primary no-underline flex items-center gap-1" style={{fontSize:10,padding:'4px 12px'}}><Play size={11}/>预览</Link>
                  <button className="picture-book-btn flex items-center gap-1" style={{fontSize:10,padding:'4px 12px'}} onClick={()=>toast('视频下载开始！','success')}><Download size={11}/>下载</button>
                </div>
              </div>
            </div>
          </div>)
        })}
      </div>
    </div>

    {/* ═══ 待生成 — 其余学生列表 ═══ */}
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[12px] font-semibold tracking-[0.04em] text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>📋 待生成</span>
        <span className="text-[10px] tracking-[0.06em] px-2 py-0.5 rounded-full" style={{background:'rgba(200,180,160,0.06)',color:'var(--faded)'}}>{REST.length}位学生</span>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
        {REST.map((s,i)=>{
          const c=COVER_COLORS[(i+3)%8];const ag=AVATAR_GRADS[(i+3)%8]
          return(<div key={s.id} className="picture-book-card p-5 hover:-translate-y-1 hover:shadow-md transition-all duration-300 group" style={{transform:`rotate(${i%2===0?'-0.15deg':'0.1deg'})`}}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                style={{background:ag,boxShadow:`0 2px 8px ${c}15`,border:'2.5px solid #fff',outline:`1px solid ${c}30`}}>
                {s.avatar}
              </div>
              <div>
                <h3 className="text-[13px] font-semibold tracking-[0.04em] text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>{s.name}</h3>
                <p className="text-[10px] tracking-[0.04em]" style={{color:'var(--faded)'}}>{s.grade} · {s.age}岁</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mb-3">
              {s.tags.slice(0,3).map((t,ti)=>(<span key={t} className="text-[9px] px-1.5 py-0.5 rounded" style={{background:`${c}08`,color:'var(--ink-faint)'}}>{t}</span>))}
            </div>
            <button className="w-full picture-book-btn primary flex items-center justify-center gap-1.5" style={{fontSize:10,padding:'6px 0'}} onClick={async () => {
              setScriptLoading(s.id)
              try {
                const moments = JOURNAL_ENTRIES.filter(e => e.studentReflections.some(sr => sr.studentName === s.name)).flatMap(e => e.keyMoments.filter(m => m.forLetter).map(m => m.content))
                const res = await fetch('/api/ai/video-script', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ studentName: s.name, tags: s.tags, personality: s.personality, journalMoments: moments.slice(0, 5) }) })
                const data = await res.json()
                if (data.success) { setAiScript(prev => ({ ...prev, [s.id]: data.content })); toast(`${s.name}的视频脚本已生成！`, 'success') }
              } catch { toast('生成失败', 'error') }
              finally { setScriptLoading(null) }
            }} disabled={scriptLoading === s.id}>
              {scriptLoading === s.id ? <><Loader2 size={12} className="animate-spin"/>生成中...</> : aiScript[s.id] ? '🤖 重新生成脚本' : <><Sparkles size={12}/>🤖 AI生成脚本</>}
            </button>
            {aiScript[s.id] && (
              <div className="mt-3 p-3 rounded-lg text-[10px] leading-relaxed max-h-[200px] overflow-y-auto" style={{ background: 'rgba(245,238,220,0.5)', border: '1px solid rgba(200,160,120,0.15)', color: 'var(--ink-soft)' }}>
                <pre className="whitespace-pre-wrap" style={{ fontFamily: 'var(--font-serif)' }}>{aiScript[s.id].slice(0, 500)}</pre>
              </div>
            )}
          </div>)
        })}
      </div>
    </div>

    {/* Bottom CTA */}
    <div className="mt-8 picture-book-card p-6 text-center" style={{border:'2px dashed rgba(200,180,160,0.2)',background:'linear-gradient(135deg,rgba(245,238,225,0.2),rgba(240,230,215,0.1))'}}>
      <p className="text-[20px] mb-2">📸</p>
      <p className="handwriting text-[14px] tracking-[0.06em]" style={{color:'var(--ink-faint)'}}>
        去课堂模块上传更多照片和评语 — AI 会自动生成更精彩的成长视频
      </p>
      <Link href="/classroom" className="picture-book-btn primary inline-flex items-center gap-1.5 mt-3 no-underline" style={{fontSize:12}}>
        <Sparkles size={13}/> 去课堂模块
      </Link>
    </div>
  </InnerLayout>)
}
