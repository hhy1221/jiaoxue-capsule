'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import { Sparkles } from 'lucide-react'

const MOCK_PLAN = { goal:'了解筠连红茶的历史与制作工艺，培养对家乡文化的自豪感', sections:[{title:'认识红茶',time:'10分钟',desc:'展示红茶图片，提问"你们家里谁喝茶？"→引导学生分享',materials:'红茶样品、图片'},{title:'采茶故事',time:'10分钟',desc:'讲筠连采茶的故事，请学生模仿采茶动作，活跃气氛',materials:'无'},{title:'泡茶体验',time:'12分钟',desc:'老师现场泡茶，每组分一小杯品尝。安全提醒：水很烫！',materials:'热水壶、一次性杯子、茶叶'},{title:'画茶',time:'8分钟',desc:'每人画一幅"我心中的茶园"，下课贴在墙上',materials:'画纸、彩笔'}],interactions:['选择题: 筠连最有名的是什么茶？A绿茶 B红茶 C花茶 (答案:B)','开放题: 你家里有谁爱喝茶？他们怎么喝的？','动作题: 谁来模仿一下采茶的动作？'],safety:'泡茶环节务必由老师操作，禁止学生触碰热水壶。确保水温适宜后再给学生品尝。',homework:'回家问爷爷奶奶：我们筠连种茶有多久了？明天来分享'}

export default function LessonGenPage() {
  const [topic, setTopic] = useState('')
  const [result, setResult] = useState<typeof MOCK_PLAN|null>(null)
  const [loading, setLoading] = useState(false)
  return (<InnerLayout>
    <div className="max-w-3xl"><div className="mb-8"><h1 className="text-[28px] font-bold text-[var(--text)] tracking-wide" style={{fontFamily:"var(--font-serif)"}}>📖 课件助手</h1><p className="text-[13px] text-[var(--text-muted)] tracking-wider mt-1">输入主题→5秒生成完整课程大纲</p></div>
    <Card className="border-[var(--border)] bg-[var(--surface)] mb-6"><CardContent className="p-6"><div className="flex gap-3 flex-wrap"><input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="例: 筠连红茶 面向2-4年级" className="flex-1 min-w-[200px] px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[13px] text-[var(--text)] outline-none focus:border-[var(--primary)] transition-colors"/><button onClick={()=>{setLoading(true);setTimeout(()=>{setResult(MOCK_PLAN);setLoading(false)},1500)}} disabled={!topic.trim()||loading} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white border-none cursor-pointer text-[13px] font-medium disabled:opacity-50"><Sparkles size={14}/>生成课件</button></div></CardContent></Card>
    {loading&&<Card className="border-[var(--border)] bg-[var(--surface)] mb-4"><CardContent className="p-6"><div className="flex items-center gap-3"><div className="w-6 h-6 rounded-full border-2 border-[var(--primary)] border-t-transparent animate-spin"/><p className="text-[13px] text-[var(--text-muted)]">正在设计课程大纲...</p></div></CardContent></Card>}
    {result&&<Card className="border-[var(--border)] bg-[var(--surface)]"><CardContent className="p-6"><h3 className="text-[16px] font-semibold text-[var(--text)] mb-1">课程目标</h3><p className="text-[13px] text-[var(--text-secondary)] mb-4">{result.goal}</p>
    <h3 className="text-[16px] font-semibold text-[var(--text)] mb-2">课程结构</h3>
    <div className="space-y-2 mb-4">{result.sections.map((s,i)=>(<div key={i} className="p-3 rounded-xl bg-[var(--bg)] border border-[var(--border)]"><div className="flex items-center justify-between mb-1"><span className="text-[13px] font-semibold text-[var(--text)]">{i+1}. {s.title}</span><Badge variant="outline" className="text-[10px]">{s.time}</Badge></div><p className="text-[12px] text-[var(--text-secondary)]">{s.desc}</p><p className="text-[10px] text-[var(--text-muted)] mt-1">教具: {s.materials}</p></div>))}</div>
    <h3 className="text-[16px] font-semibold text-[var(--text)] mb-2">互动环节</h3><div className="space-y-1 mb-4">{result.interactions.map((q,i)=>(<p key={i} className="text-[12px] text-[var(--text-secondary)]">• {q}</p>))}</div>
    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 mb-3"><p className="text-[12px] text-amber-700 font-medium">⚠️ 安全提醒</p><p className="text-[12px] text-amber-600">{result.safety}</p></div>
    <div className="p-3 rounded-xl bg-green-50 border border-green-200"><p className="text-[12px] text-green-700 font-medium">🏠 课后小练习</p><p className="text-[12px] text-green-600">{result.homework}</p></div>
    </CardContent></Card>}
    </div></InnerLayout>)
}
