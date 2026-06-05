'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'
import CastingCircle from '@/components/animations/CastingCircle'
import InkReveal from '@/components/animations/InkReveal'

export default function LessonGenPage() {
  const [topic, setTopic] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generate = async () => {
    if (!topic.trim()) return
    setLoading(true); setResult(''); setError('')
    try {
      const res = await fetch('/api/ai/lesson-gen', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: topic.trim() })
      })
      const data = await res.json()
      if (data.success) setResult(data.content)
      else setError(data.error || '生成失败')
    } catch { setError('网络错误') }
    finally { setLoading(false) }
  }

  return (<InnerLayout>
    <div className="max-w-3xl"><div className="mb-8"><h1 className="text-[28px] font-bold text-[var(--text)] tracking-wide" style={{fontFamily:"var(--font-serif)"}}>📖 课件助手</h1><p className="text-[13px] text-[var(--text-muted)] tracking-wider mt-1">输入主题→AI DeepSeek生成完整课程大纲</p></div>
    <Card className="border-[var(--border)] bg-[var(--surface)] mb-6"><CardContent className="p-6"><div className="flex gap-3 flex-wrap"><input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="例: 本地茶叶文化 面向2-4年级" className="flex-1 min-w-[200px] px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[13px] text-[var(--text)] outline-none focus:border-[var(--primary)] transition-colors" style={{fontFamily:'inherit'}}/>
    <button onClick={generate} disabled={!topic.trim()||loading} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white border-none cursor-pointer text-[13px] font-medium disabled:opacity-50">
      {loading?<><Loader2 size={14} className="animate-spin"/>生成中...</>:<><Sparkles size={14}/>生成课件</>}
    </button></div>{error&&<p className="text-[12px] text-red-500 mt-2">{error}</p>}</CardContent></Card>
    {loading && <Card className="border-[var(--border)] bg-[var(--surface)] mb-4"><CardContent className="p-6"><CastingCircle active={true} label="AI DeepSeek 正在设计课程大纲…" /></CardContent></Card>}
    {result && <InkReveal show={!!result}><Card className="border-[var(--border)] bg-[var(--surface)]"><CardContent className="p-6"><div className="flex items-center gap-2 mb-3"><Sparkles size={14} className="text-[var(--primary)]"/><span className="text-[12px] font-semibold text-[var(--primary)] tracking-wider">AI DeepSeek 生成结果</span></div><div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)]"><pre className="text-[13px] text-[var(--text)] leading-relaxed whitespace-pre-wrap" style={{fontFamily:'var(--font-serif)'}}>{result}</pre></div><div className="flex gap-2 mt-3"><button className="px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-[12px] tracking-wider border-none cursor-pointer">保存课件</button><button onClick={generate} className="px-4 py-2 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] text-[12px] tracking-wider bg-transparent cursor-pointer">重新生成</button></div></CardContent></Card></InkReveal>}
    </div></InnerLayout>)
}
