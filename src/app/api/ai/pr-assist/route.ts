import { NextRequest, NextResponse } from 'next/server'
import { deepseekChat } from '@/lib/ai/deepseek'

export async function POST(req: NextRequest) {
  try {
    const { topic, highlights, teamName } = await req.json()
    if (!topic) return NextResponse.json({ error: '缺少主题' }, { status: 400 })

    const systemPrompt = `你是一位支教队的宣传负责人。根据提供的支教活动信息，生成三段不同平台风格的宣传文案：
1. 微信公众号推文（正式、有温度、适合转发）
2. 朋友圈短文（简短、亲切、适合配图）
3. 小红书文案（活泼、有emoji、适合种草传播）

每段标注【微信公众号】【朋友圈】【小红书】。每段150-300字。`
    const content = await deepseekChat({
      systemPrompt,
      userMessage: `支教队：${teamName || '支教队'}\n主题：${topic}\n亮点：${highlights || '孩子们的热情参与、课堂中的感人瞬间'}\n\n请生成三种风格的宣传文案。`,
      temperature: 0.85,
      maxTokens: 1200,
    })
    return NextResponse.json({ content, success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message, success: false }, { status: 500 })
  }
}
