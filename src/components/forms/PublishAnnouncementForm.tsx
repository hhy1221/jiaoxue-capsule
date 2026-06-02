'use client'

import { useState } from 'react'
import Modal from '@/components/ui/modal'
import { useToast } from '@/components/animations/Toast'

interface Props { open: boolean; onClose: () => void }

export default function PublishAnnouncementForm({ open, onClose }: Props) {
  const { toast } = useToast()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [level, setLevel] = useState('normal')

  const handleSubmit = () => {
    if (!title.trim()) { toast('请输入公告标题', 'error'); return }
    if (!content.trim()) { toast('请输入公告内容', 'error'); return }
    toast('公告发布成功！', 'success')
    setTitle(''); setContent(''); onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="📢 发布公告" size="md">
      <div className="space-y-4">
        <div>
          <label className="text-[11px] font-medium tracking-[0.04em] text-[var(--ink-soft)] mb-1.5 block">标题 *</label>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="公告标题"
            className="w-full px-3 py-2 rounded-lg text-[13px] outline-none transition-colors"
            style={{ border: '1.5px solid rgba(180,150,120,0.25)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit' }} />
        </div>
        <div>
          <label className="text-[11px] font-medium tracking-[0.04em] text-[var(--ink-soft)] mb-1.5 block">内容 *</label>
          <textarea value={content} onChange={e => setContent(e.target.value)} rows={5} placeholder="公告详细内容…支持多行文本"
            className="w-full px-3 py-2 rounded-lg text-[13px] outline-none resize-none transition-colors"
            style={{ border: '1.5px solid rgba(180,150,120,0.25)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit' }} />
        </div>
        <div>
          <label className="text-[11px] font-medium tracking-[0.04em] text-[var(--ink-soft)] mb-1.5 block">重要级别</label>
          <div className="flex gap-2">
            {[
              { k: 'normal', l: '📌 普通' },
              { k: 'important', l: '⚠️ 重要' },
              { k: 'urgent', l: '🔴 紧急' },
            ].map(o => (
              <span key={o.k} onClick={() => setLevel(o.k)}
                className="px-3 py-1.5 rounded-full text-[11px] cursor-pointer transition-all select-none"
                style={{
                  border: `1.5px solid ${level === o.k ? 'rgba(160,120,70,0.45)' : 'rgba(180,150,120,0.2)'}`,
                  background: level === o.k ? 'rgba(200,150,80,0.08)' : 'transparent',
                  color: level === o.k ? 'var(--ink)' : 'var(--faded)',
                  fontWeight: level === o.k ? 600 : 400,
                }}
              >{o.l}</span>
            ))}
          </div>
        </div>
        <div className="flex gap-3 justify-end pt-2">
          <button onClick={onClose} className="picture-book-btn" style={{ fontSize: 12 }}>取消</button>
          <button onClick={handleSubmit} className="picture-book-btn primary" style={{ fontSize: 12 }}>📢 发布</button>
        </div>
      </div>
    </Modal>
  )
}
