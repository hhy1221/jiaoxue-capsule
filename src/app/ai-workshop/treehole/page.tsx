'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { MOCK_TREEHOLE_MESSAGES } from '@/lib/mock-data'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import CastingCircle from '@/components/animations/CastingCircle'

export default function TreeholePage() {
  const [input, setInput] = useState('')
  const [visibility, setVisibility] = useState<'ai_only'|'whole_team'>('ai_only')
  const [posts, setPosts] = useState(MOCK_TREEHOLE_MESSAGES)
  const [loading, setLoading] = useState(false)
  const post = () => { if(!input.trim()) return; setLoading(true); setTimeout(()=>{setPosts(prev=>[{id:'th'+Date.now(),teamId:'t1',anonymousAlias:['小叶子','小山鹰','小星星','小月亮'][Math.floor(Math.random()*4)],anonymousAvatar:['🍃','🦅','⭐','🌙'][Math.floor(Math.random()*4)],content:input,visibility,reply:'听到你的心声了。支教路上，你不是一个人。每一份付出，都在孩子们心里种下了种子。',replyType:'ai',createdAt:new Date().toLocaleDateString()},...prev]); setInput(''); setLoading(false)}, 1500) }
  return (<InnerLayout>
    <div className="max-w-3xl"><div className="mb-8"><h1 className="text-[28px] font-bold text-[var(--text)] tracking-wide" style={{fontFamily:"var(--font-serif)"}}>🌳 树洞信箱</h1><p className="text-[13px] text-[var(--text-muted)] tracking-wider mt-1">在这里，说出心里话。老师也需要被倾听。</p></div>
    <Card className="border-[var(--border)] bg-[var(--surface)] mb-6"><CardContent className="p-6"><textarea value={input} onChange={e=>setInput(e.target.value)} rows={4} className="w-full p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[14px] text-[var(--text)] resize-none outline-none focus:border-[var(--primary)] transition-colors" placeholder="今天想说什么？开心的、烦恼的、感动的..."/><div className="flex gap-4 mt-3 mb-4 flex-wrap"><label className="flex items-center gap-2 cursor-pointer text-[12px] text-[var(--text-secondary)]"><input type="radio" name="vis" checked={visibility==='ai_only'} onChange={()=>setVisibility('ai_only')}/>只给树洞（AI回复）</label><label className="flex items-center gap-2 cursor-pointer text-[12px] text-[var(--text-secondary)]"><input type="radio" name="vis" checked={visibility==='whole_team'} onChange={()=>setVisibility('whole_team')}/>匿名发到全队</label></div><button onClick={post} disabled={!input.trim()||loading} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--primary)] text-white border-none cursor-pointer text-[13px] font-medium disabled:opacity-50 hover:opacity-90 transition-opacity">🌱 {loading?'投入中...':'投入树洞'}</button>{loading && <CastingCircle active={true} label="树洞正在倾听…" />}</CardContent></Card>
    <div className="space-y-4"><h3 className="text-[16px] font-semibold text-[var(--text)] tracking-wide">树洞里的回声</h3>
    {posts.map(m=>(<Card key={m.id} className="border-[var(--border)] bg-[var(--surface)]"><CardContent className="p-5"><div className="flex items-center gap-3 mb-3"><span className="text-2xl">{m.anonymousAvatar}</span><div><p className="text-[13px] font-semibold text-[var(--text)]">{m.anonymousAlias}</p><p className="text-[10px] text-[var(--text-muted)]">{m.createdAt} · {m.visibility==='ai_only'?'仅树洞':'全队可见'}</p></div></div><p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-3">{m.content}</p>{m.reply&&<div className="ml-4 p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)]"><div className="flex items-center gap-2 mb-1">{m.replyType==='ai'?<Badge className="text-[9px] px-1.5 py-0 bg-purple-50 text-purple-600 border-purple-200">🤖 AI回复</Badge>:<Badge className="text-[9px] px-1.5 py-0 bg-green-50 text-green-600 border-green-200">👤 队友回复</Badge>}</div><p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{m.reply}</p></div>}</CardContent></Card>))}</div>
    </div></InnerLayout>)
}
