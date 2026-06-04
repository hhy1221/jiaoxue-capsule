'use client'
import StudentLayout from '@/components/layout/StudentLayout'
import { useState } from 'react'
import { Calendar, Clock, MapPin, Star, Send, Heart, Smile, ThumbsUp } from 'lucide-react'

const TODAY = [
  { time:'8:00–9:00',name:'碳足迹侦探营',emoji:'🌍',teacher:'周老师',room:'教室B',desc:'认识什么是碳排放，学会计算自己的碳足迹。讨论我们能为地球做什么。',rated:true,rating:5 },
  { time:'9:15–10:15',name:'数学游戏——数字接龙',emoji:'🧮',teacher:'黄老师',room:'教室A',desc:'用游戏的方式练习加减乘除。最刺激的环节是"数字炸弹"，全班一起倒数。',rated:false },
  { time:'10:30–11:30',name:'家乡的叶子——茶文化',emoji:'🍵',teacher:'周老师',room:'多功能厅',desc:'认识本地的茶叶种类，了解茶的历史。还亲自泡了茶给同学们品尝。',rated:false },
  { time:'14:30–15:30',name:'创意手工——纸箱恐龙',emoji:'🦕',teacher:'黄老师',room:'教室A',desc:'用废纸箱制作恐龙模型。发挥想象力，可以做成霸王龙、三角龙或任何你喜欢的恐龙。',rated:false },
  { time:'15:45–16:45',name:'体育课',emoji:'⚽',teacher:'体育老师',room:'操场',desc:'今天的内容是接力跑和跳绳比赛。天热注意多喝水。',rated:false },
]

