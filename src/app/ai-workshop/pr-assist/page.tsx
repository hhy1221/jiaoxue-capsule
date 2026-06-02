'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import CastingCircle from '@/components/animations/CastingCircle'
const MOCK_PR = { wechat:'【筠连支教Day5】今天运动会，60个孩子没有一个掉队🏃‍♂️\n\n最感动的瞬间：浩然带着一年级的同学喊口号，嗓子都哑了还在喊——他才10岁，已经像个真正的队长。\n\n配图建议：运动会全景/浩然带队/欣怡跳远\n\n#凡星支教 #筠连夏令营 #乡村教育', pengyouquan:'看到孩子们在操场上奔跑的样子，觉得所有熬夜备课都值了 ❤️ 筠连的夏天，因为有你们而发光 ✨', xiaohongshu:'📸 支教第5天 · 运动会特辑\n\n🌟今日最佳：浩然童鞋的队长首秀\n💪 60个娃没有一个喊累\n😭 欣怡跑了最后一名但笑到模糊\n\n#支教日记 #凡星支教队 #筠连', script:'[0-5秒] 操场全景+孩子们热身\n[5-15秒] 接力赛精彩片段\n[15-25秒] 浩然带队喊口号特写\n[25-30秒] 颁奖+大合影' }
export default function PRAssistPage() {
  const [result, setResult] = useState<typeof MOCK_PR|null>(null)
  const [loading, setLoading] = useState(false)
  return (<InnerLayout>
    <div className="max-w-3xl"><div className="mb-8"><h1 className="text-[28px] font-bold text-[var(--text)] tracking-wide" style={{fontFamily:"var(--font-serif)"}}>📣 宣传助手</h1><p className="text-[13px] text-[var(--text-muted)] tracking-wider mt-1">一键生成微信推文/朋友圈/小红书/短视频脚本</p></div>
    <Card className="border-[var(--border)] bg-[var(--surface)] mb-6"><CardContent className="p-6"><button onClick={()=>{setLoading(true);setTimeout(()=>{setResult(MOCK_PR);setLoading(false)},1500)}} disabled={loading} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--primary)] text-white border-none cursor-pointer text-[14px] font-medium disabled:opacity-50"><Sparkles size={16}/>{loading?'AI 正在生成...':'✨ AI 一键生成全部文案'}</button><p className="text-[12px] text-[var(--text-muted)] mt-3">AI会从照片库+评语库中提取素材，生成适配各平台的宣传文案</p>{loading && <CastingCircle active={true} label="AI 正在分析素材生成文案…" />}</CardContent></Card>
    {result&&<div className="space-y-4">{[{t:'📱 微信推文',c:result.wechat},{t:'💬 朋友圈',c:result.pengyouquan},{t:'📕 小红书',c:result.xiaohongshu},{t:'🎬 短视频脚本',c:result.script}].map(r=>(<Card key={r.t} className="border-[var(--border)] bg-[var(--surface)]"><CardContent className="p-5"><h3 className="text-[14px] font-semibold text-[var(--text)] mb-3">{r.t}</h3><pre className="text-[12px] text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap font-sans">{r.c}</pre><button className="mt-3 text-[11px] text-[var(--primary)] bg-transparent border-none cursor-pointer hover:underline">📋 复制文案</button></CardContent></Card>))}</div>}
    </div></InnerLayout>)
}
