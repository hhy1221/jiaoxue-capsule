/**
 * 万能搜索索引 — 聚合全站所有可搜索内容
 * Spotlight 风格：Ctrl+K 唤醒 → 实时筛选 → 键盘导航 → 跳转
 */
import { QUESTIONS, STORIES, RECRUITS, STUDENT_POSTS } from './community-data'
import { COMMUNITY_RESOURCES, TEAM_PROFILES } from './community-resources'
import { MOCK_STUDENTS } from './mock-data'
import { DISCOVERABLE_STUDENTS } from './social-data'
import {
  SUBJECT_LABELS, SUBJECT_EMOJIS,
  RECRUIT_LABELS, RECRUIT_EMOJIS,
  RESOURCE_CATEGORIES, GRADE_LABELS,
} from '@/types'

// ═══════════════════════════════════════
// 类型定义
// ═══════════════════════════════════════
export type SearchResultKind =
  | 'page'        // 导航页面
  | 'question'    // 教学问答
  | 'story'       // 支教故事
  | 'recruit'     // 招募信息
  | 'resource'    // 教学资源
  | 'student'     // 学生档案
  | 'tool'        // AI工坊
  | 'team'        // 支教队
  | 'chat'        // 聊天/好友

export interface SearchResult {
  id: string
  kind: SearchResultKind
  title: string
  subtitle: string
  icon: string
  href: string
  tags: string[]
  priority: number // 排序优先级（越大越靠前）
}

