'use client'
import { useState } from 'react'
import Modal from '@/components/ui/modal'
import { useToast } from '@/components/animations/Toast'

interface Props { open: boolean; onClose: () => void; studentName?: string }

export default function AddGrowthRecordForm({ open, onClose, studentName }: Props) {
  const { toast } = useToast()
  const [type, setType] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [mood, setMood] = useState('')

  const TYPES = [
    { k: 'milestone', l: '🏔️ 里程碑', desc: '重要的成长节点' },
    { k: 'achievement', l: '🏆 成就', desc: '获得的成绩或奖励' },
    { k: 'photo', l: '📸 照片记录', desc: '值得珍藏的瞬间' },
    { k: 'note', l: '📝 观察笔记', desc: '日常教学观察' },
  ]
  const MOODS = [
    { k: 'happy', l: '😊 开心' },
    { k: 'normal', l: '😐 平常' },
    { k: 'touched', l: '🥹 感动' },
  ]

  const handleSubmit = () => {
    if (!title.trim()) { toast('请输入记录标题', 'error'); return }
    if (!type) { toast('请选择记录类型', 'error'); return }
    toast(`${studentName || '学生'}的成长记录已添加！`, 'success')
    setType(''); setTitle(''); setContent(''); setMood(''); onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title={`📝 ${studentName ? `为${studentName}` : ''}添加成长记录`} size="md">
      <div className="space-y-4">
        <div>
          <label className="text-[11px] font-medium tracking-[0.04em] text-[var(--ink-soft)] mb-1.5 block">记录类型</label>
          <div className="grid grid-cols-2 gap-2">
            {TYPES.map(t => (
              <div key={t.k} onClick={() => setType(t.k)}
                className="p-2.5 rounded-lg cursor-pointer transition-all text-center"
                style={{
                  border: `1.5px solid ${type === t.k ? 'rgba(160,120,70,0.5)' : 'rgba(180,150,120,0.18)'}`,
                  background: type === t.k ? 'rgba(200,150,80,0.06)' : 'transparent',
                }}>
                <div className="text-[13px] font-semibold text-[var(--ink)]">{t.l}</div>
                <div className="text-[10px] mt-0.5" style={{ color: 'var(--faded)' }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="text-[11px] font-medium tracking-[0.04em] text-[var(--ink-soft)] mb-1.5 block">标题 *</label>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="给这段记录起个名字"
            className="w-full px-3 py-2 rounded-lg text-[13px] outline-none"
            style={{ border: '1.5px solid rgba(180,150,120,0.25)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit' }} />
        </div>
        <div>
          <label className="text-[11px] font-medium tracking-[0.04em] text-[var(--ink-soft)] mb-1.5 block">详细描述</label>
          <textarea value={content} onChange={e => setContent(e.target.value)} rows={4} placeholder="发生了什么？你有什么感受？"
            className="w-full px-3 py-2 rounded-lg text-[13px] outline-none resize-none"
            style={{ border: '1.5px solid rgba(180,150,120,0.25)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit' }} />
        </div>
        <div>
          <label className="text-[11px] font-medium tracking-[0.04em] text-[var(--ink-soft)] mb-1.5 block">心情</label>
          <div className="flex gap-2">
            {MOODS.map(m => (
              <span key={m.k} onClick={() => setMood(m.k)}
                className="px-3 py-1.5 rounded-full text-[11px] cursor-pointer transition-all select-none"
                style={{
                  border: `1.5px solid ${mood === m.k ? 'rgba(160,120,70,0.45)' : 'rgba(180,150,120,0.2)'}`,
                  background: mood === m.k ? 'rgba(200,150,80,0.08)' : 'transparent',
                  color: mood === m.k ? 'var(--ink)' : 'var(--faded)',
                  fontWeight: mood === m.k ? 600 : 400,
                }}>{m.l}</span>
            ))}
          </div>
        </div>
        <div className="flex gap-3 justify-end pt-2">
          <button onClick={onClose} className="picture-book-btn" style={{ fontSize: 12 }}>取消</button>
          <button onClick={handleSubmit} className="picture-book-btn primary" style={{ fontSize: 12 }}>📝 保存记录</button>
        </div>
      </div>
    </Modal>
  )
}
