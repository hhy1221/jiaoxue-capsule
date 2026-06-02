'use client'
import { useState } from 'react'
import Modal from '@/components/ui/modal'
import { useToast } from '@/components/animations/Toast'

interface Props { open: boolean; onClose: () => void; studentA: string; studentB: string }

const MOCK_MESSAGES = [
  { from: 'A', text: '你好！我叫小宇，我喜欢恐龙和画画，你呢？', time: '07-28' },
  { from: 'B', text: '我也喜欢画画！我最喜欢画的是花和蝴蝶 🦋', time: '07-29' },
  { from: 'A', text: '哇，那你可以教我画蝴蝶吗？我只会画恐龙 🦕', time: '07-29' },
  { from: 'B', text: '当然可以！下次美术课我们可以坐在一起画！', time: '07-30' },
]

export default function PenpalMessageDialog({ open, onClose, studentA, studentB }: Props) {
  const { toast } = useToast()
  const [newMsg, setNewMsg] = useState('')
  const [msgs, setMsgs] = useState(MOCK_MESSAGES)

  const handleSend = () => {
    if (!newMsg.trim()) return
    setMsgs(prev => [...prev, { from: 'A', text: newMsg, time: '今天' }])
    setNewMsg('')
    toast('消息已发送！', 'success')
  }

  return (
    <Modal open={open} onClose={onClose} title={`💌 ${studentA} 🤝 ${studentB}`} size="md">
      <div className="space-y-4">
        <div className="max-h-[360px] overflow-y-auto space-y-3 px-1" style={{ scrollbarWidth: 'thin' }}>
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.from === 'A' ? 'justify-end' : 'justify-start'}`}>
              <div className="max-w-[75%] px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed"
                style={{
                  background: m.from === 'A' ? 'linear-gradient(135deg,#f0e0c8,#e8d4b0)' : 'rgba(245,238,220,0.7)',
                  border: '1px solid rgba(180,150,120,0.15)',
                  color: 'var(--ink)', borderRadius: m.from === 'A' ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                }}>
                <p>{m.text}</p>
                <p className="text-[9px] mt-1 text-right" style={{color:'var(--faded)'}}>{m.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 pt-2" style={{ borderTop: '1px solid rgba(180,150,120,0.12)' }}>
          <input value={newMsg} onChange={e => setNewMsg(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="写一封信…" className="flex-1 px-4 py-2.5 rounded-xl text-[13px] outline-none"
            style={{ border: '1.5px solid rgba(180,150,120,0.25)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit' }} />
          <button onClick={handleSend} className="picture-book-btn primary" style={{ fontSize: 12, padding: '8px 16px' }}>发送 ✉️</button>
        </div>
      </div>
    </Modal>
  )
}
