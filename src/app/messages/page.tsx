'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { MOCK_CONVERSATIONS, MOCK_MESSAGES, MOCK_MEMBERS } from '@/lib/mock-data'
import { useState } from 'react'
import { Send, Undo2 } from 'lucide-react'
import { useToast } from '@/components/animations/Toast'

export default function MessagesPage() {
  const [activeConv, setActiveConv] = useState(MOCK_CONVERSATIONS[0].id)
  const [newMsg, setNewMsg] = useState('')
  const [msgs, setMsgs] = useState(MOCK_MESSAGES)
  const [recalled, setRecalled] = useState<Set<string>>(new Set())
  const [hoveredMsg, setHoveredMsg] = useState<string | null>(null)
  const { toast } = useToast()
  const conv = MOCK_CONVERSATIONS.find(c=>c.id===activeConv)!
  const messages = msgs[activeConv] || []

  const sendMsg = () => {
    if(!newMsg.trim()) return
    const id = 'msg'+Date.now()
    setMsgs(prev=>({...prev,[activeConv]:[...(prev[activeConv]||[]),{
      id, conversationId:activeConv, senderId:'u1',
      senderName:'黄寒阳', content:newMsg, createdAt:new Date().toLocaleTimeString()
    }]}))
    setNewMsg('')
  }

  const recallMsg = (msgId: string) => {
    setRecalled(prev => new Set(prev).add(msgId))
    toast('消息已撤回', 'info')
  }

  return (<InnerLayout>
    <header className="flex items-center justify-between pb-[22px] mb-5 flex-wrap gap-3 relative"
      style={{ borderBottom: '1.5px solid rgba(180,160,130,0.25)' }}>
      <div>
        <h1 className="text-[19px] font-semibold tracking-[0.03em] text-[var(--ink)]"
          style={{ fontFamily: "var(--font-serif)" }}>💬 消息</h1>
        <p className="text-[11px] mt-0.5 tracking-[0.06em]" style={{ color: 'var(--faded)' }}>
          {MOCK_CONVERSATIONS.length}个对话
        </p>
      </div>
      <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 text-[7px] tracking-[7px] whitespace-nowrap"
        style={{ color: 'rgba(180,160,130,0.5)' }}>· · · · · · · · · · · ·</div>
    </header>

    <div className="grid grid-cols-[320px_1fr] gap-4 h-[70vh] max-md:grid-cols-1 max-md:h-auto">
      {/* 对话列表 */}
      <div className="space-y-2 overflow-y-auto pr-1">
        {MOCK_CONVERSATIONS.map(c=>{
          const p=MOCK_MEMBERS.find(m=>m.id===c.participants.find(p=>p!=='u1')!)
          return (
            <div key={c.id}
              className={`picture-book-card p-4 cursor-pointer ${activeConv===c.id?'tape-yellow':''}`}
              style={{
                transform: activeConv===c.id ? 'rotate(-0.2deg)' : 'rotate(-0.05deg)',
                ...(activeConv===c.id ? {
                  borderColor:'rgba(160,130,100,0.5)',
                  background:'linear-gradient(135deg,#fefcf7,#fdf7ee)',
                } : {}),
              }}
              onClick={()=>setActiveConv(c.id)}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background:'rgba(200,160,120,0.1)',color:'var(--ink-soft)' }}>
                  {p?.avatar||'👤'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-[13px] font-semibold text-[var(--ink)]">{p?.name||'宣传组群聊'}</p>
                    <span className="text-[9px] tracking-[0.06em]" style={{color:'var(--faded)'}}>
                      {c.lastMessageAt.split(' ')[1]}
                    </span>
                  </div>
                  <p className="text-[11px] truncate" style={{color:'var(--ink-faint)'}}>{c.lastMessage}</p>
                </div>
                {c.unread>0 && (
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white flex-shrink-0"
                    style={{background:'linear-gradient(135deg,#b07040,#8b5a30)'}}>{c.unread}</span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* 聊天区 */}
      <div className="picture-book-card flex flex-col" style={{transform:'rotate(-0.1deg)'}}>
        <div className="p-4" style={{borderBottom:'1px solid rgba(200,180,160,0.2)',background:'rgba(245,240,230,0.3)'}}>
          <p className="text-[14px] font-semibold text-[var(--ink)]">
            {conv.type==='direct'?MOCK_MEMBERS.find(m=>m.id===conv.participants.find(p=>p!=='u1'))?.name:'宣传组群聊'}
          </p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map(m=>{
            const isMine = m.senderId==='u1'
            const isRecalled = recalled.has(m.id)
            return (
            <div key={m.id} className={`flex ${isMine?'justify-end':'justify-start'}`}
              onMouseEnter={() => setHoveredMsg(m.id)}
              onMouseLeave={() => setHoveredMsg(null)}>
              <div className="group relative max-w-[70%]">
                <div
                  className={`p-3 rounded-2xl ${isMine ? 'text-white rounded-br-md' : 'rounded-bl-md'}`}
                  style={isMine
                    ? { background: 'linear-gradient(135deg,#b07040,#8b5a30)' }
                    : { background: 'rgba(245,240,230,0.5)', border: '1px solid rgba(200,180,160,0.15)', color: 'var(--ink-soft)' }
                  }>
                  {isRecalled
                    ? <p className="text-[12px] italic opacity-60">该消息已被撤回</p>
                    : <p className="text-[13px] leading-relaxed">{m.content}</p>
                  }
                  <p className="text-[9px] opacity-60 mt-1 text-right">
                    {isRecalled ? <span className="mr-1">已撤回</span> : null}{m.createdAt}
                  </p>
                </div>

                {/* 撤回按钮 — 我方消息 hover 时显示 */}
                {isMine && !isRecalled && hoveredMsg === m.id && (
                  <button
                    onClick={() => recallMsg(m.id)}
                    className="absolute -top-2 right-2 px-2 py-0.5 rounded-full text-[10px] flex items-center gap-1 border-none cursor-pointer"
                    style={{
                      background: 'rgba(255,255,255,0.95)',
                      color: 'var(--ink-soft)',
                      border: '1px solid rgba(200,180,160,0.3)',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                      fontFamily: 'inherit',
                    }}>
                    <Undo2 size={9}/> 撤回
                  </button>
                )}
              </div>
            </div>
          )})}
        </div>
        <div className="p-4 flex gap-2" style={{borderTop:'1px solid rgba(200,180,160,0.2)'}}>
          <input value={newMsg} onChange={e=>setNewMsg(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendMsg()}
            placeholder="输入消息..."
            className="flex-1 px-4 py-2.5 rounded-full text-[13px] outline-none"
            style={{
              border:'1.5px solid rgba(200,180,160,0.3)',background:'rgba(245,240,230,0.3)',
              color:'var(--ink)',
            }}
            onFocus={e=>e.target.style.borderColor='rgba(160,130,100,0.5)'}
            onBlur={e=>e.target.style.borderColor='rgba(200,180,160,0.3)'}
          />
          <button onClick={sendMsg} className="w-10 h-10 rounded-full flex items-center justify-center border-none cursor-pointer"
            style={{background:'linear-gradient(135deg,#b07040,#8b5a30)'}}>
            <Send size={16} className="text-white"/>
          </button>
        </div>
      </div>
    </div>
  </InnerLayout>)
}
