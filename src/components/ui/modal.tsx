'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * 绘本风 Modal — 像卡片从空中落到桌面
 * 支持 size、关闭回调、动画入场
 */

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Modal({ open, onClose, title, children, size = 'md', className }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const sizeStyles = {
    sm: 'max-w-[380px]',
    md: 'max-w-[500px]',
    lg: 'max-w-[680px]',
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[8000] flex items-center justify-center p-4"
      style={{
        background: 'rgba(40,25,15,0.35)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        animation: 'modalOverlayIn 0.25s ease-out',
      }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      <div
        ref={contentRef}
        className={cn(
          'w-full rounded-lg relative overflow-hidden',
          'shadow-[0_4px_24px_rgba(60,30,10,0.12),0_12px_48px_rgba(60,30,10,0.08)]',
          sizeStyles[size],
          className
        )}
        style={{
          background: '#fefcf8',
          border: '1.5px solid rgba(200,180,160,0.25)',
          animation: 'modalPopIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 线装孔 */}
        <div className="flex justify-center gap-2 pt-4 pb-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="block"
              style={{
                width: 6, height: 6, borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #fff, #d4c8b0)',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.15)',
              }}
            />
          ))}
        </div>

        {/* 标题栏 */}
        {title && (
          <div className="flex items-center justify-between px-6 pt-3 pb-2"
            style={{ borderBottom: '1px solid rgba(180,150,120,0.12)' }}>
            <h3 className="text-[15px] font-semibold tracking-[0.04em] text-[var(--ink)]"
              style={{ fontFamily: 'var(--font-serif)' }}>
              {title}
            </h3>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full flex items-center justify-center bg-transparent border-none cursor-pointer text-[var(--faded)] hover:text-[var(--ink)] hover:bg-[rgba(200,180,160,0.1)] transition-all text-sm"
              style={{ fontFamily: 'inherit' }}
            >
              ✕
            </button>
          </div>
        )}

        {/* 内容 */}
        <div className="px-6 py-4">
          {children}
        </div>

        {/* 底部撕纸装饰 */}
        <div className="h-[1px] mx-6 mb-4"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(180,150,120,0.15) 20%, rgba(180,150,120,0.15) 80%, transparent)' }}
        />
      </div>

      <style>{`
        @keyframes modalOverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalPopIn {
          from { opacity: 0; transform: translateY(30px) scale(0.92) rotate(-0.5deg); }
          to { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
        }
      `}</style>
    </div>
  )
}
