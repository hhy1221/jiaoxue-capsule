'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { MOCK_REVIEWS, MOCK_MEMBERS } from '@/lib/mock-data'
import { Star, TrendingUp, UserCheck, MessageSquare } from 'lucide-react'

const AVATAR_GRADIENTS=['linear-gradient(135deg,#f5e6d0,#e8d4b8)','linear-gradient(135deg,#d8e8d4,#c8dcc0)','linear-gradient(135deg,#d8dce8,#c8d4e0)','linear-gradient(135deg,#f8e4d8,#f0d4c8)','linear-gradient(135deg,#e8d8e0,#dcc8d4)']

export default function ReviewsPage() {
  const avgRating=Math.round(MOCK_REVIEWS.reduce((a,b)=>a+b.rating,0)/MOCK_REVIEWS.length*10)/10
  return (<InnerLayout>
    <header className="flex items-center justify-between pb-[22px] mb-5 flex-wrap gap-3 relative" style={{borderBottom:'1.5px solid rgba(180,160,130,0.25)'}}>
      <div>
        <h1 className="text-[19px] font-semibold tracking-[0.03em] text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>
          ⭐ 评价
        </h1>
        <p className="text-[11px] mt-0.5 tracking-[0.06em]" style={{color:'var(--faded)'}}>
          互评互促 · {MOCK_REVIEWS.length}条评价 · 平均 {avgRating}分
        </p>
      </div>
      <button className="picture-book-btn primary" style={{fontSize:11}}>✏️ 写评价</button>
      <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 text-[7px] tracking-[7px] whitespace-nowrap" style={{color:'rgba(180,160,130,0.5)'}}>· · · · · · · · · · · ·</div>
    </header>

    {/* Summary card */}
    <div className="picture-book-card p-6 mb-6 flex items-center justify-center gap-10 flex-wrap" style={{transform:'rotate(-0.1deg)'}}>
      {[{icon:Star,val:avgRating,l:'平均评分',color:'#f0a040'},{icon:UserCheck,val:MOCK_REVIEWS.length,l:'评价数',color:'#7a9a5a'},{icon:MessageSquare,val:MOCK_MEMBERS.length,l:'队员数',color:'#6baed6'}].map(s=>(<div key={s.l} className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{background:`${s.color}15`,color:s.color}}><s.icon size={20}/></div>
        <div><p className="text-[22px] font-bold text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>{s.val}</p><p className="text-[10px] tracking-[0.08em]" style={{color:'var(--faded)'}}>{s.l}</p></div>
      </div>))}
    </div>

    {/* Review cards */}
    <div className="space-y-4">
      {MOCK_REVIEWS.map((r,i)=>{
        const reviewer=MOCK_MEMBERS.find(m=>m.id===r.reviewerId)
        return(<div key={r.id} className="picture-book-card tape-top p-5" style={{transform:`rotate(${i%2===0?'-0.2deg':'0.1deg'})`}}>
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="w-11 h-11 rounded-full flex items-center justify-center text-base font-semibold flex-shrink-0" style={{background:AVATAR_GRADIENTS[i%5],color:'var(--ink-soft)',border:'2.5px solid #fff',outline:'1px solid rgba(180,150,120,0.4)',boxShadow:'0 2px 6px rgba(100,70,40,0.08)'}}>
              {reviewer?.avatar||'👤'}
            </div>
            <div className="flex-1 min-w-0">
              {/* Header: name + stars */}
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <div>
                  <span className="text-[14px] font-semibold tracking-[0.04em] text-[var(--ink)]">{reviewer?.name||'匿名'}</span>
                  <span className="text-[10px] ml-2 tracking-[0.06em]" style={{color:'var(--faded)'}}>评价了 {r.targetName}</span>
                </div>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s=>(<Star key={s} size={14} className={s<=r.rating?'fill-amber-400 text-amber-400':'text-gray-300'}/>))}
                </div>
              </div>
              {/* Content */}
              <p className="text-[13px] leading-[1.9] text-[var(--ink-soft)] whitespace-pre-line">{r.content}</p>
              {/* Footer */}
              <div className="flex items-center justify-between mt-3 pt-2" style={{borderTop:'1px solid rgba(200,180,160,0.1)'}}>
                <span className="text-[9px] tracking-[0.06em]" style={{color:'var(--faded)'}}>📅 {r.createdAt}</span>
                <div className="flex gap-1.5">
                  {[1,2,3,4,5].map(s=>(<Star key={s} size={10} className={s<=r.rating?'fill-amber-400 text-amber-400':'text-gray-300'}/>))}
                </div>
              </div>
            </div>
          </div>
          {/* Decorative paperclip */}
          {i===0&&(<div className="absolute -top-1 -right-1 w-6 h-3 rounded-[2px] border border-[rgba(150,130,110,0.3)] border-b-0 border-l-transparent border-r-transparent"/>)}
        </div>)
      })}
    </div>

    <button className="add-new-btn mt-6">＋ 写新评价</button>
  </InnerLayout>)
}
