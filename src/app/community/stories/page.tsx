'use client'

import InnerLayout from '@/components/layout/InnerLayout'
import { MOCK_STORIES } from '@/lib/mock-data'
import { useState } from 'react'
import { Heart, MessageCircle, MapPin, Clock, Share2 } from 'lucide-react'

export default function StoriesPage() {
  const [expandedId, setExpandedId] = useState<string|null>(null)

  return (<InnerLayout>
    <header className="flex items-center justify-between pb-[22px] mb-5 flex-wrap gap-3 relative" style={{borderBottom:'1.5px solid rgba(180,160,130,0.25)'}}>
      <div>
        <h1 className="text-[22px] font-semibold tracking-[0.03em] text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>📸 支教故事</h1>
        <p className="text-[12px] mt-0.5 tracking-[0.06em]" style={{color:'var(--faded)'}}>课堂瞬间 · 成长故事 · 感动时刻 · {MOCK_STORIES.length} 篇温暖记录</p>
      </div>
      <button className="picture-book-btn primary" style={{fontSize:12}}>✏️ 分享故事</button>
    </header>

    {/* 瀑布流布局 */}
    <div className="columns-2 gap-5 max-md:columns-1">
      {MOCK_STORIES.map((s,i)=>(
        <div key={s.id} className="picture-book-card tape-top mb-5 break-inside-avoid overflow-hidden"
          style={{transform:`rotate(${i%2===0?'-0.2deg':'0.15deg'})`}}>
          {/* 图片区 — emoji 拼贴 */}
          <div className="flex gap-2 p-4 pb-2 justify-center flex-wrap"
            style={{background:'linear-gradient(180deg,rgba(245,238,220,0.5),transparent)'}}>
            {s.images.map((img,j)=>(
              <div key={j} className="w-20 h-20 rounded-lg flex items-center justify-center text-[32px]"
                style={{
                  background:'linear-gradient(135deg,rgba(220,200,170,0.15),rgba(200,180,150,0.08))',
                  border:'1.5px solid rgba(200,180,160,0.2)',
                  transform:`rotate(${j%2===0?-3:2}deg)`,
                }}>{img}</div>
            ))}
          </div>

          {/* 正文 */}
          <div className="p-4 pt-0">
            <h3 className="text-[16px] font-semibold text-[var(--ink)] mb-2 leading-snug" style={{fontFamily:'var(--font-serif)'}}>{s.title}</h3>
            <p className={`text-[13px] leading-[2] ${expandedId===s.id?'':'line-clamp-5'}`} style={{color:'var(--ink-soft)'}}>
              {s.content}
            </p>
            {expandedId!==s.id && (
              <button onClick={()=>setExpandedId(s.id)} className="text-[11px] mt-1 bg-transparent border-none cursor-pointer handwriting"
                style={{color:'var(--primary-skin)',fontFamily:'inherit'}}>展开全文 ↓</button>
            )}
            {expandedId===s.id && (
              <button onClick={()=>setExpandedId(null)} className="text-[11px] mt-1 bg-transparent border-none cursor-pointer handwriting"
                style={{color:'var(--faded)',fontFamily:'inherit'}}>收起 ∧</button>
            )}

            {/* 标签 */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {s.tags.map(t=><span key={t} className="text-[9px] px-2 py-0.5 rounded-full"
                style={{background:'rgba(200,180,160,0.06)',color:'var(--faded)',border:'1px solid rgba(200,180,160,0.12)'}}>#{t}</span>)}
            </div>

            {/* 底部信息 */}
            <div className="flex items-center justify-between mt-3 pt-3" style={{borderTop:'1px solid rgba(200,180,160,0.12)'}}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs"
                  style={{background:'rgba(200,160,120,0.1)',color:'var(--ink-soft)',border:'1px solid rgba(200,160,120,0.15)'}}>{s.author.avatar}</div>
                <div>
                  <p className="text-[11px] font-semibold text-[var(--ink)] flex items-center gap-1">
                    {s.author.name} {s.author.verified&&<span className="text-[8px] text-green-600">✓</span>}
                  </p>
                  <p className="text-[9px]" style={{color:'var(--faded)'}}>{s.teamName} · {s.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[10px]" style={{color:'var(--faded)'}}>
                <span className="flex items-center gap-1"><Heart size={11}/> {s.likes}</span>
                <span className="flex items-center gap-1"><MessageCircle size={11}/> {s.comments.length}</span>
              </div>
            </div>

            {/* 评论 — 展开时显示 */}
            {s.comments.length>0 && (
              <div className="mt-3 pt-3 space-y-2" style={{borderTop:'1px solid rgba(200,180,160,0.08)'}}>
                {s.comments.map(c=>(
                  <div key={c.id} className="flex items-start gap-2 text-[11px]">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] flex-shrink-0"
                      style={{background:'rgba(200,160,120,0.1)',color:'var(--ink-soft)'}}>{c.author.avatar}</span>
                    <div>
                      <span className="font-semibold text-[var(--ink)]">{c.author.name}</span>
                      <span className="ml-2" style={{color:'var(--ink-soft)'}}>{c.content}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </InnerLayout>)
}
