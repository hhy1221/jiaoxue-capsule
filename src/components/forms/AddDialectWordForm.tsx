'use client'
import { useState } from 'react'
import Modal from '@/components/ui/modal'
import { useToast } from '@/components/animations/Toast'

interface Props { open: boolean; onClose: () => void }

export default function AddDialectWordForm({ open, onClose }: Props) {
  const { toast } = useToast()
  const [word, setWord] = useState('')
  const [pron, setPron] = useState('')
  const [meaning, setMeaning] = useState('')

  const handleSubmit = () => {
    if (!word.trim()) { toast('请输入方言词汇', 'error'); return }
    if (!meaning.trim()) { toast('请输入含义', 'error'); return }
    toast(`"${word}" 已添加到方言词典！`, 'success')
    setWord(''); setPron(''); setMeaning(''); onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="🗣️ 添加本地方言词汇" size="sm">
      <div className="space-y-4">
        <div>
          <label className="text-[11px] font-medium tracking-[0.04em] text-[var(--ink-soft)] mb-1.5 block">方言词汇 *</label>
          <input value={word} onChange={e => setWord(e.target.value)} placeholder="例：巴适"
            className="w-full px-3 py-2 rounded-lg text-[13px] outline-none"
            style={{ border: '1.5px solid rgba(180,150,120,0.25)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit' }} />
        </div>
        <div>
          <label className="text-[11px] font-medium tracking-[0.04em] text-[var(--ink-soft)] mb-1.5 block">发音</label>
          <input value={pron} onChange={e => setPron(e.target.value)} placeholder="例：bā sì"
            className="w-full px-3 py-2 rounded-lg text-[13px] outline-none"
            style={{ border: '1.5px solid rgba(180,150,120,0.25)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit' }} />
        </div>
        <div>
          <label className="text-[11px] font-medium tracking-[0.04em] text-[var(--ink-soft)] mb-1.5 block">含义 *</label>
          <textarea value={meaning} onChange={e => setMeaning(e.target.value)} rows={2} placeholder="这个词是什么意思…"
            className="w-full px-3 py-2 rounded-lg text-[13px] outline-none resize-none"
            style={{ border: '1.5px solid rgba(180,150,120,0.25)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit' }} />
        </div>
        <div className="flex gap-3 justify-end pt-2">
          <button onClick={onClose} className="picture-book-btn" style={{ fontSize: 12 }}>取消</button>
          <button onClick={handleSubmit} className="picture-book-btn primary" style={{ fontSize: 12 }}>➕ 添加</button>
        </div>
      </div>
    </Modal>
  )
}
