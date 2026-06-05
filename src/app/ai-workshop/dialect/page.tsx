'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'
import CastingCircle from '@/components/animations/CastingCircle'
import InkReveal from '@/components/animations/InkReveal'

const DIALECTS = ['四川话','河南话','粤语','闽南语','陕西话','云南话','青海话','甘肃话','贵州话','湖北话']

export default function DialectPage() {
  const [text, setText] = useState('')
  const [dialectType, setDialectType] = useState('四川话')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const translate = async () => {
    if (!text.trim()) return
    setLoading(true); setResult(''); setError('')
    try {
      const res = await fetch('/api/ai/dialect', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim(), dialectType })
      })
      const data = await res.json()
      if (data.success) setResult(data.content)
      else setError(data.error || '翻译失败')
    } catch { setError('网络错误') }
    finally { setLoading(false) }
  }

  return (<InnerLayout>
    <div className="max-w-3xl"><div className="mb-8"><h1 className="text-[28px] font-bold text-[var(--text)] tracking-wide" style={{fontFamily:"var(--font-serif)"}}>🗣️ 方言翻译官</h1><p className="text-[13px] text-[var(--text-muted)] tracking-wider mt-1">普通话↔各地方言实时互译 · AI DeepSeek · 附文化注释</p></div>
    <Card className="border-[var(--border)] bg-[var(--surface)] mb-6"><CardContent className="p-6">
      <div className="flex gap-2 mb-3 flex-wrap">
        {DIALECTS.map(d=>(<button key={d} onClick={()=>setDialectType(d)} className="px-3 py-1.5 rounded-full text-[11px] border cursor-pointer transition-all" style={{background:dialectType===d?'var(--primary)':'transparent',color:dialectType===d?'#fff':'var(--text-secondary)',borderColor:dialectType===d?'var(--primary)':'var(--border)',fontFamily:'inherit'}}>{d}</button>))}
      </div>
      <textarea value={text} onChange={e=>setText(e.target.value)} rows={3} placeholder="输入普通话文本…" className="w-full p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[14px] text-[var(--text)] resize-none outline-none focus:border-[var(--primary)] transition-colors" style={{fontFamily:'inherit'}}/>
      <div className="mt-3"><button onClick={translate} disabled={!text.trim()||loading} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white border-none cursor-pointer text-[13px] font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
        {loading?<><Loader2 size={14} className="animate-spin"/>翻译中...</>:<><Sparkles size={14}/>翻译成{dialectType}</>}
      </button>{error&&<p className="text-[12px] text-red-500 mt-2">{error}</p>}</div>
    </CardContent></Card>
    {loading && <Card className="border-[var(--border)] bg-[var(--surface)] mb-4"><CardContent className="p-6"><CastingCircle active={true} label="AI 正在翻译成方言…" /></CardContent></Card>}
    {result && <InkReveal show={!!result}><Card className="border-[var(--border)] bg-[var(--surface)]"><CardContent className="p-6"><div className="flex items-center gap-2 mb-3"><Sparkles size={14} className="text-[var(--primary)]"/><span className="text-[12px] font-semibold text-[var(--primary)] tracking-wider">AI 翻译结果</span></div><div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)]"><pre className="text-[14px] text-[var(--text)] leading-relaxed whitespace-pre-wrap" style={{fontFamily:'var(--font-serif)'}}>{result}</pre></div></CardContent></Card></InkReveal>}
    </div></InnerLayout>)
}
