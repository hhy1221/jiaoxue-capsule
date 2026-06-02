'use client'

import { useEffect, useState } from 'react'

/**
 * 绘本纸屑雨 — 碎纸片+小星星+干花瓣
 * 触发后自动播放一次，然后自行清理
 */

interface Particle {
  id: number
  x: number         // 起始 X %
  type: 'paper' | 'star' | 'petal'
  color: string
  size: number
  rot: number       // 初始旋转
  dur: number       // 下落时长
  sway: number      // 横向摇摆幅度
  delay: number
}

const COLORS_PAPER  = ['#f5ead8','#e8ddd0','#fdf0d0','#f0e0c0','#e0d0b8']
const COLORS_STAR   = ['#f0c060','#d4a040','#f8d080','#e8b850']
const COLORS_PETAL  = ['#e8c8c0','#d8b0a8','#e0c0b8','#c89888','#f0d8d0']

function genParticles(): Particle[] {
  const result: Particle[] = []
  for (let i = 0; i < 28; i++) {
    const typeRand = Math.random()
    const type: Particle['type'] = typeRand < 0.55 ? 'paper' : typeRand < 0.8 ? 'star' : 'petal'
    const colors = type === 'paper' ? COLORS_PAPER : type === 'star' ? COLORS_STAR : COLORS_PETAL
    result.push({
      id: i,
      x: Math.random() * 90 + 5,       // 5-95%
      type,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: type === 'star' ? 6 + Math.random() * 6 : 4 + Math.random() * 8,
      rot: Math.random() * 360,
      dur: 2.5 + Math.random() * 3,
      sway: 20 + Math.random() * 60,
      delay: Math.random() * 0.6,
    })
  }
  return result
}

interface Props {
  active: boolean
}

export default function Confetti({ active }: Props) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (active && !visible) {
      setParticles(genParticles())
      setVisible(true)
      const t = setTimeout(() => setVisible(false), 4500)
      return () => clearTimeout(t)
    }
  }, [active])

  if (!visible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[5000] overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: '-30px',
            width: p.type === 'star' ? p.size : p.size * 1.3,
            height: p.type === 'star' ? p.size : p.size * 0.7,
            background: p.color,
            borderRadius: p.type === 'petal' ? '50% 0 50% 0' : p.type === 'star' ? '0' : '2px',
            transform: `rotate(${p.rot}deg)`,
            opacity: 0.85,
            animation: `confettiDrop ${p.dur}s ease-in ${p.delay}s both`,
            // @ts-ignore
            '--sway': `${p.sway}px`,
          }}
        />
      ))}
      <style>{`
        @keyframes confettiDrop {
          0%   { opacity: 0.9; transform: translate(0, 0) rotate(0deg); }
          15%  { opacity: 1; }
          40%  { transform: translate(var(--sway), 40vh) rotate(200deg); }
          75%  { transform: translate(calc(var(--sway) * -0.5), 75vh) rotate(500deg); }
          100% { opacity: 0; transform: translate(calc(var(--sway) * 0.3), 105vh) rotate(720deg); }
        }
      `}</style>
    </div>
  )
}
