'use client'

import { useState } from 'react'
import Modal from '@/components/ui/modal'
import { useToast } from '@/components/animations/Toast'

interface Props { open: boolean; onClose: () => void }

const TONES = [
  { key: 'poetic', label: '🌸 温柔诗意', desc: '像春风拂过书页，轻声细语' },
  { key: 'friendly', label: '☕ 老友絮语', desc: '像老朋友坐着聊天，亲切随意' },
  { key: 'strict', label: '📖 严师慈言', desc: '严格但温暖，鞭策中带着期望' },
  { key: 'energetic', label: '🔥 燃系励志', desc: '热血澎湃，点燃少年的斗志' },
  { key: 'playful', label: '🎈 童趣轻松', desc: '像讲故事一样，充满童心和趣味' },
]

export default function BatchLetterDialog({ open, onClose }: Props) {
  const { toast } = useToast()
  const [tone, setTone] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const [generating, setGenerating] = useState(false)

  const students = ['刘小宇','陈小雨','王浩然','张欣怡','李子涵','赵小萌','孙大勇','周小雅']

  const toggleStudent = (s: string) => {
    setSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  const handleGenerate = () => {
    if (!tone) { toast('请先选择语气风格', 'error'); return }
    if (selected.length === 0) { toast('请至少选择一位学生', 'error'); return }
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      toast(`已为 ${selected.length} 位学生生成临别信！`, 'success')
      onClose()
    }, 2000)
  }

  return (
    <Modal open={open} onClose={onClose} title="✨ 批量生成临别信" size="md">
      <div className="space-y-5">
        <div>
          <label className="text-[11px] font-medium tracking-[0.04em] text-[var(--ink-soft)] mb-2 block">选择语气风格</label>
          <div className="grid grid-cols-1 gap-2">
            {TONES.map(t => (
              <div key={t.key}
                onClick={() => setTone(t.key)}
                className="p-3 rounded-lg cursor-pointer transition-all"
                style={{
                  border: `1.5px solid ${tone === t.key ? 'rgba(160,120,70,0.5)' : 'rgba(180,150,120,0.18)'}`,
                  background: tone === t.key ? 'rgba(200,150,80,0.06)' : 'transparent',
                }}>
                <div className="text-[13px] font-semibold text-[var(--ink)]">{t.label}</div>
                <div className="text-[11px] mt-0.5" style={{ color: 'var(--faded)' }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="text-[11px] font-medium tracking-[0.04em] text-[var(--ink-soft)] mb-2 block">选择学生（可多选）</label>
          <div className="flex flex-wrap gap-2">
            {students.map(s => (
              <span key={s}
                onClick={() => toggleStudent(s)}
                className="px-3 py-1.5 rounded-full text-[12px] cursor-pointer transition-all select-none"
                style={{
                  border: `1.5px solid ${selected.includes(s) ? 'rgba(160,120,70,0.45)' : 'rgba(180,150,120,0.2)'}`,
                  background: selected.includes(s) ? 'rgba(200,150,80,0.1)' : 'transparent',
                  color: selected.includes(s) ? 'var(--ink)' : 'var(--faded)',
                  fontWeight: selected.includes(s) ? 600 : 400,
                }}>
                {selected.includes(s) ? '✓ ' : ''}{s}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-3 justify-end pt-2">
          <button onClick={onClose} className="picture-book-btn" style={{ fontSize: 12 }}>取消</button>
          <button onClick={handleGenerate} disabled={generating} className="picture-book-btn primary" style={{ fontSize: 12 }}>
            {generating ? '生成中…' : `✨ 生成 ${selected.length || 0} 封`}
          </button>
        </div>
      </div>
    </Modal>
  )
}
