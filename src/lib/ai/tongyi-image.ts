/**
 * 通义万相 · AI 图片生成客户端
 * DashScope API: https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis
 * API Key: 已配置
 */
const API_KEY = 'sk-5a20fed27f1b4baaafc4d8767a2bcc91'
const BASE_URL = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis'

export interface ImageGenOptions {
  prompt: string
  negativePrompt?: string
  n?: number // 生成图片数量 1-4
  size?: string // 图片尺寸 如 '1024*1024'
  style?: string // 风格：'photography'|'illustration'|'cartoon'|'ink'|'watercolor'|'oil_painting'|'sketch'
}

export async function tongyiGenerateImage(opts: ImageGenOptions): Promise<string[]> {
  // 风格映射到 prompt 增强
  const styleMap: Record<string, string> = {
    photography: '摄影风格，真实照片质感，高清细节',
    illustration: '精美插画风格，手绘质感，柔和色调，温暖治愈',
    cartoon: '可爱卡通风格，Q版形象，明亮色彩，简单线条',
    ink: '中国水墨画风格，写意，留白，墨色浓淡变化',
    watercolor: '水彩画风格，透明感，柔和的色晕染，轻盈',
    oil_painting: '油画风格，厚重的笔触，丰富的色彩层叠',
    sketch: '素描风格，铅笔线条，黑白灰调，细腻刻画',
  }
  const stylePrompt = styleMap[opts.style || 'illustration'] || ''
  const fullPrompt = `${opts.prompt}，${stylePrompt}`

  const body = {
    model: 'wanx-v1',
    input: {
      prompt: fullPrompt,
      negative_prompt: opts.negativePrompt || '模糊，变形，丑陋，低质量，文字，水印',
    },
    parameters: {
      n: opts.n || 1,
      size: opts.size || '1024*1024',
    },
  }

  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
      'X-DashScope-Async': 'enable',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`通义万相 API error ${res.status}: ${errText.slice(0, 300)}`)
  }

  const data = await res.json()

  // 异步模式：取 task_id 轮询结果
  if (data.output?.task_id) {
    const taskId = data.output.task_id
    const result = await pollTaskResult(taskId)
    return result
  }

  // 同步模式：直接返回 URL
  if (data.output?.results) {
    return data.output.results.map((r: any) => r.url || r.b64_json)
  }

  throw new Error('通义万相返回了未知格式: ' + JSON.stringify(data).slice(0, 300))
}

async function pollTaskResult(taskId: string, maxAttempts = 30, interval = 2000): Promise<string[]> {
  for (let i = 0; i < maxAttempts; i++) {
    await sleep(interval)
    const res = await fetch(
      `https://dashscope.aliyuncs.com/api/v1/tasks/${taskId}`,
      { headers: { 'Authorization': `Bearer ${API_KEY}` } }
    )
    const data = await res.json()

    if (data.output?.task_status === 'SUCCEEDED') {
      return data.output.results.map((r: any) => r.url || r.b64_json)
    }
    if (data.output?.task_status === 'FAILED') {
      throw new Error(`图片生成任务失败: ${data.output.message || '未知错误'}`)
    }
    // PENDING / RUNNING → 继续等待
  }
  throw new Error('图片生成超时，请稍后重试')
}

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)) }

/** Canvas 模拟模式 — 当 API 不可用时，用 Canvas 生成占位插图 */
export function generatePlaceholderImage(studentName: string, style?: string): string {
  if (typeof document === 'undefined') return ''
  const canvas = document.createElement('canvas')
  canvas.width = 512; canvas.height = 512
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''

  // 暖色渐变背景
  const colors: Record<string, [string, string]> = {
    illustration: ['#f5e6d0', '#e8c8a0'],
    cartoon: ['#ffe8d0', '#f8c0a0'],
    watercolor: ['#d8e8e8', '#a8c8d0'],
    ink: ['#e8e0d8', '#c8c0b0'],
    default: ['#f5ecd8', '#e0c8a0'],
  }
  const [c1, c2] = colors[style || 'default'] || colors.default
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
  grad.addColorStop(0, c1); grad.addColorStop(1, c2)
  ctx.fillStyle = grad; ctx.fillRect(0, 0, canvas.width, canvas.height)

  // 同心圆装饰
  ctx.strokeStyle = 'rgba(255,255,255,0.3)'
  ctx.lineWidth = 2
  for (let r = 60; r < 200; r += 30) {
    ctx.beginPath(); ctx.arc(canvas.width / 2, canvas.height / 2 - 30, r, 0, Math.PI * 2); ctx.stroke()
  }

  // 学生姓名
  ctx.fillStyle = 'rgba(100,70,40,0.8)'
  ctx.font = 'bold 28px "Noto Serif SC", serif'
  ctx.textAlign = 'center'
  ctx.fillText(studentName, canvas.width / 2, canvas.height - 80)

  // 小装饰文字
  ctx.fillStyle = 'rgba(150,130,110,0.5)'
  ctx.font = '14px "Ma Shan Zheng", cursive'
  ctx.fillText('✨ 成长印记', canvas.width / 2, canvas.height - 50)

  return canvas.toDataURL('image/jpeg', 0.85)
}