// ═══════════════════════════════════════
// 导航页面（带中文路径）
// ═══════════════════════════════════════
const PAGE_INDEX: SearchResult[] = [
  { id:'nav-home',kind:'page',title:'首页',subtitle:'开始记录支教之旅',icon:'🏠',href:'/',tags:['首页','home','开始'],priority:100 },
  { id:'nav-dashboard',kind:'page',title:'仪表盘',subtitle:'数据总览 · 学生/评语/照片/课程统计',icon:'📊',href:'/dashboard',tags:['仪表盘','统计','数据'],priority:95 },
  { id:'nav-community',kind:'page',title:'社区首页',subtitle:'信息流 · 精华内容 · 贡献榜',icon:'🌐',href:'/community',tags:['社区','首页','动态'],priority:90 },
  { id:'nav-questions',kind:'page',title:'教学问答',subtitle:'老师、专家、往届成员解答教学难题',icon:'📚',href:'/community/questions',tags:['问答','问题','教学','Q&A'],priority:88 },
  { id:'nav-resources',kind:'page',title:'资源广场',subtitle:'全国支教队共建共享教案课件',icon:'📦',href:'/community/resources',tags:['资源','教案','课件','下载'],priority:87 },
  { id:'nav-match',kind:'page',title:'寻找队伍',subtitle:'智能匹配 · 找到属于你的支教队',icon:'🔗',href:'/community/match',tags:['匹配','队伍','志愿者','加入'],priority:86 },
  { id:'nav-stories',kind:'page',title:'支教故事',subtitle:'温暖的纪实 · 感人的瞬间',icon:'📸',href:'/community/stories',tags:['故事','记录','感动'],priority:85 },
  { id:'nav-recruit',kind:'page',title:'招募广场',subtitle:'支教队招新 · 志愿者自荐 · 物资互助',icon:'🌟',href:'/community/recruit',tags:['招募','招新','志愿者'],priority:84 },
  { id:'nav-social',kind:'page',title:'蒲公英',subtitle:'乡村孩子的纯净社交圈 · 聊天交友',icon:'🌬',href:'/community/social',tags:['学生','聊天','好友','社交'],priority:83 },
  { id:'nav-profile',kind:'page',title:'我的主页',subtitle:'个人信息 · 标签 · 需求发布',icon:'🏠',href:'/community/profile',tags:['个人','主页','我的','资料'],priority:82 },
  { id:'nav-students',kind:'page',title:'学生档案',subtitle:'管理学生信息 · 成长记录',icon:'📝',href:'/students',tags:['学生','档案','管理'],priority:80 },
  { id:'nav-schedule',kind:'page',title:'课表管理',subtitle:'13天×8时段 · 五育并举 · 双击编辑',icon:'📅',href:'/schedule',tags:['课表','课程','编辑'],priority:78 },
  { id:'nav-classroom',kind:'page',title:'课堂',subtitle:'课件 · 课堂瞬间 · 教学笔记',icon:'🏫',href:'/classroom',tags:['课堂','课件','上课'],priority:76 },
  { id:'nav-letters',kind:'page',title:'临别信',subtitle:'AI生成 · 5种语气 · 导出PDF',icon:'✉️',href:'/letters',tags:['临别信','信','AI生成','导出'],priority:75 },
  { id:'nav-messages',kind:'page',title:'消息中心',subtitle:'队伍沟通 · 私聊群聊',icon:'💬',href:'/messages',tags:['消息','沟通','聊天'],priority:74 },
  { id:'nav-workshop',kind:'page',title:'AI 工坊',subtitle:'8大AI创意功能',icon:'✨',href:'/ai-workshop',tags:['AI','工坊','创意'],priority:72 },
  { id:'nav-penpal',kind:'page',title:'笔友广场',subtitle:'AI匹配 · 跨届笔友通信',icon:'💌',href:'/penpal-square',tags:['笔友','通信','匹配'],priority:70 },
  { id:'nav-video',kind:'page',title:'成长视频',subtitle:'12天浓缩60秒自动生成',icon:'🎬',href:'/growth-video',tags:['视频','成长','纪念'],priority:68 },
  { id:'nav-gallery',kind:'page',title:'相册',subtitle:'课堂瞬间 · 活动照片',icon:'📷',href:'/gallery',tags:['相册','照片','图片'],priority:66 },
  { id:'nav-members',kind:'page',title:'成员',subtitle:'队伍成员管理',icon:'👥',href:'/members',tags:['成员','队伍','管理'],priority:64 },
  { id:'nav-announcements',kind:'page',title:'公告',subtitle:'队伍通知',icon:'📢',href:'/announcements',tags:['公告','通知'],priority:62 },
  { id:'nav-reviews',kind:'page',title:'评价',subtitle:'互评互促',icon:'⭐',href:'/reviews',tags:['评价','评分','反馈'],priority:60 },
  { id:'nav-settings',kind:'page',title:'设置',subtitle:'队伍设置 · 系统配置',icon:'⚙️',href:'/settings',tags:['设置','配置'],priority:58 },
  // 学生端
  { id:'nav-student',kind:'page',title:'学生端首页',subtitle:'今日课程 · 好友在线 · 快捷入口',icon:'🧒',href:'/student',tags:['学生','孩子','学习'],priority:79 },
  { id:'nav-student-class',kind:'page',title:'今日课堂',subtitle:'查看课表 · 给老师打分',icon:'📖',href:'/student/class',tags:['课堂','课程','打分'],priority:77 },
  { id:'nav-student-journal',kind:'page',title:'成长日志（学生）',subtitle:'回顾每节课 · 记录感受',icon:'🌱',href:'/student/journal',tags:['日志','感受','记录'],priority:75 },
  { id:'nav-student-works',kind:'page',title:'我的作品',subtitle:'分享创作 · 展示才华',icon:'🎨',href:'/student/works',tags:['作品','创作','分享'],priority:73 },
  { id:'nav-student-chat',kind:'page',title:'聊天（学生）',subtitle:'和好朋友们聊天',icon:'💬',href:'/student/chat',tags:['聊天','好友','消息'],priority:71 },
  { id:'nav-student-contact',kind:'page',title:'联系老师',subtitle:'给老师发消息',icon:'✉️',href:'/student/contact',tags:['老师','联系','提问'],priority:69 },
  { id:'nav-student-assign',kind:'page',title:'我的作业',subtitle:'查看和提交作业',icon:'📝',href:'/student/assignments',tags:['作业','提交','任务'],priority:67 },
]

// ═══════════════════════════════════════
// AI 工坊工具
// ═══════════════════════════════════════
const TOOL_INDEX: SearchResult[] = [
  { id:'tool-diary',kind:'tool',title:'智能评语',subtitle:'说一段话 → AI扩写成完整评语',icon:'📝',href:'/ai-workshop/diary-assist',tags:['评语','AI','扩写'],priority:55 },
  { id:'tool-lesson',kind:'tool',title:'课件助手',subtitle:'输入主题 → 完整课程大纲',icon:'📖',href:'/ai-workshop/lesson-gen',tags:['课件','大纲','生成'],priority:54 },
  { id:'tool-pr',kind:'tool',title:'宣传助手',subtitle:'一键生成推文/朋友圈/小红书',icon:'📣',href:'/ai-workshop/pr-assist',tags:['宣传','推文','文案'],priority:53 },
  { id:'tool-dialect',kind:'tool',title:'方言翻译官',subtitle:'普通话 ↔ 四川话实时互译',icon:'🗣️',href:'/ai-workshop/dialect',tags:['方言','翻译','四川话'],priority:52 },
  { id:'tool-treehole',kind:'tool',title:'树洞信箱',subtitle:'匿名倾诉 · AI共情回复',icon:'🌳',href:'/ai-workshop/treehole',tags:['树洞','匿名','倾诉'],priority:51 },
  { id:'tool-video',kind:'tool',title:'成长纪念视频',subtitle:'12天浓缩60秒自动生成',icon:'🎬',href:'/growth-video',tags:['视频','纪念','生成'],priority:50 },
  { id:'tool-penpal',kind:'tool',title:'笔友匹配',subtitle:'AI匹配 · 跨届笔友通信',icon:'💌',href:'/penpal-square',tags:['笔友','匹配','通信'],priority:49 },
  { id:'tool-letter',kind:'tool',title:'AI临别信',subtitle:'5种语气 · 流式生成 · 导出PDF',icon:'✉️',href:'/letters',tags:['临别信','AI','生成'],priority:48 },
]

