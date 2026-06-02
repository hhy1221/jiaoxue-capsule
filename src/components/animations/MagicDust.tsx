'use client'

/**
 * 魔法尘埃 — 首页玻璃卡周围浮动的微光粒子
 * 像翻开旧书时扬起的灰尘在阳光中跳舞
 */

const DUST = [
  { cx: 38, cy: 32, size: 6, color: 'rgba(255,255,255,0.7)',  dur: 6.5, delay: 0,   glow: 14 },
  { cx: 58, cy: 28, size: 5, color: 'rgba(255,255,255,0.55)', dur: 7.8, delay: 1.2, glow: 10 },
  { cx: 44, cy: 40, size: 7, color: 'rgba(255,255,255,0.75)', dur: 6.0, delay: 2.4, glow: 16 },
  { cx: 68, cy: 45, size: 5, color: 'rgba(255,255,255,0.5)',  dur: 8.5, delay: 0.6, glow: 8 },
  { cx: 32, cy: 52, size: 6, color: 'rgba(255,255,255,0.65)', dur: 7.0, delay: 3.2, glow: 12 },
  { cx: 54, cy: 56, size: 5, color: 'rgba(255,255,255,0.55)', dur: 7.5, delay: 1.8, glow: 9 },
  { cx: 42, cy: 48, size: 7, color: 'rgba(255,255,255,0.7)',  dur: 6.3, delay: 4.0, glow: 15 },
  { cx: 63, cy: 36, size: 6, color: 'rgba(255,255,255,0.75)', dur: 7.2, delay: 0.3, glow: 14 },
  { cx: 50, cy: 44, size: 5, color: 'rgba(255,255,255,0.5)',  dur: 8.0, delay: 2.1, glow: 7 },
  // 金色
  { cx: 43, cy: 36, size: 6, color: 'rgba(240,192,96,0.65)',  dur: 5.8, delay: 1.5, glow: 16 },
  { cx: 56, cy: 50, size: 5, color: 'rgba(240,192,96,0.55)',  dur: 6.9, delay: 3.8, glow: 11 },
  { cx: 49, cy: 34, size: 6, color: 'rgba(240,192,96,0.7)',   dur: 7.5, delay: 0.9, glow: 15 },
  // 暖琥珀
  { cx: 51, cy: 55, size: 5, color: 'rgba(255,220,170,0.55)', dur: 6.7, delay: 4.5, glow: 10 },
  { cx: 39, cy: 43, size: 6, color: 'rgba(255,220,170,0.65)', dur: 7.8, delay: 2.7, glow: 13 },
  { cx: 60, cy: 40, size: 5, color: 'rgba(255,255,255,0.6)',  dur: 6.2, delay: 1.1, glow: 9 },
  { cx: 35, cy: 46, size: 6, color: 'rgba(255,255,255,0.65)', dur: 7.0, delay: 3.5, glow: 13 },
  { cx: 65, cy: 53, size: 5, color: 'rgba(240,192,96,0.5)',   dur: 8.2, delay: 0.4, glow: 8 },
  { cx: 46, cy: 38, size: 7, color: 'rgba(255,255,255,0.7)',  dur: 6.9, delay: 2.9, glow: 15 },
  { cx: 28, cy: 38, size: 5, color: 'rgba(255,255,255,0.5)',  dur: 7.6, delay: 1.7, glow: 10 },
  { cx: 70, cy: 32, size: 6, color: 'rgba(255,220,170,0.6)',  dur: 6.5, delay: 3.0, glow: 12 },
  { cx: 55, cy: 60, size: 5, color: 'rgba(255,255,255,0.55)', dur: 7.3, delay: 5.0, glow: 9 },
  { cx: 40, cy: 58, size: 6, color: 'rgba(240,192,96,0.6)',   dur: 6.8, delay: 2.2, glow: 14 },
  { cx: 62, cy: 48, size: 5, color: 'rgba(255,255,255,0.6)',  dur: 6.4, delay: 1.4, glow: 10 },
  { cx: 33, cy: 40, size: 6, color: 'rgba(255,255,255,0.65)', dur: 8.0, delay: 4.8, glow: 12 },
]

export default function MagicDust() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[2]" style={{ overflow: 'hidden' }}>
      {DUST.map((d, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: `${d.cx}%`, top: `${d.cy}%`,
            width: d.size, height: d.size, borderRadius: '50%',
            background: d.color,
            boxShadow: `0 0 ${d.glow}px ${d.size}px ${d.color}`,
            opacity: 0,
            // @ts-ignore
            '--rx': `${(i % 3 + 4)}vw`,
            '--ry': `${(i % 4 + 3)}vh`,
            animation: `dustFloat ${d.dur}s ease-in-out infinite`,
            animationDelay: `${d.delay}s`,
            willChange: 'transform, opacity',
          }}
        />
      ))}
      <style>{`
        @keyframes dustFloat {
          0%   { opacity: 0;   transform: translate(0, 0) scale(0.8); }
          10%  { opacity: 0.7; }
          35%  { opacity: 1;   transform: translate(var(--rx), calc(var(--ry) * -0.5)) scale(1.3); }
          50%  { opacity: 0.8; transform: translate(calc(var(--rx) * 0.5), var(--ry)) scale(0.9); }
          75%  { opacity: 0.9; transform: translate(calc(var(--rx) * -0.4), calc(var(--ry) * 0.6)) scale(1.1); }
          88%  { opacity: 0.6; }
          100% { opacity: 0;   transform: translate(0, 0) scale(0.8); }
        }
      `}</style>
    </div>
  )
}
