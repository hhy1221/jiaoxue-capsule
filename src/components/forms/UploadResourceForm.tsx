'use client'
import { useState } from 'react'
import Modal from '@/components/ui/modal'
import { useToast } from '@/components/animations/Toast'

interface Props { open: boolean; onClose: () => void }

const TYPES = [
  { k: 'ppt', l: '📊 PPT课件' },
  { k: 'pdf', l: '📄 PDF文档' },
  { k: 'word', l: '📝 Word文档' },
  { k: 'image', l: '🖼️ 图片' },
  { k: 'video', l: '🎬 视频' },
  { k: 'other', l: '📦 其他' },
]

export default function UploadResourceForm({ open, onClose }: Props) {
  const { toast } = useToast()
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [desc, setDesc] = useState('')

  const handleSubmit = () => {
    if (!name.trim()) { toast('请输入资源名称', 'error'); return }
    if (!type) { toast('请选择资源类型', 'error'); return }
    toast(`"${name}" 上传成功！`, 'success')
    setName(''); setType(''); setDesc(''); onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="📦 上传资源" size="sm">
      <div className="space-y-4">
        <div>
          <label className="text-[11px] font-medium tracking-[0.04em] text-[var(--ink-soft)] mb-1.5 block">资源名称 *</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="给资源起个名字"
            className="w-full px-3 py-2 rounded-lg text-[13px] outline-none"
            style={{ border: '1.5px solid rgba(180,150,120,0.25)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit' }} />
        </div>
        <div>
          <label className="text-[11px] font-medium tracking-[0.04em] text-[var(--ink-soft)] mb-1.5 block">资源类型 *</label>
          <div className="flex flex-wrap gap-2">
            {TYPES.map(t => (
              <span key={t.k} onClick={() => setType(t.k)}
                className="px-3 py-1.5 rounded-full text-[11px] cursor-pointer transition-all select-none"
                style={{
                  border: `1.5px solid ${type === t.k ? 'rgba(160,120,70,0.45)' : 'rgba(180,150,120,0.2)'}`,
                  background: type === t.k ? 'rgba(200,150,80,0.08)' : 'transparent',
                  color: type === t.k ? 'var(--ink)' : 'var(--faded)',
                  fontWeight: type === t.k ? 600 : 400,
                }}>{t.l}</span>
            ))}
          </div>
        </div>
        <div>
          <label className="text-[11px] font-medium tracking-[0.04em] text-[var(--ink-soft)] mb-1.5 block">描述</label>
          <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={2} placeholder="简要描述资源内容…"
            className="w-full px-3 py-2 rounded-lg text-[13px] outline-none resize-none"
            style={{ border: '1.5px solid rgba(180,150,120,0.25)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit' }} />
        </div>
        {/* 模拟上传区域 */}
        <div className="p-6 rounded-lg text-center cursor-pointer transition-all"
          style={{ border: '2px dashed rgba(180,150,120,0.3)', background: 'rgba(245,238,220,0.3)' }}>
          <div className="text-3xl mb-2 opacity-40">📁</div>
          <p className="text-[11px]" style={{ color: 'var(--faded)' }}>拖拽文件到此处，或点击选择</p>
          <p className="text-[9px] mt-1 opacity-50" style={{ color: 'var(--faded)' }}>支持 PPT/PDF/Word/图片/视频</p>
        </div>
        <div className="flex gap-3 justify-end pt-2">
          <button onClick={onClose} className="picture-book-btn" style={{ fontSize: 12 }}>取消</button>
          <button onClick={handleSubmit} className="picture-book-btn primary" style={{ fontSize: 12 }}>📤 上传</button>
        </div>
      </div>
    </Modal>
  )
}
