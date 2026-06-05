'use client'
import StudentLayout from '@/components/layout/StudentLayout'
import { STUDENT_CONVERSATIONS, MOCK_CURRENT_STUDENT, STUDENT_FRIENDS } from '@/lib/social-data'
import { useState, useRef, useEffect } from 'react'
import { Send, Smile, Image, ArrowLeft, Users, Plus, MoreHorizontal, X, Check } from 'lucide-react'

export default function StudentChatPage() {
  const [activeConv, setActiveConv] = useState<string | null>(null)
  const [msgInput, setMsgInput] = useState('')
  const [msgs, setMsgs] = useState(STUDENT_CONVERSATIONS)
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [groupName, setGroupName] = useState('')
  const [groupInterest, setGroupInterest] = useState('')
  const [groupDesc, setGroupDesc] = useState('')
  const chatEndRef = useRef<HTMLDivElement>(null)
  const myFriends = STUDENT_FRIENDS[MOCK_CURRENT_STUDENT] || []

  const createGroup = () => {
    if (!groupName.trim()) return
    const newGroup = {
      id:'conv'+Date.now(),type:'group' as const,name:groupName,avatar:'🌟',
      participants:[{id:MOCK_CURRENT_STUDENT,name:'小宇',avatar:'🌟'},...myFriends.slice(0,3).map(f=>({id:f.studentId,name:f.studentName,avatar:f.studentAvatar}))],
      lastMessage:'群聊已创建，开始聊天吧！',lastMessageAt:'刚刚',
      interestGroup:groupInterest||'新群',groupDescription:groupDesc||'大家一起聊天～',
      messages:[{id:'gm'+Date.now(),conversationId:'new',senderId:MOCK_CURRENT_STUDENT,senderName:'小宇',content:'建群成功！欢迎大家加入～',createdAt:'刚刚'}]
    }
    setMsgs(prev=>[newGroup,...prev])
    setActiveConv(newGroup.id)
    setShowCreateGroup(false); setGroupName(''); setGroupInterest(''); setGroupDesc('')
  }

  const conv = msgs.find(c => c.id === activeConv)

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior:'smooth' }) }, [conv?.messages])

  const sendMsg = () => {
    if (!msgInput.trim() || !activeConv) return
    const newMsg = { id:'m'+Date.now(),conversationId:activeConv,senderId:MOCK_CURRENT_STUDENT,senderName:'小宇',content:msgInput,createdAt:'刚刚' }
    setMsgs(prev => prev.map(c => c.id===activeConv ? {...c,messages:[...c.messages,newMsg],lastMessage:msgInput,lastMessageAt:'刚刚'} : c))
    setMsgInput('')
  }

  return (
    <StudentLayout>
      <div className="mb-6">
        <h1 className="text-[24px] font-bold text-[var(--ink)] flex items-center gap-2" style={{ fontFamily:'var(--font-serif)' }}>💬 聊天</h1>
        <p className="text-[13px] mt-1" style={{ color:'var(--faded)' }}>和好朋友们聊天 · 所有消息都在老师的安全守护下</p>
      </div>

      <div className="grid grid-cols-[280px_1fr] gap-4 h-[65vh] max-lg:grid-cols-1 max-lg:h-auto rounded-2xl overflow-hidden" style={{ border:'1.5px solid rgba(200,180,160,0.2)' }}>
        {/* 对话列表 */}
        <div className="flex flex-col" style={{ background:'rgba(250,247,240,0.5)',borderRight:'1px solid rgba(200,180,160,0.12)' }}>
          <div className="p-3 flex items-center justify-between" style={{ borderBottom:'1px solid rgba(200,180,160,0.12)' }}>
            <span className="text-[14px] font-bold text-[var(--ink)]" style={{ fontFamily:'var(--font-serif)' }}>消息</span>
            <button onClick={() => setShowCreateGroup(true)} className="bg-transparent border-none cursor-pointer" style={{ color:'var(--faded)' }}><Plus size={16}/></button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {msgs.map(c => {
              const active = activeConv === c.id
              const isGroup = c.type === 'group'
              return (
                <div key={c.id} onClick={()=>setActiveConv(c.id)}
                  className="flex items-center gap-3 p-3 cursor-pointer transition-colors"
                  style={{ background:active?'rgba(122,180,90,0.08)':'transparent',borderLeft:active?'4px solid #7a9a5a':'4px solid transparent' }}>
                  <div className="w-[42px] h-[42px] rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background:isGroup?'rgba(122,180,90,0.12)':'rgba(200,160,120,0.08)',border:`1.5px solid ${isGroup?'rgba(122,180,90,0.2)':'rgba(200,160,120,0.15)'}` }}>
                    {c.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-bold text-[var(--ink)] truncate">{c.name}</span>
                      <span className="text-[9px] flex-shrink-0" style={{ color:'var(--faded)' }}>{c.lastMessageAt}</span>
                    </div>
                    <p className="text-[11px] truncate" style={{ color:'var(--faded)' }}>{c.lastMessage}</p>
                  </div>
                  {isGroup && <span className="text-[9px] px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ background:'rgba(122,180,90,0.1)',color:'#5a8a3a' }}>群聊</span>}
                </div>
              )
            })}
          </div>
        </div>

        {/* 聊天区 */}
        <div className="flex flex-col" style={{ background:'#fff' }}>
          {conv ? (
            <>
              <div className="flex items-center gap-3 p-3" style={{ borderBottom:'1px solid rgba(200,180,160,0.12)',background:'rgba(250,247,240,0.5)' }}>
                <button onClick={()=>setActiveConv(null)} className="bg-transparent border-none cursor-pointer lg:hidden" style={{ color:'var(--faded)' }}><ArrowLeft size={18}/></button>
                <div className="w-[36px] h-[36px] rounded-xl flex items-center justify-center text-lg"
                  style={{ background:'rgba(200,160,120,0.08)',border:'1.5px solid rgba(200,160,120,0.15)' }}>{conv.avatar}</div>
                <div className="flex-1">
                  <p className="text-[14px] font-bold text-[var(--ink)]">{conv.name}</p>
                  <p className="text-[10px]" style={{ color:'var(--faded)' }}>
                    {conv.type==='group'?`${conv.participants.length}人 · ${conv.interestGroup}`:'在线'}
                  </p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background:'rgba(252,250,245,0.5)' }}>
                {conv.messages.map(m => {
                  const isMine = m.senderId === MOCK_CURRENT_STUDENT
                  return (
                    <div key={m.id} className={`flex ${isMine?'justify-end':'justify-start'}`}>
                      <div className={`flex items-end gap-1.5 max-w-[75%] ${isMine?'flex-row-reverse':''}`}>
                        {!isMine && <span className="text-base flex-shrink-0">{conv.type==='group'?conv.participants.find(p=>p.id===m.senderId)?.avatar||'👤':conv.avatar}</span>}
                        <div>
                          {!isMine && conv.type==='group' && <p className="text-[9px] mb-0.5 ml-1" style={{ color:'var(--faded)' }}>{m.senderName}</p>}
                          <div className="px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed" style={{
                            background:isMine?'linear-gradient(135deg,#7a9a5a,#5a7a3a)':'#f5f0e8',
                            color:isMine?'#fff':'var(--ink-soft)',
                            borderRadius:isMine?'18px 18px 4px 18px':'18px 18px 18px 4px',
                          }}>{m.content}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div ref={chatEndRef}/>
              </div>
              <div className="flex items-center gap-2 p-3" style={{ borderTop:'1px solid rgba(200,180,160,0.12)' }}>
                <button className="bg-transparent border-none cursor-pointer p-1" style={{ color:'var(--faded)' }}><Smile size={20}/></button>
                <button className="bg-transparent border-none cursor-pointer p-1" style={{ color:'var(--faded)' }}><Image size={20}/></button>
                <input value={msgInput} onChange={e=>setMsgInput(e.target.value)}
                  onKeyDown={e=>{if(e.key==='Enter')sendMsg()}}
                  placeholder="输入消息…" className="flex-1 px-4 py-2.5 rounded-full text-[14px] outline-none"
                  style={{ border:'1.5px solid rgba(200,180,160,0.2)',background:'var(--surface)',color:'var(--ink)',fontFamily:'inherit' }}/>
                <button onClick={sendMsg} disabled={!msgInput.trim()}
                  className="w-10 h-10 rounded-full flex items-center justify-center border-none cursor-pointer"
                  style={{ background:msgInput.trim()?'linear-gradient(135deg,#7a9a5a,#5a7a3a)':'rgba(200,180,160,0.15)',color:msgInput.trim()?'#fff':'var(--faded)' }}>
                  <Send size={17}/>
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl mb-3 opacity-25">💬</div>
                <p className="text-[15px] font-semibold" style={{ color:'var(--faded)' }}>选择左侧对话</p>
                <p className="text-[12px] mt-1" style={{ color:'var(--faded)',opacity:0.6 }}>和好朋友们聊天吧</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* 建群弹窗 */}
      {showCreateGroup && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center" onClick={()=>setShowCreateGroup(false)}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative picture-book-card p-6 w-[380px]" onClick={e=>e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-bold text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>✨ 建新群聊</h3>
              <button onClick={() => setShowCreateGroup(false)} className="bg-transparent border-none cursor-pointer" style={{color:'var(--faded)'}}><X size={16}/></button>
            </div>
            <input value={groupName} onChange={e=>setGroupName(e.target.value)} placeholder="群聊名称（必填）" className="w-full px-4 py-2.5 rounded-xl text-[13px] outline-none mb-3" style={{border:'1.5px solid rgba(200,180,160,0.25)',background:'var(--surface)',color:'var(--ink)',fontFamily:'inherit'}}/>
            <input value={groupInterest} onChange={e=>setGroupInterest(e.target.value)} placeholder="兴趣小组（选填）" className="w-full px-4 py-2.5 rounded-xl text-[13px] outline-none mb-3" style={{border:'1.5px solid rgba(200,180,160,0.25)',background:'var(--surface)',color:'var(--ink)',fontFamily:'inherit'}}/>
            <textarea value={groupDesc} onChange={e=>setGroupDesc(e.target.value)} rows={2} placeholder="群聊描述（选填）" className="w-full p-3 rounded-xl text-[12px] outline-none resize-none mb-3" style={{border:'1.5px solid rgba(200,180,160,0.25)',background:'var(--surface)',color:'var(--ink)',fontFamily:'inherit'}}/>
            <p className="text-[9px] mb-3" style={{color:'var(--faded)'}}>将自动邀请你的好友加入群聊</p>
            <div className="flex gap-2 justify-end">
              <button onClick={()=>setShowCreateGroup(false)} className="picture-book-btn" style={{fontSize:11}}>取消</button>
              <button onClick={createGroup} disabled={!groupName.trim()} className="picture-book-btn primary flex items-center gap-1" style={{fontSize:11,opacity:groupName.trim()?1:0.5}}><Check size={12}/>创建</button>
            </div>
          </div>
        </div>
      )}
    </StudentLayout>
  )
}
