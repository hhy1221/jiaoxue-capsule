'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'
import CastingCircle from '@/components/animations/CastingCircle'
import InkReveal from '@/components/animations/InkReveal'

export default function PRAssistPage() {
  const [topic, setTopic] = useState('')
  const [highlights, setHighlights] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generate = async () => {
    if (!topic.trim()) return
    setLoading(true); setResult(''); setError('')
    try {
      const res = await fetch('/api/ai/pr-assist', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: topic.trim(), highlights: highlights.trim(), teamName: '凡星支教队' })
      })
      const data = await res.json()
      if (data.success) setResult(data.content)
      else setError(data.error || '生成失败')
    } catch { setError('网络错误') }
    finally { setLoading(false) }
  }

  return (<InnerLayout>
    <div className="max-w-3xl"><div className="mb-8"><h1 className="text-[28px] font-bold text-[var(--text)] tracking-wide" style={{fontFamily:"var(--font-serif)"}}>📣 宣传助手</h1><p className="text-[13px] text-[var(--text-muted)] tracking-wider mt-1">输入活动信息→AI生成微信推文+朋友圈+小红书文案</p></div>
    <Card className="border-[var(--border)] bg-[var(--surface)] mb-6"><CardContent className="p-6">
      <input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="活动主题（例：支教Day5运动会）" className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[13px] text-[var(--text)] outline-none focus:border-[var(--primary)] transition-colors mb-3" style={{fontFamily:'inherit'}}/>
      <textarea value={highlights} onChange={e=>setHighlights(e.target.value)} rows={3} placeholder="活动亮点（选填）" className="w-full p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[14px] text-[var(--text)] resize-none outline-none focus:border-[var(--primary)] transition-colors" style={{fontFamily:'inherit'}}/>
      <div className="mt-3"><button onClick={generate} disabled={!topic.trim()||loading} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white border-none cursor-pointer text-[13px] font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
        {loading?<><Loader2 size={14} className="animate-spin"/>生成中...</>:<><Sparkles size={14}/>✨ 生成文案</>}
      </button>{error&&<p className="text-[12px] text-red-500 mt-2">{error}</p>}</div>
    </CardContent></Card>
    {loading && <Card className="border-[var(--border)] bg-[var(--surface)] mb-4"><CardContent className="p-6"><CastingCircle active={true} label="AI DeepSeek 正在撰写宣传文案…" /></CardContent></Card>}
    {result && <InkReveal show={!!result}><Card className="border-[var(--border)] bg-[var(--surface)]"><CardContent className="p-6"><div className="flex items-center gap-2 mb-3"><Sparkles size={14} className="text-[var(--primary)]"/><span className="text-[12px] font-semibold text-[var(--primary)] tracking-wider">AI 生成结果</span></div><div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)]"><pre className="text-[13px] text-[var(--text)] leading-relaxed whitespace-pre-wrap" style={{fontFamily:'var(--font-serif)'}}>{result}</pre></div><div className="flex gap-2 mt-3"><button className="px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-[12px] tracking-wider border-none cursor-pointer" onClick={()=>navigator.clipboard.writeText(result)}>复制全部</button><button onClick={generate} className="px-4 py-2 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] text-[12px] tracking-wider bg-transparent cursor-pointer">重新生成</button></div></CardContent></Card></InkReveal>}
    </div></InnerLayout>)
}
