/**
 * DeepSeek API 客户端 — 共享调用层
 * API Key: sk-e6335acfb9b1409dbb096fcfcdc6bc1e
 */
const API_KEY = 'sk-e6335acfb9b1409dbb096fcfcdc6bc1e'
const BASE_URL = 'https://api.deepseek.com/v1/chat/completions'

export interface ChatOptions {
  systemPrompt: string
  userMessage: string
  temperature?: number
  maxTokens?: number
  stream?: boolean
}

export async function deepseekChat(opts: ChatOptions): Promise<string> {
  const body = {
    model: 'deepseek-chat',
    messages: [
      { role: 'system', content: opts.systemPrompt },
      { role: 'user', content: opts.userMessage },
    ],
    temperature: opts.temperature ?? 0.8,
    max_tokens: opts.maxTokens ?? 1024,
    stream: false,
  }

  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`DeepSeek API error ${res.status}: ${errText.slice(0, 200)}`)
  }

  const data = await res.json()
  return data.choices?.[0]?.message?.content || ''
}
