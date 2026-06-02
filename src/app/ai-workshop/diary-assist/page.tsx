'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'
import { Mic, Sparkles } from 'lucide-react'
import CastingCircle from '@/components/animations/CastingCircle'
import InkReveal from '@/components/animations/InkReveal'
export default function DiaryAssistPage() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const generate = () => { setLoading(true); setResult(''); setTimeout(()=>{setResult(`今天在数学课上，${input.slice(0,20)||'小明'}表现出了很好的专注力和求知欲。课间他还主动帮同桌整理书包，展现了他的细心和善良。\n\n建议标签: 乐于助人、专注力好、有责任心`); setLoading(false)}, 2000) }
  return (<InnerLayout>
    <div className="max-w-3xl"><div className="mb-8"><h1 className="text-[28px] font-bold text-[var(--text)] tracking-wide" style={{fontFamily:"var(--font-serif)"}}>📝 智能评语</h1><p className="text-[13px] text-[var(--text-muted)] tracking-wider mt-1">老师说10个字，AI扩写成200字评语</p></div>
    <Card className="border-[var(--border)] bg-[var(--surface)] mb-6"><CardContent className="p-6"><label className="text-[13px] font-medium text-[var(--text)] tracking-wide mb-3 block">描述今天观察到的事</label><textarea value={input} onChange={e=>setInput(e.target.value)} rows={4} className="w-full p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[14px] text-[var(--text)] resize-none outline-none focus:border-[var(--primary)] transition-colors" placeholder='例: 今天小明主动帮同学搬桌子，还教同桌做数学题'/><div className="flex gap-3 mt-3 flex-wrap"><button className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] bg-transparent cursor-pointer hover:bg-[var(--bg)] text-[12px] tracking-wider"><Mic size={14}/>语音输入</button><button onClick={generate} disabled={!input.trim()||loading} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white border-none cursor-pointer text-[13px] font-medium tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50"><Sparkles size={14}/>{loading?'AI 正在扩写...':'✨ AI 扩写评语'}</button></div></CardContent></Card>
    {loading && <Card className="border-[var(--border)] bg-[var(--surface)] mb-4"><CardContent className="p-6"><CastingCircle active={true} label="AI 正在根据学生档案扩写评语…" /></CardContent></Card>}
    {result && <InkReveal show={!!result}><Card className="border-[var(--border)] bg-[var(--surface)]"><CardContent className="p-6"><div className="flex items-center gap-2 mb-3"><Sparkles size={14} className="text-[var(--primary)]"/><span className="text-[12px] font-semibold text-[var(--primary)] tracking-wider">AI 生成结果</span></div><div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)]"><p className="text-[14px] text-[var(--text)] leading-relaxed whitespace-pre-line" style={{fontFamily:"var(--font-serif)"}}>{result}</p></div><div className="flex gap-2 mt-3"><button className="px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-[12px] tracking-wider border-none cursor-pointer">保存评语</button><button className="px-4 py-2 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] text-[12px] tracking-wider bg-transparent cursor-pointer">重新生成</button></div></CardContent></Card></InkReveal>}
    </div></InnerLayout>)
}
