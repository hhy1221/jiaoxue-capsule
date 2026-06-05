'use client'
import { useState, useRef, useCallback, useEffect } from 'react'

interface SpeechRecognitionResult {
  transcript: string
  isListening: boolean
  error: string | null
  browserSupported: boolean
  start: () => void
  stop: () => void
  toggle: () => void
}

/**
 * Web Speech API — 语音输入 Hook
 * 封装浏览器兼容性检测 + 权限请求 + 实时文本更新
 *
 * 用法：
 *   const { transcript, isListening, start, stop, browserSupported } = useSpeechRecognition()
 *   <button onClick={start} disabled={!browserSupported}>🎤 语音输入</button>
 *   <p>{transcript}</p>
 */
export function useSpeechRecognition(options?: {
  lang?: string
  continuous?: boolean
  interimResults?: boolean
  onResult?: (text: string) => void
}): SpeechRecognitionResult {
  const [transcript, setTranscript] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [browserSupported, setBrowserSupported] = useState(false)
  const recognitionRef = useRef<any>(null)

  // 检测浏览器支持
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    setBrowserSupported(!!SpeechRecognition)
    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()
    recognition.lang = options?.lang || 'zh-CN'
    recognition.continuous = options?.continuous ?? true
    recognition.interimResults = options?.interimResults ?? true
    recognition.maxAlternatives = 1

    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)
    recognition.onerror = (e: any) => {
      setError(e.error === 'not-allowed' ? '麦克风权限被拒绝' : e.error === 'no-speech' ? '未检测到语音' : e.message || '语音识别失败')
      setIsListening(false)
    }
    recognition.onresult = (e: any) => {
      let final = ''
      let interim = ''
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const result = e.results[i]
        if (result.isFinal) final += result[0].transcript
        else interim += result[0].transcript
      }
      const text = final || interim
      if (text) {
        setTranscript(prev => prev + text)
        options?.onResult?.(text)
      }
    }

    recognitionRef.current = recognition
    return () => { try { recognition.abort() } catch {} }
  }, [])

  const start = useCallback(() => {
    setError(null)
    setTranscript('')
    try { recognitionRef.current?.start() } catch (e: any) { setError(e.message || '启动失败') }
  }, [])

  const stop = useCallback(() => {
    try { recognitionRef.current?.stop() } catch {}
  }, [])

  const toggle = useCallback(() => {
    if (isListening) stop(); else start()
  }, [isListening, start, stop])

  return { transcript, isListening, error, browserSupported, start, stop, toggle }
}
