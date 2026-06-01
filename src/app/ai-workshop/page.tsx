'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import Link from 'next/link'

const TOOLS=[
  {href:'/ai-workshop/diary-assist',icon:'📝',title:'智能评语',desc:'说一段话 → AI扩写成完整评语',color:'#e8a87c',gradient:'linear-gradient(135deg,rgba(232,168,124,0.1),rgba(220,150,100,0.04))'},
  {href:'/ai-workshop/lesson-gen',icon:'📖',title:'课件助手',desc:'输入主题 → 完整课程大纲',color:'#7aad5a',gradient:'linear-gradient(135deg,rgba(122,173,90,0.1),rgba(100,155,70,0.04))'},
  {href:'/ai-workshop/pr-assist',icon:'📣',title:'宣传助手',desc:'一键生成推文/朋友圈/小红书文案',color:'#5a9ac0',gradient:'linear-gradient(135deg,rgba(90,154,192,0.1),rgba(70,135,175,0.04))'},
  {href:'/ai-workshop/dialect',icon:'🗣️',title:'方言翻译官',desc:'普通话 ↔ 四川话实时互译',color:'#c08050',gradient:'linear-gradient(135deg,rgba(192,128,80,0.1),rgba(175,110,65,0.04))'},
  {href:'/ai-workshop/treehole',icon:'🌳',title:'树洞信箱',desc:'匿名倾诉 · AI共情回复',color:'#6aac78',gradient:'linear-gradient(135deg,rgba(106,172,120,0.1),rgba(90,155,105,0.04))'},
  {href:'/growth-video',icon:'🎬',title:'成长纪念视频',desc:'12天浓缩60秒自动生成',color:'#9880c8',gradient:'linear-gradient(135deg,rgba(152,128,200,0.1),rgba(135,110,180,0.04))'},
  {href:'/penpal-square',icon:'💌',title:'笔友匹配',desc:'AI匹配 · 跨届笔友通信',color:'#e8b840',gradient:'linear-gradient(135deg,rgba(232,184,64,0.1),rgba(220,165,50,0.04))'},
  {href:'/letters',icon:'✉️',title:'AI临别信',desc:'5种语气 · 流式生成 · 导出PDF',color:'#d86888',gradient:'linear-gradient(135deg,rgba(216,104,136,0.1),rgba(200,90,120,0.04))'},
]

export default function AIWorkshopPage() {
  return (<InnerLayout>
    <header className="flex items-center justify-between pb-[22px] mb-5 flex-wrap gap-3 relative" style={{borderBottom:'1.5px solid rgba(180,160,130,0.25)'}}>
      <div>
        <h1 className="text-[19px] font-semibold tracking-[0.03em] text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>
          ✨ AI 工坊
        </h1>
        <p className="text-[11px] mt-0.5 tracking-[0.06em]" style={{color:'var(--faded)'}}>
          8大AI创意功能 · 渗透支教每一个角落 · 每个功能都有离线降级方案
        </p>
      </div>
      <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 text-[7px] tracking-[7px] whitespace-nowrap" style={{color:'rgba(180,160,130,0.5)'}}>· · · · · · · · · · · ·</div>
    </header>

    <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
      {TOOLS.map((t,i)=>(
        <Link key={t.href} href={t.href} className="no-underline" style={{transform:`rotate(${i%2===0?'-0.25deg':'0.2deg'})`,transition:'all 0.3s'}}>
          <div className="picture-book-card tape-top p-5 h-full cursor-pointer hover:-translate-y-1.5 hover:shadow-lg transition-all duration-400 group overflow-hidden">
            {/* Color gradient header bar */}
            <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{background:t.color}}/>
            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-transform duration-400 group-hover:scale-110 group-hover:-translate-y-1" style={{background:t.gradient,border:`1.5px solid ${t.color}20`}}>{t.icon}</div>
            {/* Title + desc */}
            <h3 className="text-[15px] font-semibold tracking-[0.04em] mb-1.5 text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>{t.title}</h3>
            <p className="text-[12px] leading-relaxed mb-3" style={{color:'var(--ink-faint)'}}>{t.desc}</p>
            {/* Action */}
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                {[0,1,2].map(d=>(<div key={d} className="w-1.5 h-1.5 rounded-full opacity-30" style={{background:t.color}}/>))}
              </div>
              <span className="handwriting text-[12px] opacity-0 group-hover:opacity-100 transition-all duration-400 group-hover:translate-x-1" style={{color:t.color}}>
                打开 →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>

    {/* Footer */}
    <div className="mt-8 picture-book-card p-5 text-center" style={{background:'linear-gradient(135deg,rgba(240,230,215,0.2),rgba(235,225,210,0.1))'}}>
      <p className="text-[12px] tracking-[0.06em]" style={{color:'var(--ink-faint)'}}>
        🤖 所有AI功能均支持离线降级——当网络不可用时自动切换本地模板
      </p>
    </div>
  </InnerLayout>)
}
