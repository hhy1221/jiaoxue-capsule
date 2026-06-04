'use client'

// ═══════════════════════════════════════
// 微信登录弹窗 — Mock UI
// ═══════════════════════════════════════

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export default function WeChatLogin({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<'scan' | 'confirm' | 'done'>('scan')

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[380px] p-0 gap-0 overflow-hidden rounded-2xl">
        {/* 微信绿顶 */}
        <div className="bg-[#07C160] px-6 pt-8 pb-10 text-center">
          <DialogHeader>
            <DialogTitle className="text-white text-[18px] font-medium tracking-wide">
              {step === 'done' ? '登录成功' : '微信登录'}
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="px-8 py-10 flex flex-col items-center gap-6 bg-white rounded-t-3xl -mt-4">
          {step === 'scan' && (
            <>
              {/* 模拟二维码 */}
              <div className="w-44 h-44 bg-zinc-100 rounded-2xl flex items-center justify-center relative border border-zinc-200">
                <div className="absolute inset-4 rounded-lg border-2 border-dashed border-zinc-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-2">📱</div>
                    <div className="text-[10px] text-zinc-400 tracking-wider">扫码登录</div>
                  </div>
                </div>
                {/* 四角装饰 */}
                <div className="absolute top-3 left-3 w-3 h-3 border-l-2 border-t-2 border-[#07C160] rounded-tl" />
                <div className="absolute top-3 right-3 w-3 h-3 border-r-2 border-t-2 border-[#07C160] rounded-tr" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-l-2 border-b-2 border-[#07C160] rounded-bl" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-r-2 border-b-2 border-[#07C160] rounded-br" />
              </div>
              <p className="text-[13px] text-zinc-500 tracking-wider">请使用微信扫描二维码</p>
              <button
                onClick={() => setStep('confirm')}
                className="text-[12px] text-[#07C160] tracking-wider border-none bg-transparent cursor-pointer hover:underline"
              >
                模拟扫码成功 →
              </button>
            </>
          )}

          {step === 'confirm' && (
            <>
              {/* 头像 + 确认 */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#f0c060] to-[#c8862e] flex items-center justify-center text-white text-2xl">
                黄
              </div>
              <div className="text-center">
                <p className="text-[15px] font-medium text-zinc-800">黄寒阳</p>
                <p className="text-[12px] text-zinc-400 tracking-wider mt-1">凡星支教队 · 队长</p>
              </div>
              <div className="flex gap-4 w-full">
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl border border-zinc-200 text-[13px] text-zinc-500 tracking-wider bg-transparent cursor-pointer hover:bg-zinc-50 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={() => setStep('done')}
                  className="flex-1 py-2.5 rounded-xl bg-[#07C160] text-white text-[13px] tracking-wider border-none cursor-pointer hover:bg-[#06ad56] transition-colors"
                >
                  确认登录
                </button>
              </div>
            </>
          )}

          {step === 'done' && (
            <>
              <div className="w-16 h-16 rounded-full bg-[#07C160] flex items-center justify-center text-white text-3xl">
                ✓
              </div>
              <div className="text-center">
                <p className="text-[15px] font-medium text-zinc-800">黄寒阳</p>
                <p className="text-[12px] text-zinc-400 tracking-wider mt-1">已登录 · 凡星支教队</p>
              </div>
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-[#07C160] text-white text-[13px] tracking-wider border-none cursor-pointer hover:bg-[#06ad56] transition-colors"
              >
                进入支教星火
              </button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
