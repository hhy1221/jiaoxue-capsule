'use client'

/**
 * 魔法尘埃 — 首页玻璃卡周围浮动的微光粒子
 * 像翻开旧书时扬起的灰尘在阳光中跳舞
 *
 * 18 颗粒子，每颗独立运动轨迹/速度/大小/颜色
 * 纯 CSS 动画，零 JS 开销
 */

const DUST: {
  id: number
  cx: number // center X % 相对于容器
  cy: number // center Y %
  rx: number // X 摆动半径 vw
  ry: number // Y 摆动半径 vh
  size: number // px
  color: string
  dur: number // 循环秒数
  delay: number
  glow: boolean
}[] = [
  // ── 白色微光（主体）──
  { id: 1,  cx: 35, cy: 35, rx: 6, ry: 4,  size: 3, color: 'rgba(255,255,255,0.45)', dur: 7.2, delay: 0,   glow: true },
  { id: 2,  cx: 60, cy: 30, rx: 5, ry: 5,  size: 2, color: 'rgba(255,255,255,0.35)', dur: 8.5, delay: 1.2, glow: false },
  { id: 3,  cx: 45, cy: 42, rx: 7, ry: 3,  size: 4, color: 'rgba(255,255,255,0.5)',  dur: 6.8, delay: 2.4, glow: true },
  { id: 4,  cx: 70, cy: 48, rx: 4, ry: 6,  size: 2, color: 'rgba(255,255,255,0.3)',  dur: 9.0, delay: 0.6, glow: false },
  { id: 5,  cx: 30, cy: 55, rx: 5, ry: 4,  size: 3, color: 'rgba(255,255,255,0.4)',  dur: 7.6, delay: 3.0, glow: true },
  { id: 6,  cx: 55, cy: 60, rx: 6, ry: 5,  size: 2, color: 'rgba(255,255,255,0.35)', dur: 8.2, delay: 1.8, glow: false },
  { id: 7,  cx: 40, cy: 50, rx: 8, ry: 3,  size: 3, color: 'rgba(255,255,255,0.45)', dur: 6.5, delay: 4.0, glow: true },
  { id: 8,  cx: 65, cy: 38, rx: 4, ry: 7,  size: 4, color: 'rgba(255,255,255,0.5)',  dur: 7.9, delay: 0.3, glow: true },
  { id: 9,  cx: 50, cy: 45, rx: 5, ry: 5,  size: 2, color: 'rgba(255,255,255,0.3)',  dur: 8.8, delay: 2.1, glow: false },
  // ── 金色亮点（金粉，2-3颗）──
  { id: 10, cx: 42, cy: 38, rx: 4, ry: 3,  size: 3, color: 'rgba(240,192,96,0.4)',  dur: 6.3, delay: 1.5, glow: true },
  { id: 11, cx: 58, cy: 52, rx: 5, ry: 4,  size: 2, color: 'rgba(240,192,96,0.35)', dur: 7.4, delay: 3.5, glow: false },
  { id: 12, cx: 48, cy: 35, rx: 3, ry: 5,  size: 3, color: 'rgba(240,192,96,0.45)', dur: 8.1, delay: 0.9, glow: true },
  // ── 暖琥珀微光 —
  { id: 13, cx: 52, cy: 58, rx: 6, ry: 3,  size: 2, color: 'rgba(255,220,170,0.35)', dur: 7.0, delay: 4.5, glow: false },
  { id: 14, cx: 38, cy: 44, rx: 5, ry: 6,  size: 3, color: 'rgba(255,220,170,0.4)',  dur: 8.4, delay: 2.7, glow: true },
  { id: 15, cx: 62, cy: 42, rx: 7, ry: 4,  size: 2, color: 'rgba(255,255,255,0.38)', dur: 6.9, delay: 1.1, glow: false },
  { id: 16, cx: 33, cy: 48, rx: 4, ry: 5,  size: 3, color: 'rgba(255,255,255,0.42)', dur: 7.5, delay: 3.2, glow: true },
  { id: 17, cx: 67, cy: 55, rx: 5, ry: 3,  size: 2, color: 'rgba(240,192,96,0.3)',  dur: 8.6, delay: 0.4, glow: false },
  { id: 18, cx: 44, cy: 41, rx: 3, ry: 4,  size: 4, color: 'rgba(255,255,255,0.35)', dur: 7.8, delay: 2.9, glow: true },
]

export default function MagicDust() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{ overflow: 'hidden' }}
    >
      {DUST.map(d => (
        <span
          key={d.id}
          className="dust-particle"
          style={{
            // @ts-ignore
            '--cx': `${d.cx}%`,
            '--cy': `${d.cy}%`,
            '--rx': `${d.rx}vw`,
            '--ry': `${d.ry}vh`,
            '--dur': `${d.dur}s`,
            '--delay': `${d.delay}s`,
            position: 'absolute',
            left: `${d.cx}%`,
            top: `${d.cy}%`,
            width: d.size,
            height: d.size,
            borderRadius: '50%',
            background: d.color,
            boxShadow: d.glow ? `0 0 ${d.size * 3}px ${d.size}px ${d.color}` : 'none',
            opacity: 0,
            animationName: 'dustFloat',
            animationDuration: `${d.dur}s`,
            animationDelay: `${d.delay}s`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            willChange: 'transform, opacity',
          }}
        />
      ))}

      <style>{`
        @keyframes dustFloat {
          0%   { opacity: 0; transform: translate(0, 0) scale(0.8); }
          10%  { opacity: 0.8; }
          45%  { opacity: 1; transform: translate(var(--rx), calc(var(--ry) * -0.5)) scale(1.15); }
          55%  { opacity: 0.7; transform: translate(calc(var(--rx) * 0.6), var(--ry)) scale(0.9); }
          75%  { opacity: 0.9; transform: translate(calc(var(--rx) * -0.4), calc(var(--ry) * 0.7)) scale(1.05); }
          90%  { opacity: 0.5; }
          100% { opacity: 0; transform: translate(0, 0) scale(0.8); }
        }
      `}</style>
    </div>
  )
}
