'use client'

import { useState } from 'react'
import Modal from '@/components/ui/modal'
import { useToast } from '@/components/animations/Toast'

interface Props { open: boolean; onClose: () => void }

export default function CreateAlbumForm({ open, onClose }: Props) {
  const { toast } = useToast()
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')

  const handleSubmit = () => {
    if (!name.trim()) { toast('请输入相册名称', 'error'); return }
    toast(`相册"${name}"创建成功！`, 'success')
    setName(''); setDesc(''); onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="📷 新建相册" size="sm">
      <div className="space-y-4">
        <div>
          <label className="text-[11px] font-medium tracking-[0.04em] text-[var(--ink-soft)] mb-1.5 block">相册名称 *</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="例：运动会特辑、手工课作品展…"
            className="w-full px-3 py-2 rounded-lg text-[13px] outline-none transition-colors"
            style={{ border: '1.5px solid rgba(180,150,120,0.25)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit' }} />
        </div>
        <div>
          <label className="text-[11px] font-medium tracking-[0.04em] text-[var(--ink-soft)] mb-1.5 block">描述</label>
          <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3} placeholder="这个相册记录了什么…"
            className="w-full px-3 py-2 rounded-lg text-[13px] outline-none resize-none transition-colors"
            style={{ border: '1.5px solid rgba(180,150,120,0.25)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit' }} />
        </div>
        <div className="flex gap-3 justify-end pt-2">
          <button onClick={onClose} className="picture-book-btn" style={{ fontSize: 12 }}>取消</button>
          <button onClick={handleSubmit} className="picture-book-btn primary" style={{ fontSize: 12 }}>📷 创建</button>
        </div>
      </div>
    </Modal>
  )
}
