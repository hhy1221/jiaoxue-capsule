'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { MOCK_PENPAL_MATCHES, MOCK_STUDENTS } from '@/lib/mock-data'
import { Tabs,TabsContent,TabsList,TabsTrigger } from '@/components/ui/tabs'
import { Heart, MessageCircle, Sparkles, ArrowRight } from 'lucide-react'
import Confetti from '@/components/animations/Confetti'
import { useToast } from '@/components/animations/Toast'
import { useState } from 'react'

const MATCH_CARD_COLORS=['linear-gradient(135deg,rgba(216,110,88,0.06),rgba(240,160,120,0.04))','linear-gradient(135deg,rgba(90,150,180,0.06),rgba(180,210,230,0.04))','linear-gradient(135deg,rgba(140,110,190,0.06),rgba(200,180,220,0.04))']
const MATCH_ACCENTS=['#d4855e','#6baed6','#a78bfa']

export default function PenpalSquarePage() {
  const [celebrate, setCelebrate] = useState(0)
  const { toast } = useToast()
  return(<InnerLayout>
    <header className="flex items-center justify-between pb-[22px] mb-5 flex-wrap gap-3 relative" style={{borderBottom:'1.5px solid rgba(180,160,130,0.25)'}}>
      <div>
        <h1 className="text-[19px] font-semibold tracking-[0.03em] text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>💌 笔友广场</h1>
        <p className="text-[11px] mt-0.5 tracking-[0.06em]" style={{color:'var(--faded)'}}>AI匹配 · 跨届通信 · 支教结束后关系不断</p>
      </div>
      <button className="picture-book-btn primary" style={{fontSize:11}} onClick={() => { setCelebrate(c => c + 1); toast('笔友匹配成功！', 'success') }}><Sparkles size={14}/> AI匹配新笔友</button>
      <Confetti trigger={celebrate} />
      <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 text-[7px] tracking-[7px] whitespace-nowrap" style={{color:'rgba(180,160,130,0.5)'}}>· · · · · · · · · · · ·</div>
    </header>

    <Tabs defaultValue="matches"><TabsList className="mb-6" style={{background:'rgba(245,240,230,0.3)',border:'1px solid rgba(200,180,160,0.15)',padding:2}}><TabsTrigger value="matches" className="text-[12px] tracking-[0.04em] data-[state=active]:bg-[var(--surface)]">🤝 推荐匹配</TabsTrigger><TabsTrigger value="active" className="text-[12px] tracking-[0.04em] data-[state=active]:bg-[var(--surface)]">💬 正在通信</TabsTrigger></TabsList>

    <TabsContent value="matches"><div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-4">
      {MOCK_PENPAL_MATCHES.map((m,i)=>{
        const a=MOCK_STUDENTS.find(s=>s.id===m.studentAId);const b=MOCK_STUDENTS.find(s=>s.id===m.studentBId)
        const bg=MATCH_CARD_COLORS[i%3];const accent=MATCH_ACCENTS[i%3]
        return(<div key={m.id} className="picture-book-card tape-top p-5 cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-400" style={{transform:`rotate(${i%2===0?'-0.25deg':'0.2deg'})`,background:bg}}>
          {/* Score badge */}
          <div className="absolute top-3 right-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{background:`${accent}10`,border:`2px solid ${accent}25`}}>
              <span className="text-[13px] font-bold" style={{color:accent,fontFamily:'var(--font-serif)'}}>{m.score}%</span>
            </div>
          </div>
          {/* Student pair */}
          <div className="flex items-center gap-3 mb-3 mt-2">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-[var(--surface)] flex items-center justify-center text-lg" style={{background:'rgba(255,255,255,0.8)'}}>{a?.avatar}</div>
              <div className="w-10 h-10 rounded-full border-2 border-[var(--surface)] flex items-center justify-center text-lg" style={{background:'rgba(255,255,255,0.8)'}}>{b?.avatar}</div>
            </div>
            <div>
              <p className="text-[13px] font-semibold tracking-[0.04em] text-[var(--ink)]">{a?.name} <span className="opacity-50">🤝</span> {b?.name}</p>
              <p className="text-[10px]" style={{color:'var(--faded)'}}>{a?.grade} · {b?.grade}</p>
            </div>
          </div>
          {/* Reason */}
          <p className="text-[12px] leading-relaxed mb-3" style={{color:'var(--ink-soft)'}}>{m.reason}</p>
          {/* AI suggestion */}
          <div className="p-3 rounded-md mb-3" style={{background:'rgba(255,255,255,0.5)',border:'1px solid rgba(200,180,160,0.1)'}}>
            <p className="text-[10px] font-medium tracking-[0.04em] mb-0.5" style={{color:'var(--primary-skin)'}}>💡 AI建议</p>
            <p className="text-[11px]" style={{color:'var(--ink-soft)'}}>{m.firstLetterSuggestion}</p>
          </div>
          {/* Actions */}
          <div className="flex items-center justify-between">
            {m.status==='active'?<span className="text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1" style={{background:'rgba(122,170,90,0.1)',border:'1px solid rgba(122,170,90,0.2)',color:'#5a8a3a'}}><MessageCircle size={11}/> 通信中 ({m.letters.length}封)</span>:<span className="text-[10px] px-2.5 py-1 rounded-full" style={{background:'rgba(240,180,60,0.1)',border:'1px solid rgba(240,180,60,0.2)',color:'#b08030'}}>🌱 待开始</span>}
            <button className="picture-book-btn primary flex items-center gap-1" style={{fontSize:10,padding:'4px 12px'}}>开始通信 <ArrowRight size={11}/></button>
          </div>
        </div>)
      })}
    </div></TabsContent>

    <TabsContent value="active"><div className="space-y-3">
      {MOCK_PENPAL_MATCHES.filter(m=>m.status==='active').map((m,i)=>(<div key={m.id} className="picture-book-card p-4 flex items-center justify-between hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 cursor-pointer" style={{transform:`rotate(${i%2===0?'-0.1deg':'0.08deg'})`}}>
        <div className="flex items-center gap-4">
          <span className="text-2xl">💌</span>
          <div>
            <p className="text-[14px] font-semibold tracking-[0.04em] text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>{m.studentAName} 与 {m.studentBName}</p>
            <p className="text-[11px]" style={{color:'var(--faded)'}}>{m.letters.length}封通信 · 最后通信: {m.letters[m.letters.length-1]?.createdAt||'—'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Heart size={14} style={{color:'#d4855e'}}/>
          <button className="picture-book-btn" style={{fontSize:10,padding:'3px 10px'}}>查看通信 →</button>
        </div>
      </div>))}
    </div></TabsContent></Tabs>

    <div className="mt-6 picture-book-card p-5 text-center" style={{border:'2px dashed rgba(200,180,160,0.2)',background:'linear-gradient(135deg,rgba(245,238,225,0.3),rgba(240,230,215,0.2))'}}>
      <p className="handwriting text-[14px] tracking-[0.06em]" style={{color:'var(--ink-faint)'}}>+ AI根据性格标签和兴趣爱好自动匹配最合适的笔友</p>
    </div>
  </InnerLayout>)
}
