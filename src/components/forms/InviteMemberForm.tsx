'use client'
import { useState } from 'react'
import Modal from '@/components/ui/modal'
import { useToast } from '@/components/animations/Toast'

interface Props { open: boolean; onClose: () => void }

export default function InviteMemberForm({ open, onClose }: Props) {
  const { toast } = useToast()
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [email, setEmail] = useState('')

  const ROLES = [
    { k: 'teacher', l: '👨‍🏫 支教老师' },
    { k: 'vice_captain', l: '⭐ 副队长' },
    { k: 'advisor', l: '🎓 指导老师' },
    { k: 'local', l: '🏫 当地负责人' },
    { k: 'alumni', l: '📜 往届成员' },
  ]

  const handleSubmit = () => {
    if (!name.trim()) { toast('请输入姓名', 'error'); return }
    if (!role) { toast('请选择身份', 'error'); return }
    toast(`${name} 邀请发送成功！`, 'success')
    setName(''); setRole(''); setEmail(''); onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="👥 邀请新成员" size="sm">
      <div className="space-y-4">
        <div>
          <label className="text-[11px] font-medium tracking-[0.04em] text-[var(--ink-soft)] mb-1.5 block">姓名 *</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="成员姓名"
            className="w-full px-3 py-2 rounded-lg text-[13px] outline-none"
            style={{ border: '1.5px solid rgba(180,150,120,0.25)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit' }} />
        </div>
        <div>
          <label className="text-[11px] font-medium tracking-[0.04em] text-[var(--ink-soft)] mb-1.5 block">邮箱</label>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="邀请链接将发送到此邮箱"
            className="w-full px-3 py-2 rounded-lg text-[13px] outline-none"
            style={{ border: '1.5px solid rgba(180,150,120,0.25)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit' }} />
        </div>
        <div>
          <label className="text-[11px] font-medium tracking-[0.04em] text-[var(--ink-soft)] mb-1.5 block">身份 *</label>
          <div className="flex flex-wrap gap-2">
            {ROLES.map(r => (
              <span key={r.k} onClick={() => setRole(r.k)}
                className="px-3 py-1.5 rounded-full text-[11px] cursor-pointer transition-all select-none"
                style={{
                  border: `1.5px solid ${role === r.k ? 'rgba(160,120,70,0.45)' : 'rgba(180,150,120,0.2)'}`,
                  background: role === r.k ? 'rgba(200,150,80,0.08)' : 'transparent',
                  color: role === r.k ? 'var(--ink)' : 'var(--faded)',
                  fontWeight: role === r.k ? 600 : 400,
                }}>{r.l}</span>
            ))}
          </div>
        </div>
        <div className="flex gap-3 justify-end pt-2">
          <button onClick={onClose} className="picture-book-btn" style={{ fontSize: 12 }}>取消</button>
          <button onClick={handleSubmit} className="picture-book-btn primary" style={{ fontSize: 12 }}>📨 发送邀请</button>
        </div>
      </div>
    </Modal>
  )
}
