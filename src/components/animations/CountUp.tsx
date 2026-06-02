'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * 数字翻滚 — 从 0 翻滚到目标值，像老式计数器
 * 伴随"墨水干燥"颜色过渡
 */

interface Props {
  target: number
  duration?: number      // ms
  suffix?: string        // e.g. "%", "+"
  className?: string
  style?: React.CSSProperties
}

export default function CountUp({ target, duration = 800, suffix = '', className, style }: Props) {
  const [value, setValue] = useState(0)
  const [inkDry, setInkDry] = useState(false)
  const rafRef = useRef<number>(undefined)
  const startTime = useRef<number>(undefined)

  useEffect(() => {
    startTime.current = undefined
    setInkDry(false)

    // easeOutExpo
    function easeOutExpo(t: number) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
    }

    function tick(now: number) {
      if (!startTime.current) startTime.current = now
      const elapsed = now - startTime.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutExpo(progress)

      setValue(Math.round(eased * target))

      if (progress >= 0.85 && !inkDry) {
        setInkDry(true)
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    // 微延迟，让卡片的飘落动画先开始
    const delayTimer = setTimeout(() => {
      rafRef.current = requestAnimationFrame(tick)
    }, 250)

    return () => {
      clearTimeout(delayTimer)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [target, duration])

  return (
    <span
      className={className}
      style={{
        ...style,
        color: inkDry ? style?.color || 'var(--ink)' : 'rgba(180,150,120,0.5)',
        transition: 'color 0.6s ease-out',
        fontFamily: 'var(--font-serif)',
      }}
    >
      {value}{suffix}
    </span>
  )
}