export default function StudentClassPage() {
  const [ratings, setRatings] = useState<Record<string,number>>({})
  const [feedback, setFeedback] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const setRating = (className:string, r:number) => {
    setRatings(p=>({...p,[className]:r}))
  }

  const nowHour = new Date().getHours()

  return (
    <StudentLayout>
      <style>{`
        @keyframes classIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .class-row { animation:classIn 0.4s cubic-bezier(0.22,0.61,0.36,1) both; }
      `}</style>

      <div className="mb-6">
        <h1 className="text-[24px] font-bold text-[var(--ink)] flex items-center gap-2" style={{ fontFamily:'var(--font-serif)' }}>
          📖 今日课堂
        </h1>
        <p className="text-[13px] mt-1" style={{ color:'var(--faded)' }}>共 {TODAY.length} 节课 · 每节课都可以给老师打分和留言哦</p>
      </div>

      <div className="space-y-3">
        {TODAY.map((c,i)=>{
          const startH = parseInt(c.time.split(':')[0])
          const isCurrent = startH === nowHour || (startH <= nowHour && nowHour < startH+1)
          const isPast = startH < nowHour && !isCurrent
          const myRating = ratings[c.name]
          return (
            <div key={c.name} className="picture-book-card p-5 class-row"
              style={{
                animationDelay:`${i*0.1}s`,
                borderLeft:`5px solid ${isCurrent?'var(--primary-skin)':isPast?'rgba(122,180,90,0.4)':'rgba(200,180,160,0.25)'}`,
                opacity:isPast?0.7:1,
              }}>
              <div className="flex items-start gap-4">
                {/* 时间 */}
                <div className="text-center flex-shrink-0" style={{ minWidth:70 }}>
                  <div className="text-lg mb-0.5">{c.emoji}</div>
                  <div className="text-[13px] font-bold text-[var(--ink)]">{c.time}</div>
                  {isCurrent && <div className="text-[9px] px-2 py-0.5 rounded-full mt-1" style={{ background:'var(--primary-skin)',color:'#fff' }}>正在进行</div>}
                  {isPast && <div className="text-[9px] px-2 py-0.5 rounded-full mt-1" style={{ background:'rgba(122,180,90,0.12)',color:'#5a8a3a' }}>已结束</div>}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-[17px] font-bold text-[var(--ink)] mb-1" style={{ fontFamily:'var(--font-serif)' }}>{c.name}</h3>
                  <div className="flex items-center gap-3 text-[12px] mb-3" style={{ color:'var(--faded)' }}>
                    <span className="flex items-center gap-1"><span>👨‍🏫</span> {c.teacher}</span>
                    <span className="flex items-center gap-1"><MapPin size={11}/> {c.room}</span>
                  </div>
                  <p className="text-[14px] leading-[1.8] mb-3" style={{ color:'var(--ink-soft)' }}>{c.desc}</p>

                  {/* 评分区 — 已结束的课 */}
                  {isPast && (
                    <div className="p-4 rounded-xl" style={{ background:'rgba(245,238,220,0.5)',border:'1px solid rgba(200,160,120,0.12)' }}>
                      {myRating ? (
                        <div className="flex items-center gap-2">
                          <span style={{ color:'var(--faded)',fontSize:13 }}>你的评价：</span>
                          {[1,2,3,4,5].map(s=>(
                            <Star key={s} size={20} fill={s<=myRating?'#f0a040':'none'} style={{ color:s<=myRating?'#f0a040':'var(--faded)',opacity:0.3 }} />
                          ))}
                          <span className="text-[12px] ml-1 font-semibold" style={{ color:'#c8862e' }}>{myRating}/5</span>
                        </div>
                      ) : (
                        <div>
                          <p className="text-[13px] font-semibold mb-2 text-[var(--ink)]">这堂课怎么样？给老师打个分吧 ⭐</p>
                          <div className="flex gap-1.5">
                            {[1,2,3,4,5].map(s=>(
                              <button key={s} onClick={()=>setRating(c.name,s)}
                                className="w-10 h-10 rounded-xl flex items-center justify-center border-none cursor-pointer transition-all hover:scale-110"
                                style={{ background:'rgba(245,240,230,0.5)',border:'1.5px solid rgba(200,180,160,0.2)' }}>
                                <Star size={18} fill="#f0a040" style={{ color:'#f0a040' }}/>
                                <span className="text-[10px] font-bold ml-0.5" style={{ color:'var(--ink-soft)' }}>{s}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* 课堂总反馈 */}
      <div className="mt-6 picture-book-card p-5">
        <h3 className="text-[16px] font-bold mb-3 text-[var(--ink)] flex items-center gap-2" style={{ fontFamily:'var(--font-serif)' }}>
          💬 今天的整体感受
        </h3>
        {submitted ? (
          <div className="text-center py-6">
            <div className="text-4xl mb-2">🎉</div>
            <p className="text-[15px] font-semibold text-green-600">反馈已发送给老师！</p>
            <p className="text-[12px] mt-1" style={{ color:'var(--faded)' }}>老师看到后会很高兴的~</p>
          </div>
        ) : (
          <div>
            <div className="flex gap-2 mb-3 flex-wrap">
              {['😊 很开心','🤔 有点难','💡 学到很多','❤️ 老师讲得好','🌟 期待明天','🔥 太棒了'].map(r=>(
                <button key={r} onClick={()=>setFeedback(r)}
                  className="px-3 py-1.5 rounded-full text-[13px] border-none cursor-pointer transition-all hover:-translate-y-0.5"
                  style={{ background:feedback===r?'rgba(122,180,90,0.12)':'rgba(245,240,230,0.4)',color:feedback===r?'#5a8a3a':'var(--ink-soft)',border:`1.5px solid ${feedback===r?'rgba(122,180,90,0.3)':'rgba(200,180,160,0.15)'}`,fontFamily:'inherit' }}>{r}</button>
              ))}
            </div>
            <button onClick={()=>setSubmitted(true)} disabled={!feedback}
              className="picture-book-btn primary flex items-center gap-2" style={{fontSize:13,padding:'8px 20px',opacity:feedback?1:0.4}}>
              <Send size={14}/>发送反馈
            </button>
          </div>
        )}
      </div>
    </StudentLayout>
  )
}
