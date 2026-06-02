'use client'

import { useEffect, useState, useRef } from 'react'

/**
 * 魔法阵 — AI 生成内容时显示
 * 双层旋转光环 + 轨道 emoji + 呼吸光晕
 * 生成完成时碎裂为粒子散开
 */

const ORBIT_EMOJIS = ['✨', '📝', '🌟', '💫', '🔮', '✏️', '📖', '🎨']

interface Props {
  active: boolean      // 是否正在生成
  label?: string       // 提示文字
}

export default function CastingCircle({ active, label = 'AI 正在生成…' }: Props) {
  const [shatter, setShatter] = useState(false)
  const [hidden, setHidden] = useState(!active)
  const shatterTimer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    if (active) {
      setHidden(false)
      setShatter(false)
    } else if (!active && !shatter) {
      // 从 active→!active：触发碎裂
      setShatter(true)
      shatterTimer.current = setTimeout(() => setHidden(true), 900)
    }
    return () => { if (shatterTimer.current) clearTimeout(shatterTimer.current) }
  }, [active])

  if (hidden) return null

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12 relative">
      {/* 外层光晕 — 呼吸 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(200,150,60,0.06) 0%, transparent 70%)',
          animation: 'castBreathe 2s ease-in-out infinite',
        }}
      />

      {/* 魔法阵主体区域 */}
      <div className="relative" style={{ width: 140, height: 140 }}>
        {/* 外环 — 顺时针 */}
        <div
          className="absolute rounded-full"
          style={{
            inset: 0,
            border: '2px solid transparent',
            borderTopColor: 'rgba(200,150,60,0.5)',
            borderRightColor: 'rgba(200,150,60,0.15)',
            animation: `${shatter ? 'castShatter' : 'castSpin'} ${shatter ? '0.6s' : '2.4s'} linear ${shatter ? 'forwards' : 'infinite'}`,
          }}
        />
        {/* 内环 — 逆时针，略小 */}
        <div
          className="absolute rounded-full"
          style={{
            inset: 16,
            border: '1.5px solid transparent',
            borderBottomColor: 'rgba(200,150,60,0.35)',
            borderLeftColor: 'rgba(200,150,60,0.1)',
            animation: `${shatter ? 'castShatterInner' : 'castSpinReverse'} ${shatter ? '0.55s' : '1.8s'} linear ${shatter ? 'forwards' : 'infinite'}`,
          }}
        />
        {/* 中心光点 */}
        <div
          className="absolute rounded-full"
          style={{
            inset: 48,
            background: 'radial-gradient(circle, rgba(240,192,96,0.3), transparent)',
            animation: `castPulse 1.5s ease-in-out ${shatter ? 'forwards' : 'infinite'}`,
          }}
        />

        {/* 轨道 emoji */}
        {!shatter && ORBIT_EMOJIS.map((emoji, i) => {
          const angle = (i / ORBIT_EMOJIS.length) * Math.PI * 2
          const r = 54 // 半径
          const x = Math.cos(angle) * r
          const y = Math.sin(angle) * r
          return (
            <span
              key={i}
              className="absolute text-[13px] pointer-events-none select-none"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
                animation: `castOrbitFloat 2s ease-in-out ${i * 0.25}s infinite`,
              }}
            >
              {emoji}
            </span>
          )
        })}

        {/* 碎裂粒子 */}
        {shatter && Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2
          return (
            <span
              key={`p-${i}`}
              className="absolute rounded-full"
              style={{
                width: 4 + Math.random() * 3,
                height: 4 + Math.random() * 3,
                background: `rgba(${200 + Math.random() * 55},${140 + Math.random() * 60},${50 + Math.random() * 40},0.6)`,
                left: '50%', top: '50%',
                animation: `castParticle 0.7s ease-out ${i * 0.02}s forwards`,
                // @ts-ignore
                '--px': `${Math.cos(angle) * (40 + Math.random() * 50)}px`,
                '--py': `${Math.sin(angle) * (40 + Math.random() * 50)}px`,
              }}
            />
          )
        })}
      </div>

      {/* 提示文字 */}
      <p
        className="handwriting text-[13px] tracking-[0.06em] select-none"
        style={{
          color: 'var(--faded)',
          opacity: shatter ? 0 : 1,
          transition: 'opacity 0.3s',
        }}
      >
        {shatter ? '生成完成 ✨' : label}
      </p>

      <style>{`
        @keyframes castSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes castSpinReverse {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes castPulse {
          0%, 100% { opacity: 0.4; transform: scale(0.9); }
          50%      { opacity: 1; transform: scale(1.25); }
        }
        @keyframes castBreathe {
          0%, 100% { opacity: 0.6; }
          50%      { opacity: 1; }
        }
        @keyframes castOrbitFloat {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); opacity: 0.5; }
          50%      { transform: translate(-50%, -50%) translateY(-5px); opacity: 1; }
        }
        @keyframes castShatter {
          0%   { transform: rotate(0deg) scale(1); opacity: 1; }
          100% { transform: rotate(90deg) scale(1.4); opacity: 0; }
        }
        @keyframes castShatterInner {
          0%   { transform: rotate(0deg) scale(1); opacity: 1; }
          100% { transform: rotate(-60deg) scale(1.6); opacity: 0; }
        }
        @keyframes castParticle {
          0%   { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
          100% { transform: translate(calc(-50% + var(--px)), calc(-50% + var(--py))) scale(0); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
