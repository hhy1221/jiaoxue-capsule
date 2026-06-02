'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { MOCK_ANNOUNCEMENTS } from '@/lib/mock-data'
import { Pin, Clock, User, Megaphone, Plus } from 'lucide-react'
import { useState } from 'react'
import PublishAnnouncementForm from '@/components/forms/PublishAnnouncementForm'

const CARD_COLORS=['#d4855e','#7a9a5a','#6baed6','#a78bfa','#f0a060']

export default function AnnouncementsPage() {
  const sorted=[...MOCK_ANNOUNCEMENTS].sort((a,b)=>(b.pinned?1:0)-(a.pinned?1:0))
  const [showForm, setShowForm] = useState(false)
  return (<InnerLayout>
    <header className="flex items-center justify-between pb-[22px] mb-5 flex-wrap gap-3 relative" style={{borderBottom:'1.5px solid rgba(180,160,130,0.25)'}}>
      <div>
        <h1 className="text-[19px] font-semibold tracking-[0.03em] text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>
          📢 公告
        </h1>
        <p className="text-[11px] mt-0.5 tracking-[0.06em]" style={{color:'var(--faded)'}}>
          队伍通知 · {MOCK_ANNOUNCEMENTS.length}条公告 · {MOCK_ANNOUNCEMENTS.filter(a=>a.pinned).length}条置顶
        </p>
      </div>
      <button className="picture-book-btn primary" style={{fontSize:11}} onClick={()=>setShowForm(true)}><Plus size={14}/> 发布公告</button>
      <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 text-[7px] tracking-[7px] whitespace-nowrap" style={{color:'rgba(180,160,130,0.5)'}}>· · · · · · · · · · · ·</div>
    </header>

    <div className="space-y-4">
      {sorted.map((a,i)=>{
        const accent=CARD_COLORS[i%5]
        const isFirst=i===0&&a.pinned
        return(<div key={a.id} className={`picture-book-card p-0 overflow-hidden ${isFirst?'tape-top':''}`}
          style={{
            transform:`rotate(${i%2===0?'-0.2deg':'0.1deg'})`,
            borderLeft:`4px solid ${a.pinned?accent:'rgba(200,180,160,0.2)'}`,
            ...(a.pinned?{background:'rgb(254 252 247)'}:{}),
          }}>
          <div className="p-5">
            <div className="flex items-start gap-4">
              {/* Icon badge */}
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:`${accent}10`,border:`1.5px solid ${accent}20`}}>
                {a.pinned?<Pin size={18} style={{color:accent}}/>:<Megaphone size={18} style={{color:accent}}/>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="text-[15px] font-semibold tracking-[0.04em] text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>{a.title}</h3>
                  {a.pinned&&<span className="text-[9px] px-2 py-0.5 rounded-full font-medium" style={{background:'rgba(240,160,60,0.12)',color:'#c8862e',border:'1px solid rgba(240,160,60,0.2)'}}>📌 置顶</span>}
                </div>
                <p className="text-[13px] leading-[1.9] text-[var(--ink-soft)] mt-2">{a.content}</p>
                <div className="flex items-center gap-4 mt-3 pt-2 flex-wrap" style={{borderTop:'1px solid rgba(200,180,160,0.1)'}}>
                  <span className="flex items-center gap-1 text-[10px]" style={{color:'var(--faded)'}}><User size={10}/> {a.author}</span>
                  <span className="flex items-center gap-1 text-[10px]" style={{color:'var(--faded)'}}><Clock size={10}/> {a.createdAt}</span>
                </div>
              </div>
            </div>
          </div>
        </div>)
      })}
    </div>

    <button className="add-new-btn mt-6" onClick={()=>setShowForm(true)}>＋ 发布新公告</button>
    <PublishAnnouncementForm open={showForm} onClose={()=>setShowForm(false)} />
  </InnerLayout>)
}