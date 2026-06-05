'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'
import { Mic, Sparkles, Loader2 } from 'lucide-react'
import CastingCircle from '@/components/animations/CastingCircle'
import InkReveal from '@/components/animations/InkReveal'

export default function DiaryAssistPage() {
  const [input, setInput] = useState('')
  const [studentName, setStudentName] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generate = async () => {
    if (!input.trim()) return
    setLoading(true); setResult(''); setError('')
    try {
      const res = await fetch('/api/ai/diary-assist', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: input.trim(), studentName: studentName.trim() || undefined })
      })
      const data = await res.json()
      if (data.success) setResult(data.content)
      else setError(data.error || '生成失败')
    } catch { setError('网络错误，请检查连接') }
    finally { setLoading(false) }
  }

  return (<InnerLayout>
    <div className="max-w-3xl"><div className="mb-8"><h1 className="text-[28px] font-bold text-[var(--text)] tracking-wide" style={{fontFamily:"var(--font-serif)"}}>📝 智能评语</h1><p className="text-[13px] text-[var(--text-muted)] tracking-wider mt-1">老师说10个字→AI DeepSeek扩写成完整评语</p></div>
    <Card className="border-[var(--border)] bg-[var(--surface)] mb-6"><CardContent className="p-6">
      <div className="flex gap-3 mb-3">
        <input value={studentName} onChange={e=>setStudentName(e.target.value)} placeholder="学生姓名（选填）" className="w-[140px] px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[13px] text-[var(--text)] outline-none focus:border-[var(--primary)] transition-colors" style={{fontFamily:'inherit'}}/>
      </div>
      <textarea value={input} onChange={e=>setInput(e.target.value)} rows={4} className="w-full p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[14px] text-[var(--text)] resize-none outline-none focus:border-[var(--primary)] transition-colors" placeholder='例: 今天小明主动帮同学搬桌子，还教同桌做数学题' style={{fontFamily:'inherit'}}/>
      <div className="flex gap-3 mt-3 flex-wrap">
        <button className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] bg-transparent cursor-pointer hover:bg-[var(--bg)] text-[12px] tracking-wider"><Mic size={14}/>语音输入</button>
        <button onClick={generate} disabled={!input.trim()||loading} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white border-none cursor-pointer text-[13px] font-medium tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50">
          {loading ? <><Loader2 size={14} className="animate-spin"/> AI 正在生成...</> : <><Sparkles size={14}/>✨ AI 扩写评语</>}
        </button>
      </div>
      {error && <p className="text-[12px] text-red-500 mt-2">{error}</p>}
    </CardContent></Card>
    {loading && <Card className="border-[var(--border)] bg-[var(--surface)] mb-4"><CardContent className="p-6"><CastingCircle active={true} label="AI DeepSeek 正在根据学生档案扩写评语…" /></CardContent></Card>}
    {result && <InkReveal show={!!result}><Card className="border-[var(--border)] bg-[var(--surface)]"><CardContent className="p-6"><div className="flex items-center gap-2 mb-3"><Sparkles size={14} className="text-[var(--primary)]"/><span className="text-[12px] font-semibold text-[var(--primary)] tracking-wider">AI DeepSeek 生成结果</span></div><div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)]"><p className="text-[14px] text-[var(--text)] leading-relaxed whitespace-pre-line" style={{fontFamily:"var(--font-serif)"}}>{result}</p></div><div className="flex gap-2 mt-3"><button className="px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-[12px] tracking-wider border-none cursor-pointer">保存评语</button><button onClick={generate} className="px-4 py-2 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] text-[12px] tracking-wider bg-transparent cursor-pointer">重新生成</button></div></CardContent></Card></InkReveal>}
    </div></InnerLayout>)
}
