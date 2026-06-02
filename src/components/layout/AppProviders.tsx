'use client'

import { SkinProvider } from '@/lib/skin-context'
import { ToastProvider } from '@/components/animations/Toast'
import HeroCurtain from '@/components/layout/HeroCurtain'
import Ribbon from '@/components/layout/Ribbon'

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SkinProvider>
      <ToastProvider>
        <HeroCurtain />
        <Ribbon />
        {children}
      </ToastProvider>
    </SkinProvider>
  )
}
