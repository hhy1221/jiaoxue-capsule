'use client'

import { useState } from 'react'
import Modal from '@/components/ui/modal'
import { useToast } from '@/components/animations/Toast'

interface Props { open: boolean; onClose: () => void }

const GRADE_OPTS = ['一年级','二年级','三年级','四年级','五年级','六年级']
const TAG_SUGGESTIONS = ['开朗','文静','调皮','爱画画','爱读书','数学好','写作好','运动好','有领导力','可爱','聪明','细心','害羞','勇敢','乐观','有爱心','爱唱歌','手工好','舞蹈好','爱提问','腼腆','独立','粘人','认真','幽默']

export default function CreateStudentForm({ open, onClose }: Props) {
  const { toast } = useToast()
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [age, setAge] = useState('')
  const [grade, setGrade] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [note, setNote] = useState('')

  const toggleTag = (tag: string) => {
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])
  }

  const handleSubmit = () => {
    if (!name.trim()) { toast('请输入学生姓名', 'error'); return }
    toast(`${name} 添加成功！`, 'success')
    setName(''); setNickname(''); setAge(''); setGrade(''); setTags([]); setNote('')
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="👧 新建学生档案" size="md">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-medium tracking-[0.04em] text-[var(--ink-soft)] mb-1.5 block">姓名 *</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="学生姓名"
              className="w-full px-3 py-2 rounded-lg text-[13px] outline-none transition-colors"
              style={{ border: '1.5px solid rgba(180,150,120,0.25)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit' }} />
          </div>
          <div>
            <label className="text-[11px] font-medium tracking-[0.04em] text-[var(--ink-soft)] mb-1.5 block">昵称</label>
            <input value={nickname} onChange={e => setNickname(e.target.value)} placeholder="小名/昵称"
              className="w-full px-3 py-2 rounded-lg text-[13px] outline-none transition-colors"
              style={{ border: '1.5px solid rgba(180,150,120,0.25)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit' }} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-medium tracking-[0.04em] text-[var(--ink-soft)] mb-1.5 block">年龄</label>
            <input value={age} onChange={e => setAge(e.target.value)} type="number" min={6} max={13} placeholder="6-13"
              className="w-full px-3 py-2 rounded-lg text-[13px] outline-none transition-colors"
              style={{ border: '1.5px solid rgba(180,150,120,0.25)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit' }} />
          </div>
          <div>
            <label className="text-[11px] font-medium tracking-[0.04em] text-[var(--ink-soft)] mb-1.5 block">年级</label>
            <select value={grade} onChange={e => setGrade(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-[13px] outline-none transition-colors"
              style={{ border: '1.5px solid rgba(180,150,120,0.25)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit' }}>
              <option value="">选择年级</option>
              {GRADE_OPTS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="text-[11px] font-medium tracking-[0.04em] text-[var(--ink-soft)] mb-1.5 block">个性标签（可多选）</label>
          <div className="flex flex-wrap gap-1.5">
            {TAG_SUGGESTIONS.map(tag => (
              <span
                key={tag}
                onClick={() => toggleTag(tag)}
                className="px-2.5 py-1 rounded-full text-[10px] cursor-pointer transition-all select-none"
                style={{
                  border: `1.5px solid ${tags.includes(tag) ? 'rgba(160,120,70,0.45)' : 'rgba(180,150,120,0.2)'}`,
                  background: tags.includes(tag) ? 'rgba(200,150,80,0.1)' : 'transparent',
                  color: tags.includes(tag) ? 'var(--ink)' : 'var(--faded)',
                  fontWeight: tags.includes(tag) ? 600 : 400,
                }}
              >{tag}</span>
            ))}
          </div>
        </div>
        <div>
          <label className="text-[11px] font-medium tracking-[0.04em] text-[var(--ink-soft)] mb-1.5 block">初始备注</label>
          <textarea value={note} onChange={e => setNote(e.target.value)} rows={3} placeholder="对这个学生的第一印象…"
            className="w-full px-3 py-2 rounded-lg text-[13px] outline-none resize-none transition-colors"
            style={{ border: '1.5px solid rgba(180,150,120,0.25)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit' }} />
        </div>
        <div className="flex gap-3 justify-end pt-2">
          <button onClick={onClose} className="picture-book-btn" style={{ fontSize: 12 }}>取消</button>
          <button onClick={handleSubmit} className="picture-book-btn primary" style={{ fontSize: 12 }}>✨ 创建档案</button>
        </div>
      </div>
    </Modal>
  )
}
