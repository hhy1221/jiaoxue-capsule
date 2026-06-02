'use client'
import { useState } from 'react'
import Modal from '@/components/ui/modal'
import { useToast } from '@/components/animations/Toast'

interface Props { open: boolean; onClose: () => void }

const STUDENTS = ['刘小宇','陈小雨','王浩然','张欣怡','李子涵','赵小萌','孙大勇','周小雅']

export default function WriteReviewForm({ open, onClose }: Props) {
  const { toast } = useToast()
  const [student, setStudent] = useState('')
  const [rating, setRating] = useState(0)
  const [content, setContent] = useState('')

  const handleSubmit = () => {
    if (!student) { toast('请选择学生', 'error'); return }
    if (rating === 0) { toast('请打星评分', 'error'); return }
    toast(`对${student}的评价已保存！`, 'success')
    setStudent(''); setRating(0); setContent(''); onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="⭐ 写评价" size="md">
      <div className="space-y-4">
        <div>
          <label className="text-[11px] font-medium tracking-[0.04em] text-[var(--ink-soft)] mb-1.5 block">选择学生 *</label>
          <select value={student} onChange={e => setStudent(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-[13px] outline-none"
            style={{ border: '1.5px solid rgba(180,150,120,0.25)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit' }}>
            <option value="">选择学生</option>
            {STUDENTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[11px] font-medium tracking-[0.04em] text-[var(--ink-soft)] mb-1.5 block">评分</label>
          <div className="flex gap-1.5">
            {[1,2,3,4,5].map(i => (
              <span key={i} onClick={() => setRating(i)}
                className="text-2xl cursor-pointer transition-transform hover:scale-125 select-none"
                style={{ opacity: i <= rating ? 1 : 0.25, transform: i <= rating ? 'scale(1.15)' : 'scale(1)' }}>
                ⭐
              </span>
            ))}
          </div>
        </div>
        <div>
          <label className="text-[11px] font-medium tracking-[0.04em] text-[var(--ink-soft)] mb-1.5 block">评语</label>
          <textarea value={content} onChange={e => setContent(e.target.value)} rows={4} placeholder="写下你对学生的评价…"
            className="w-full px-3 py-2 rounded-lg text-[13px] outline-none resize-none"
            style={{ border: '1.5px solid rgba(180,150,120,0.25)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit' }} />
        </div>
        <div className="flex gap-3 justify-end pt-2">
          <button onClick={onClose} className="picture-book-btn" style={{ fontSize: 12 }}>取消</button>
          <button onClick={handleSubmit} className="picture-book-btn primary" style={{ fontSize: 12 }}>⭐ 提交评价</button>
        </div>
      </div>
    </Modal>
  )
}
