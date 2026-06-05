'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'
import { Sparkles, Loader2, Send } from 'lucide-react'
import CastingCircle from '@/components/animations/CastingCircle'
import InkReveal from '@/components/animations/InkReveal'

export default function TreeholePage() {
  const [message, setMessage] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [history, setHistory] = useState<{q:string;a:string}[]>([])

  const submit = async () => {
    if (!message.trim()) return
    const q = message.trim()
    setMessage('')
    setLoading(true); setResult(''); setError('')
    try {
      const res = await fetch('/api/ai/treehole', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: q })
      })
      const data = await res.json()
      if (data.success) {
        setResult(data.content)
        setHistory(prev => [...prev, { q, a: data.content }].slice(-10))
      }
      else setError(data.error || '回复失败')
    } catch { setError('网络错误') }
    finally { setLoading(false) }
  }

  return (<InnerLayout>
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">🌳</div>
        <h1 className="text-[28px] font-bold text-[var(--text)] tracking-wide" style={{fontFamily:"var(--font-serif)"}}>树洞信箱</h1>
        <p className="text-[13px] text-[var(--text-muted)] tracking-wider mt-1">匿名倾诉 · AI DeepSeek 共情回复 · 这里很安全</p>
      </div>

      {/* 输入区 */}
      <Card className="border-[var(--border)] bg-[var(--surface)] mb-6"><CardContent className="p-6">
        <textarea value={message} onChange={e=>setMessage(e.target.value)} rows={4} placeholder="在这里写下你想说的话…一切都会匿名处理。" className="w-full p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[14px] text-[var(--text)] resize-none outline-none focus:border-[var(--primary)] transition-colors" style={{fontFamily:'inherit'}}/>
        <div className="flex justify-end mt-3">
          <button onClick={submit} disabled={!message.trim()||loading} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white border-none cursor-pointer text-[13px] font-medium hover:opacity-90 disabled:opacity-50">
            {loading?<><Loader2 size={14} className="animate-spin"/>树洞倾听中...</>:<><Send size={14}/>投入树洞</>}
          </button>
        </div>
        {error&&<p className="text-[12px] text-red-500 mt-2">{error}</p>}
      </CardContent></Card>

      {loading && <Card className="border-[var(--border)] bg-[var(--surface)] mb-4"><CardContent className="p-6"><CastingCircle active={true} label="树洞正在倾听你的声音…" /></CardContent></Card>}

      {/* 当前回复 */}
      {result && <InkReveal show={!!result}>
        <Card className="border-[var(--border)] bg-[var(--surface)] mb-4"><CardContent className="p-6">
          <div className="flex items-center gap-2 mb-3"><Sparkles size={14} className="text-[var(--primary)]"/><span className="text-[12px] font-semibold text-[var(--primary)] tracking-wider">🌳 树洞的回复</span></div>
          <div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)]"><p className="text-[14px] text-[var(--text)] leading-relaxed whitespace-pre-line" style={{fontFamily:'var(--font-serif)'}}>{result}</p></div>
        </CardContent></Card>
      </InkReveal>}

      {/* 历史 */}
      {history.length > 0 && <div className="space-y-3 mt-6">
        <h3 className="text-[13px] font-semibold text-[var(--text-muted)] tracking-wider">📝 历史倾诉</h3>
        {[...history].reverse().map((h,i)=>(<Card key={i} className="border-[var(--border)] bg-[var(--surface)] opacity-70"><CardContent className="p-5"><p className="text-[12px] text-[var(--text-muted)] mb-2 italic">"…{h.q.slice(0,80)}…"</p><p className="text-[13px] text-[var(--text)] leading-relaxed">{h.a.slice(0,120)}…</p></CardContent></Card>))}
      </div>}
    </div></InnerLayout>)
}