// ═══════════════════════════════════════
// 动态索引构建函数（每次调用实时计算）
// ═══════════════════════════════════════
export function buildFullIndex(): SearchResult[] {
  const results: SearchResult[] = [...PAGE_INDEX, ...TOOL_INDEX]

  // 教学问答
  QUESTIONS.forEach(q => {
    results.push({
      id: `q-${q.id}`, kind: 'question', title: q.title,
      subtitle: `${SUBJECT_EMOJIS[q.subject]} ${SUBJECT_LABELS[q.subject]} · ${q.answers.length}条回答 · ${q.likes}赞`,
      icon: SUBJECT_EMOJIS[q.subject] || '📚',
      href: `/community/questions?search=${encodeURIComponent(q.title.slice(0,10))}`,
      tags: [q.subject, q.gradeRange, q.region, ...q.tags],
      priority: 40,
    })
  })

  // 支教故事
  STORIES.forEach(s => {
    results.push({
      id: `s-${s.id}`, kind: 'story', title: s.title,
      subtitle: `${s.location} · ${s.teamName} · ❤️${s.likes}`,
      icon: s.images[0]?.startsWith('/') ? '🖼️' : (s.images[0] || '📸'),
      href: '/community/stories',
      tags: [s.location, s.teamName, ...s.tags],
      priority: 35,
    })
  })

  // 招募
  RECRUITS.filter(r => r.status === 'active').forEach(r => {
    results.push({
      id: `r-${r.id}`, kind: 'recruit', title: r.title,
      subtitle: `${RECRUIT_EMOJIS[r.type]} ${RECRUIT_LABELS[r.type]} · ${r.region} · ${r.deadline || '长期'}`,
      icon: RECRUIT_EMOJIS[r.type] || '🌟',
      href: '/community/recruit',
      tags: [r.region, r.type, ...r.tags],
      priority: 33,
    })
  })

  // 教学资源
  COMMUNITY_RESOURCES.forEach(r => {
    results.push({
      id: `res-${r.id}`, kind: 'resource', title: r.title,
      subtitle: `${RESOURCE_CATEGORIES[r.category].emoji} ${RESOURCE_CATEGORIES[r.category].label} · ${GRADE_LABELS[r.grade]} · ⬇${r.downloads}`,
      icon: RESOURCE_CATEGORIES[r.category].emoji,
      href: '/community/resources',
      tags: [r.category, r.subject, r.grade, ...r.tags],
      priority: 30,
    })
  })

  // 学生档案
  MOCK_STUDENTS.forEach(s => {
    results.push({
      id: `stu-${s.id}`, kind: 'student', title: s.name,
      subtitle: `${s.grade} · ${s.age}岁 · ${s.tags.slice(0,3).join('、')}`,
      icon: s.avatar || '👤',
      href: `/students/${s.id}`,
      tags: [s.name, s.grade, ...s.tags],
      priority: 25,
    })
  })

  // 支教队
  TEAM_PROFILES.forEach(t => {
    results.push({
      id: `team-${t.id}`, kind: 'team', title: t.name,
      subtitle: `${t.location} · ${t.duration} · ${t.teamSize}人 · ${t.recruitmentStatus === 'urgent' ? '急招' : '招募中'}`,
      icon: t.logo,
      href: '/community/match',
      tags: [t.location, ...t.subjects, ...t.skillsNeeded],
      priority: 20,
    })
  })

  // 蒲公英好友
  DISCOVERABLE_STUDENTS.forEach(s => {
    results.push({
      id: `chat-${s.id}`, kind: 'chat', title: `${s.name}`,
      subtitle: `${s.grade} · ${s.school} · ${s.interestGroups.join('、')}`,
      icon: s.avatar,
      href: '/community/social',
      tags: [s.name, s.school, ...s.interestGroups],
      priority: 15,
    })
  })

  return results
}
