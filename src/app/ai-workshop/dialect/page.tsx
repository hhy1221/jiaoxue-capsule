'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { MOCK_DIALECT_ENTRIES } from '@/lib/mock-data'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import AddDialectWordForm from '@/components/forms/AddDialectWordForm'
import { ArrowLeftRight } from 'lucide-react'

export default function DialectPage() {
  const [input, setInput] = useState('')
  const [showAddWord, setShowAddWord] = useState(false)
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const translate = () => { setLoading(true); setTimeout(()=>{setResult(input+' → 要得！巴适得很！'); setLoading(false)}, 1000) }
  return (<InnerLayout>
    <div className="max-w-4xl"><div className="mb-8"><h1 className="text-[28px] font-bold text-[var(--text)] tracking-wide" style={{fontFamily:"var(--font-serif)"}}>🗣️ 方言翻译官</h1><p className="text-[13px] text-[var(--text-muted)] tracking-wider mt-1">普通话 ↔ 四川话 · AI实时翻译 · 记录本地方言</p></div>
    <Tabs defaultValue="translate">
      <TabsList className="bg-[var(--bg)] border border-[var(--border)] mb-6"><TabsTrigger value="translate" className="text-[12px]">🔤 翻译</TabsTrigger><TabsTrigger value="dictionary" className="text-[12px]">📖 方言词典</TabsTrigger></TabsList>
      <TabsContent value="translate">
        <Card className="border-[var(--border)] bg-[var(--surface)] mb-6"><CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4 flex-wrap"><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&translate()} placeholder="输入要翻译的文字..." className="flex-1 min-w-[200px] px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[14px] text-[var(--text)] outline-none focus:border-[var(--primary)]"/><button onClick={translate} disabled={!input.trim()||loading} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--primary)] text-white border-none cursor-pointer text-[13px] font-medium disabled:opacity-50"><ArrowLeftRight size={14}/>{loading?'翻译中...':'翻译'}</button></div>
          {result&&<div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)]"><p className="text-[14px] text-[var(--text)]">{result}</p></div>}
        </CardContent></Card>
      </TabsContent>
      <TabsContent value="dictionary">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">
          {MOCK_DIALECT_ENTRIES.map(d=>(<Card key={d.id} className="border-[var(--border)] bg-[var(--surface)] hover:-translate-y-1 hover:shadow-md transition-all"><CardContent className="p-4"><div className="flex items-center justify-between mb-2"><span className="text-[16px] font-semibold text-[var(--text)]">{d.dialect}</span><Badge variant="outline" className="text-[9px]">{d.category}</Badge></div><p className="text-[11px] text-[var(--text-muted)]">{d.mandarin}</p>{d.usage&&<p className="text-[11px] text-[var(--text-secondary)] mt-1 italic">"{d.usage}"</p>}<Badge className="mt-2 text-[9px]" variant="secondary">{d.dialectType}</Badge></CardContent></Card>))}
        </div>
        <button className="mt-4 px-4 py-2 rounded-xl border border-dashed border-[var(--border)] text-[var(--text-muted)] text-[12px] tracking-wider bg-transparent cursor-pointer hover:bg-[var(--bg)]" onClick={()=>setShowAddWord(true)}>+ 添加方言词汇</button>
      </TabsContent>
    </Tabs></div><AddDialectWordForm open={showAddWord} onClose={()=>setShowAddWord(false)} /></InnerLayout>)
}
