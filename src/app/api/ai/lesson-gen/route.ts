import { NextRequest, NextResponse } from 'next/server'
import { deepseekChat } from '@/lib/ai/deepseek'

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json()
    if (!topic) return NextResponse.json({ error: '缺少课程主题' }, { status: 400 })

    const content = await deepseekChat({
      systemPrompt: '你是一位经验丰富的乡村支教课程设计师。根据输入的主题，设计一份完整的课程大纲。要求考虑：①无需多媒体设备 ②材料低成本易获取 ③适合混合年级 ④包含互动环节 ⑤有安全教育提醒。输出格式包括：课程目标、教学环节（每环节注明时间和所需材料）、互动提问（附参考答案）、安全提示、课后作业建议。',
      userMessage: `请为以下主题设计一节45分钟的乡村小学课程：${topic}`,
      temperature: 0.8,
      maxTokens: 1200,
    })
    return NextResponse.json({ content, success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message, success: false }, { status: 500 })
  }
}
