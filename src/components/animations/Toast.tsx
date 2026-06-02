'use client'

import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'

/**
 * Toast 便签贴入 — 像一张便签纸拍到屏幕上然后微微弹回
 * 支持 success / error / info 三种样式
 */

type ToastType = 'success' | 'error' | 'info'

interface ToastItem {
  id: number
  message: string
  type: ToastType
  leaving: boolean
}

interface ToastCtx {
  toast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastCtx>({ toast: () => {} })

export function useToast() {
  return useContext(ToastContext)
}

const TYPE_STYLES: Record<ToastType, { bg: string; border: string; emoji: string; tape: string }> = {
  success: { bg: '#f0f7e8', border: 'rgba(140,180,120,0.35)', emoji: '✅', tape: 'rgba(185,210,190,0.55)' },
  error:   { bg: '#fdf0ee', border: 'rgba(210,140,130,0.35)', emoji: '❌', tape: 'rgba(228,180,165,0.55)' },
  info:    { bg: '#fefcf7', border: 'rgba(180,150,120,0.3)',  emoji: '📌', tape: 'rgba(220,195,160,0.6)' },
}

let nextId = 0

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])
  const timers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map())

  const remove = useCallback((id: number) => {
    setItems(prev => prev.map(it => it.id === id ? { ...it, leaving: true } : it))
    const t = setTimeout(() => {
      setItems(prev => prev.filter(it => it.id !== id))
      timers.current.delete(id)
    }, 350)
    timers.current.set(id, t)
  }, [])

  const toast = useCallback((message: string, type: ToastType = 'info') => {
    const id = ++nextId
    setItems(prev => [...prev, { id, message, type, leaving: false }])
    const t = setTimeout(() => remove(id), 2800)
    timers.current.set(id, t)
  }, [remove])

  useEffect(() => {
    return () => { timers.current.forEach(t => clearTimeout(t)) }
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* 便签 Toast 层 */}
      <div className="fixed bottom-6 left-1/2 z-[10001] flex flex-col items-center gap-2 pointer-events-none"
        style={{ transform: 'translateX(-50%)' }}>
        {items.map(it => {
          const s = TYPE_STYLES[it.type]
          return (
            <div
              key={it.id}
              className="pointer-events-auto cursor-default select-none"
              style={{
                background: s.bg,
                border: `1.5px solid ${s.border}`,
                borderRadius: 4,
                padding: '10px 20px',
                fontSize: 13,
                letterSpacing: '0.03em',
                color: 'var(--ink-soft)',
                boxShadow: '0 3px 16px rgba(60,30,10,0.08), 0 1px 3px rgba(0,0,0,0.04)',
                position: 'relative',
                fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', gap: 8,
                animation: it.leaving
                  ? 'toastPeelOff 0.35s ease-in both'
                  : 'toastStickOn 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
              }}>
              {/* 顶部胶带 */}
              <span style={{
                position: 'absolute', top: -8, left: 24, width: 38, height: 14,
                background: s.tape, borderRadius: 1, transform: 'rotate(-1.5deg)',
                boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
              }} />
              <span>{s.emoji}</span>
              <span>{it.message}</span>
            </div>
          )
        })}
      </div>

      <style>{`
        @keyframes toastStickOn {
          0%   { opacity: 0; transform: translateY(-20px) scale(0.75) rotate(-3deg); }
          60%  { opacity: 1; transform: translateY(3px) scale(1.04) rotate(0.3deg); }
          100% { transform: translateY(0) scale(1) rotate(0deg); }
        }
        @keyframes toastPeelOff {
          0%   { opacity: 1; transform: scale(1) rotate(0deg); }
          100% { opacity: 0; transform: scale(0.9) rotate(2deg) translateY(-10px); }
        }
      `}</style>
    </ToastContext.Provider>
  )
}
