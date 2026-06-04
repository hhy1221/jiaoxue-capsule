'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { STUDENT_POSTS, INTEREST_GROUPS } from '@/lib/community-data'
import {
  STUDENT_FRIENDS, FRIEND_REQUESTS, STUDENT_CONVERSATIONS,
  DISCOVERABLE_STUDENTS, MOCK_CURRENT_STUDENT,
} from '@/lib/social-data'
import { useState, useRef, useEffect } from 'react'
import {
  Heart, Shield, MessageCircle, UserCheck, Send, Users, Search,
  UserPlus, Clock, Check, X, Star, Sparkles, ArrowLeft, Plus,
  Smile, Image, Flag, MoreHorizontal, Phone, Video,
} from 'lucide-react'

type Tab = 'chat' | 'friends' | 'discover' | 'share'

/* ═══════════════════════════════════════
   蒲公英 · 乡村孩子的纯净社交圈
   ═══════════════════════════════════════ */
export default function DandelionPage() {
  const [tab, setTab] = useState<Tab>('chat')
  const [activeConv, setActiveConv] = useState<string | null>(null)
  const [msgInput, setMsgInput] = useState('')
  const [msgs, setMsgs] = useState(STUDENT_CONVERSATIONS)
  const [friends, setFriends] = useState(STUDENT_FRIENDS[MOCK_CURRENT_STUDENT] || [])
  const [requests, setRequests] = useState(FRIEND_REQUESTS)
  const [discoverFilter, setDiscoverFilter] = useState('全部')
  const chatEndRef = useRef<HTMLDivElement>(null)

  const conv = msgs.find(c => c.id === activeConv)
  const myFriends = STUDENT_FRIENDS[MOCK_CURRENT_STUDENT] || []
  const pendingCount = requests.filter(r => r.status === 'pending').length

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [conv?.messages])

  const sendMsg = () => {
    if (!msgInput.trim() || !activeConv) return
    const newMsg = { id: 'm' + Date.now(), conversationId: activeConv, senderId: MOCK_CURRENT_STUDENT, senderName: '小宇', content: msgInput, createdAt: '刚刚' }
    setMsgs(prev => prev.map(c => c.id === activeConv ? { ...c, messages: [...c.messages, newMsg], lastMessage: msgInput, lastMessageAt: '刚刚' } : c))
    setMsgInput('')
  }

  const acceptRequest = (reqId: string) => {
    const req = requests.find(r => r.id === reqId)
    if (!req) return
    setFriends(prev => [...prev, {
      studentId: req.from.id, studentName: req.from.name, studentAvatar: req.from.avatar,
      grade: req.from.grade, school: req.from.school, interestGroup: req.interestGroup,
      addedAt: new Date().toISOString().slice(0, 10), lastActive: '刚刚',
    }])
    setRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'accepted' as const } : r))
  }
  const declineRequest = (reqId: string) => {
    setRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'declined' as const } : r))
  }

  const tabs: { k: Tab; e: string; l: string; badge?: number }[] = [
    { k: 'chat', e: '💬', l: '聊天', badge: msgs.filter(c => c.lastMessageAt === '刚刚' || c.lastMessageAt === '10分钟前').length },
    { k: 'friends', e: '👫', l: '好友', badge: pendingCount },
    { k: 'discover', e: '🌟', l: '发现' },
    { k: 'share', e: '🎨', l: '创作' },
  ]

  const allGroups = ['全部', ...INTEREST_GROUPS.map(g => g.name)]
  const discoverable = discoverFilter === '全部'
    ? DISCOVERABLE_STUDENTS
    : DISCOVERABLE_STUDENTS.filter(s => s.interestGroups.includes(discoverFilter))

  return (
    <InnerLayout>
      <style>{`
        @keyframes msgIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes msgInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes friendPop { 0% { opacity: 0; transform: scale(0.9); } 60% { transform: scale(1.03); } 100% { opacity: 1; transform: scale(1); } }
        .msg-bubble-in { animation: msgIn 0.3s ease-out both; }
        .msg-right-in { animation: msgInRight 0.25s ease-out both; }
        .friend-pop { animation: friendPop 0.4s cubic-bezier(0.34,1.56,0.64,1) both; }
      `}</style>

      {/* ═══ Header ═══ */}
      <header className="relative mb-5 rounded-2xl overflow-hidden" style={{
        background: 'linear-gradient(135deg,rgba(200,180,140,0.12),rgba(220,200,160,0.08),rgba(180,210,190,0.06))',
        border: '1.5px solid rgba(200,180,160,0.2)', padding: '20px 28px',
      }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[22px] font-bold tracking-[0.03em] text-[var(--ink)] flex items-center gap-2" style={{ fontFamily: 'var(--font-serif)' }}>
              🌬 蒲公英
            </h1>
            <p className="text-[11px] mt-0.5 tracking-[0.04em]" style={{ color: 'var(--faded)' }}>
              乡村孩子的纯净社交圈 · 所有账号由支教队认证守护 · 安全交友
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(107,174,214,0.08)', border: '1px solid rgba(107,174,214,0.2)' }}>
            <Shield size={13} style={{ color: '#4a8ab8' }} />
            <span className="text-[10px] font-medium" style={{ color: '#4a8ab8' }}>凡星支教队 · 认证守护中</span>
          </div>
        </div>
      </header>

      {/* ═══ Tab 切换 ═══ */}
      <div className="flex items-center gap-1 mb-5 bg-white/50 rounded-full p-1 w-fit" style={{ border: '1px solid rgba(200,180,160,0.15)' }}>
        {tabs.map(t => (
          <button key={t.k} onClick={() => { setTab(t.k); setActiveConv(null) }}
            className="relative px-4 py-1.5 rounded-full text-[12px] border-none cursor-pointer transition-all"
            style={{
              background: tab === t.k ? 'linear-gradient(135deg,#9b7a4a,#7a5a3a)' : 'transparent',
              color: tab === t.k ? '#fff' : 'var(--ink-soft)', fontWeight: tab === t.k ? 600 : 400, fontFamily: 'inherit',
            }}>
            {t.e} {t.l}
            {t.badge != null && t.badge > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 rounded-full flex items-center justify-center text-[8px] font-bold"
                style={{ background: '#d4855e', color: '#fff', padding: '0 3px' }}>{t.badge}</span>
            )}
          </button>
        ))}
      </div>

      {/* ═══════════════════════════════════════
          TAB 1：💬 聊天
          ═══════════════════════════════════════ */}
      {tab === 'chat' && (
        <div className="grid grid-cols-[300px_1fr] gap-5 max-lg:grid-cols-1 h-[65vh] max-lg:h-auto">
          {/* 对话列表 */}
          <div className="picture-book-card p-0 overflow-hidden flex flex-col" style={{ transform: 'rotate(-0.06deg)' }}>
            <div className="p-3 font-semibold text-[12px] text-[var(--ink)] flex items-center justify-between" style={{ borderBottom: '1px solid rgba(200,180,160,0.12)', fontFamily: 'var(--font-serif)' }}>
              💬 消息
              <button className="bg-transparent border-none cursor-pointer text-[10px]" style={{ color: 'var(--faded)' }}>
                <Plus size={14} /> 建群
              </button>
            </div>
            <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
              {msgs.map(c => {
                const active = activeConv === c.id
                const isGroup = c.type === 'group'
                return (
                  <div key={c.id} onClick={() => setActiveConv(c.id)}
                    className="flex items-center gap-2.5 p-3 cursor-pointer transition-colors"
                    style={{ background: active ? 'rgba(200,160,120,0.08)' : 'transparent', borderLeft: active ? '3px solid var(--primary-skin)' : '3px solid transparent' }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                      style={{ background: isGroup ? 'linear-gradient(135deg,rgba(107,174,214,0.1),rgba(90,152,204,0.05))' : 'linear-gradient(135deg,rgba(200,160,120,0.08),rgba(180,140,100,0.04))', border: `1.5px solid ${isGroup ? 'rgba(107,174,214,0.2)' : 'rgba(200,160,120,0.18)'}` }}>
                      {c.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] font-semibold text-[var(--ink)] truncate">{c.name}</span>
                        <span className="text-[8px] flex-shrink-0" style={{ color: 'var(--faded)' }}>{c.lastMessageAt}</span>
                      </div>
                      <p className="text-[10px] truncate" style={{ color: 'var(--faded)' }}>{c.lastMessage}</p>
                    </div>
                    {isGroup && <span className="text-[8px] px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ background: 'rgba(107,174,214,0.08)', color: '#4a8ab8' }}>群</span>}
                  </div>
                )
              })}
            </div>
          </div>

          {/* 聊天区 */}
          <div className="picture-book-card p-0 overflow-hidden flex flex-col" style={{ transform: 'rotate(0.04deg)' }}>
            {conv ? (
              <>
                {/* 聊天头 */}
                <div className="flex items-center gap-3 p-3" style={{ borderBottom: '1px solid rgba(200,180,160,0.12)', background: 'rgba(245,240,230,0.3)' }}>
                  <button onClick={() => setActiveConv(null)} className="bg-transparent border-none cursor-pointer max-lg:block hidden" style={{ color: 'var(--faded)' }}><ArrowLeft size={16} /></button>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,rgba(200,160,120,0.1),rgba(180,140,100,0.05))', border: '1.5px solid rgba(200,160,120,0.18)' }}>{conv.avatar}</div>
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold text-[var(--ink)]">{conv.name}</p>
                    <p className="text-[9px]" style={{ color: 'var(--faded)' }}>
                      {conv.type === 'group' ? `${conv.participants.length} 位成员 · ${conv.interestGroup}` : '在线'}
                    </p>
                  </div>
                  <button className="bg-transparent border-none cursor-pointer p-1 rounded-full hover:bg-[rgba(200,180,160,0.1)]" style={{ color: 'var(--faded)' }}>
                    <MoreHorizontal size={16} />
                  </button>
                </div>
                {/* 消息列表 */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: 'rgba(250,247,240,0.5)', scrollbarWidth: 'thin' }}>
                  {conv.messages.map(m => {
                    const isMine = m.senderId === MOCK_CURRENT_STUDENT
                    return (
                      <div key={m.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'} msg-bubble-in`}>
                        <div className={`flex items-end gap-1.5 max-w-[75%] ${isMine ? 'flex-row-reverse' : ''}`}>
                          {!isMine && <span className="text-sm flex-shrink-0">{conv.type === 'group' ? m.senderName.charAt(0) === '小' ? '🌟' : conv.participants.find(p => p.id === m.senderId)?.avatar || '👤' : conv.avatar}</span>}
                          <div>
                            {!isMine && conv.type === 'group' && <p className="text-[8px] mb-0.5 ml-1" style={{ color: 'var(--faded)' }}>{m.senderName}</p>}
                            <div className="px-3 py-2 rounded-2xl text-[12px] leading-relaxed" style={{
                              background: isMine ? 'linear-gradient(135deg,#9b7a4a,#7a5a3a)' : '#fff',
                              color: isMine ? '#fff' : 'var(--ink-soft)',
                              border: isMine ? 'none' : '1px solid rgba(200,180,160,0.15)',
                              borderRadius: isMine ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                              boxShadow: isMine ? '0 1px 4px rgba(80,40,20,0.1)' : 'none',
                            }}>{m.content}</div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <div ref={chatEndRef} />
                </div>
                {/* 输入区 */}
                <div className="flex items-center gap-2 p-3" style={{ borderTop: '1px solid rgba(200,180,160,0.12)' }}>
                  <button className="bg-transparent border-none cursor-pointer p-1" style={{ color: 'var(--faded)' }}><Smile size={18} /></button>
                  <button className="bg-transparent border-none cursor-pointer p-1" style={{ color: 'var(--faded)' }}><Image size={18} /></button>
                  <input value={msgInput} onChange={e => setMsgInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') sendMsg() }}
                    placeholder="输入消息…"
                    className="flex-1 px-3 py-2 rounded-full text-[12px] outline-none"
                    style={{ border: '1.5px solid rgba(200,180,160,0.2)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit' }} />
                  <button onClick={sendMsg} disabled={!msgInput.trim()}
                    className="w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer transition-all"
                    style={{ background: msgInput.trim() ? 'linear-gradient(135deg,#9b7a4a,#7a5a3a)' : 'rgba(200,180,160,0.15)', color: msgInput.trim() ? '#fff' : 'var(--faded)', opacity: msgInput.trim() ? 1 : 0.5 }}>
                    <Send size={15} />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-3 opacity-25">💬</div>
                  <p className="text-[14px] handwriting" style={{ color: 'var(--faded)' }}>选择左侧对话，开始聊天 ✨</p>
                  <p className="text-[10px] mt-1 opacity-50" style={{ color: 'var(--faded)' }}>与好友分享作品和快乐</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════
          TAB 2：👫 好友
          ═══════════════════════════════════════ */}
      {tab === 'friends' && (
        <div className="space-y-5">
          {/* 好友申请 */}
          {pendingCount > 0 && (
            <div className="picture-book-card p-4" style={{ transform: 'rotate(-0.04deg)', borderLeft: '4px solid #d4855e' }}>
              <h3 className="text-[13px] font-semibold mb-3 text-[var(--ink)] flex items-center gap-1.5" style={{ fontFamily: 'var(--font-serif)' }}>
                <UserPlus size={13} style={{ color: '#d4855e' }} /> 好友申请（{pendingCount}）
              </h3>
              <div className="space-y-2">
                {requests.filter(r => r.status === 'pending').map(req => (
                  <div key={req.id} className="flex items-center gap-3 p-3 rounded-xl friend-pop"
                    style={{ background: 'rgba(245,238,220,0.5)', border: '1px solid rgba(200,160,120,0.12)' }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg,rgba(200,160,120,0.1),rgba(180,140,100,0.05))', border: '2px solid #fff', outline: '1px solid rgba(200,160,120,0.2)' }}>
                      {req.from.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-[var(--ink)]">{req.from.name} <span className="text-[9px] font-normal" style={{ color: 'var(--faded)' }}>{req.from.grade} · {req.from.school}</span></p>
                      <p className="text-[10px] line-clamp-1 mt-0.5" style={{ color: 'var(--ink-soft)' }}>{req.message}</p>
                      <span className="text-[8px] px-1.5 py-0.5 rounded-full mt-1 inline-block" style={{ background: 'rgba(107,174,214,0.08)', color: '#4a8ab8' }}>{req.interestGroup}</span>
                    </div>
                    <div className="flex gap-1.5">
                      <button onClick={() => acceptRequest(req.id)} className="w-8 h-8 rounded-full flex items-center justify-center border-none cursor-pointer transition-all hover:scale-110"
                        style={{ background: 'rgba(122,180,90,0.12)', color: '#5a8a3a' }}><Check size={15} /></button>
                      <button onClick={() => declineRequest(req.id)} className="w-8 h-8 rounded-full flex items-center justify-center border-none cursor-pointer transition-all hover:scale-110"
                        style={{ background: 'rgba(200,100,80,0.08)', color: '#b06050' }}><X size={15} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 好友列表 — 按兴趣组分类 */}
          <div className="picture-book-card p-5" style={{ transform: 'rotate(0.03deg)' }}>
            <h3 className="text-[13px] font-semibold mb-4 text-[var(--ink)] flex items-center gap-1.5" style={{ fontFamily: 'var(--font-serif)' }}>
              <Users size={13} style={{ color: 'var(--faded)' }} /> 我的好友（{myFriends.length}）
            </h3>
            {myFriends.length === 0 ? (
              <p className="text-[12px] text-center py-8 handwriting" style={{ color: 'var(--faded)' }}>还没有好友，去"发现"里找找新朋友吧 🌟</p>
            ) : (
              <div className="grid grid-cols-3 gap-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                {myFriends.map(f => (
                  <div key={f.studentId} onClick={() => { setTab('chat'); setActiveConv(msgs.find(c => c.participants.some(p => p.id === f.studentId) && c.type === 'direct')?.id || null) }}
                    className="p-3.5 rounded-xl cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-300 friend-pop"
                    style={{ background: 'rgba(245,240,230,0.3)', border: '1.5px solid rgba(200,180,160,0.12)' }}>
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg,rgba(200,160,120,0.08),rgba(180,140,100,0.04))', border: '2px solid #fff', outline: '1px solid rgba(200,160,120,0.2)', boxShadow: '0 2px 6px rgba(80,40,20,0.06)' }}>
                        {f.studentAvatar}
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-[var(--ink)]">{f.studentName}</p>
                        <p className="text-[9px]" style={{ color: 'var(--faded)' }}>{f.grade} · {f.school}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[9px]">
                      <span className="px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(107,174,214,0.06)', color: '#5a8ab8' }}>{f.interestGroup}</span>
                      <span style={{ color: 'var(--faded)' }}>
                        <span className="inline-block w-1.5 h-1.5 rounded-full mr-1" style={{ background: '#6aaa50' }} />
                        {f.lastActive}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════
          TAB 3：🌟 发现新朋友
          ═══════════════════════════════════════ */}
      {tab === 'discover' && (
        <div>
          {/* 安全提示 */}
          <div className="p-4 mb-5 rounded-xl flex items-start gap-3" style={{
            background: 'linear-gradient(135deg,rgba(107,174,214,0.06),rgba(90,152,204,0.04))',
            border: '1.5px solid rgba(107,174,214,0.18)',
          }}>
            <Shield size={18} style={{ color: '#4a8ab8', flexShrink: 0, marginTop: 2 }} />
            <div>
              <p className="text-[11px] font-semibold text-[var(--ink)]">🛡️ 蒲公英安全守护</p>
              <p className="text-[10px] leading-relaxed mt-0.5" style={{ color: 'var(--ink-soft)' }}>
                所有学生信息均由所在支教队认证。只能通过共同兴趣小组发现朋友，聊天内容受到支教老师监督。不透露真实姓名和联系方式。
              </p>
            </div>
          </div>

          {/* 兴趣筛选 */}
          <div className="flex gap-1.5 mb-5 flex-wrap">
            {allGroups.map(g => (
              <button key={g} onClick={() => setDiscoverFilter(g)}
                className="px-3 py-1.5 rounded-full text-[10px] border-none cursor-pointer transition-all"
                style={{
                  background: discoverFilter === g ? 'linear-gradient(135deg,rgba(107,174,214,0.18),rgba(90,152,204,0.1))' : 'rgba(245,240,230,0.3)',
                  border: `1.5px solid ${discoverFilter === g ? 'rgba(107,174,214,0.35)' : 'rgba(200,180,160,0.15)'}`,
                  color: discoverFilter === g ? 'var(--ink)' : 'var(--faded)', fontWeight: discoverFilter === g ? 600 : 400, fontFamily: 'inherit',
                }}>
                {g === '全部' ? '🌍 全部' : g}
              </button>
            ))}
          </div>

          {/* 同学卡片 */}
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
            {discoverable.map(s => (
              <div key={s.id} className="picture-book-card p-4 flex flex-col items-center text-center friend-pop" style={{ transform: 'rotate(-0.05deg)' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-3"
                  style={{ background: 'linear-gradient(135deg,#e8ddd0,#d4c4a8)', border: '3px solid #fff', outline: '1.5px solid rgba(180,150,120,0.25)', boxShadow: '0 3px 10px rgba(80,40,20,0.08)' }}>
                  {s.avatar}
                </div>
                <h3 className="text-[14px] font-bold text-[var(--ink)]" style={{ fontFamily: 'var(--font-serif)' }}>{s.name}</h3>
                <p className="text-[10px] mt-0.5" style={{ color: 'var(--faded)' }}>{s.grade} · {s.school}</p>
                <div className="flex flex-wrap justify-center gap-1 my-2">
                  {s.interestGroups.map(g => (
                    <span key={g} className="text-[8px] px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(107,174,214,0.06)', color: '#5a8ab8' }}>{g}</span>
                  ))}
                </div>
                <p className="text-[10px] leading-relaxed line-clamp-2 mb-3" style={{ color: 'var(--ink-soft)' }}>{s.recentPost}</p>
                {s.alreadyFriend ? (
                  <span className="text-[10px] px-3 py-1 rounded-full" style={{ background: 'rgba(122,180,90,0.08)', color: '#5a8a3a', border: '1px solid rgba(122,180,90,0.2)' }}>
                    <Check size={10} /> 已是好友
                  </span>
                ) : s.requestSent ? (
                  <span className="text-[10px] px-3 py-1 rounded-full" style={{ background: 'rgba(200,160,120,0.06)', color: 'var(--faded)', border: '1px solid rgba(200,160,120,0.15)' }}>
                    <Clock size={10} /> 已申请
                  </span>
                ) : (
                  <button className="flex items-center gap-1 picture-book-btn primary" style={{ fontSize: 10, padding: '4px 14px' }}>
                    <UserPlus size={11} /> 加好友
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════
          TAB 4：🎨 创作
          ═══════════════════════════════════════ */}
      {tab === 'share' && (
        <div>
          <div className="columns-2 gap-5 max-md:columns-1">
            {STUDENT_POSTS.map((p, i) => (
              <div key={p.id} className="picture-book-card tape-top mb-5 break-inside-avoid overflow-hidden"
                style={{ transform: `rotate(${i % 2 === 0 ? '-0.25deg' : '0.2deg'})` }}>
                {p.image.startsWith('/') ? (
                  <div style={{ height: 220, overflow: 'hidden' }}>
                    <img src={p.image} alt={p.studentName + '的作品'} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ) : (
                  <div className="flex items-center justify-center p-6"
                    style={{ background: 'linear-gradient(180deg,rgba(240,235,220,0.4),transparent)', fontSize: 56 }}>{p.image}</div>
                )}
                <div className="px-4 pb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                      style={{ background: 'linear-gradient(135deg,#f5e6d0,#e8d4b8)', color: 'var(--ink-soft)', border: '2px solid #fff', outline: '1px solid rgba(180,150,120,0.3)' }}>{p.studentAvatar}</div>
                    <div>
                      <p className="text-[12px] font-semibold text-[var(--ink)]">{p.studentName}</p>
                      <p className="text-[9px]" style={{ color: 'var(--faded)' }}>{p.grade} · {p.school} <span className="text-[8px] text-green-600">✓已验证</span></p>
                    </div>
                  </div>
                  <p className="text-[13px] leading-relaxed mb-3" style={{ color: 'var(--ink-soft)' }}>{p.content}</p>
                  <div className="flex items-center gap-2 flex-wrap mb-3">
                    <span className="text-[9px] px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(200,180,160,0.06)', color: 'var(--faded)', border: '1px solid rgba(200,180,160,0.12)' }}>
                      {p.type === 'artwork' ? '🎨 作品' : p.type === 'story' ? '📖 故事' : p.type === 'greeting' ? '👋 问候' : '❓ 提问'}
                    </span>
                    {p.interestGroup && <span className="text-[9px] px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(107,174,214,0.06)', color: '#5a8ab8', border: '1px solid rgba(107,174,214,0.15)' }}>{p.interestGroup}</span>}
                  </div>
                  <div className="flex items-center justify-between text-[10px]" style={{ color: 'var(--faded)' }}>
                    <span className="flex items-center gap-2">
                      <button className="flex items-center gap-1 bg-transparent border-none cursor-pointer" style={{ color: 'var(--faded)', fontFamily: 'inherit', fontSize: 10 }}>
                        <Heart size={11} /> {p.likes}
                      </button>
                      <button className="flex items-center gap-1 bg-transparent border-none cursor-pointer" style={{ color: 'var(--faded)', fontFamily: 'inherit', fontSize: 10 }}>
                        <MessageCircle size={11} /> 评论
                      </button>
                      <button className="flex items-center gap-1 bg-transparent border-none cursor-pointer" style={{ color: 'var(--faded)', fontFamily: 'inherit', fontSize: 10 }}>
                        <Flag size={10} /> 举报
                      </button>
                    </span>
                    <span>{p.createdAt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </InnerLayout>
  )
}
