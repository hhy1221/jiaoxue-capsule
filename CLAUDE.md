# 支教记忆胶囊（jiaoxue-capsule）项目指南

> 这是 jiaoxue-capsule 专属的 CLAUDE.md。另一个项目（旅途笔记 / travel-diary）在别的目录，信息不同，请勿混淆。

---

## 项目概述

- **项目名：** 支教记忆胶囊（jiaoxue-capsule）
- **用途：** AI 赋能支教黑客松 — 记录孩子成长，支教结束 AI 自动生成临别信
- **技术栈：** Next.js 16 + TypeScript + Tailwind CSS v4 + shadcn/ui
- **项目路径：** `D:\test\firstweb\jiaoxue-capsule\`
- **运行命令：** `cd jiaoxue-capsule && npx next dev -p 4444`

---

## GitHub

| 项目 | 值 |
|------|-----|
| **仓库地址** | https://github.com/hhy1221/jiaoxue-capsule |
| **SSH 地址** | `git@github.com:hhy1221/jiaoxue-capsule.git` |
| **SSH 密钥文件** | `~/.ssh/id_ed25519_github` |
| **远程名** | `github` |
| **Push 命令** | `git push github master` |

---

## 服务器（腾讯云）

| 项目 | 值 |
|------|-----|
| **IP** | `139.155.128.188` |
| **系统** | Ubuntu |
| **SSH 密钥** | `~/.ssh/id_ed25519` |
| **SSH 命令** | `ssh -i ~/.ssh/id_ed25519 root@139.155.128.188` |
| **项目路径** | `/root/jiaoxue-capsule/` |
| **进程管理** | PM2，进程名 `capsule` |
| **端口** | Nginx 反向代理 80 → Next.js 4444 |
| **部署命令** | SSH 上去执行 `cd /root/jiaoxue-capsule && npm run build && pm2 restart capsule` |
| **数据库** | 无（纯前端 mock 数据，无真实后端） |

---

## ⚠️ 与另一个项目的区别

黄寒阳还有一个旧项目 **"旅途笔记"（travel-diary）**：

| | 旅途笔记（旧） | 记忆胶囊（当前） |
|------|------|------|
| 服务器 IP | `124.222.87.113` | `139.155.128.188` |
| 远程仓库 | gitee | GitHub |
| 项目路径 | 别处 | `D:\test\firstweb\jiaoxue-capsule\` |

**两个项目的服务器 IP、仓库、密钥都不同，操作时注意区分！**

---

## 项目结构

```
jiaoxue-capsule/
├── src/
│   ├── app/
│   │   ├── layout.tsx              ← 全局布局（HeroCurtain + SkinProvider + children）
│   │   ├── page.tsx                ← 占位符（返回 null，首页由 HeroCurtain 渲染）
│   │   ├── globals.css             ← 完整设计系统（CSS 变量/动画 keyframes/绘本组件样式）
│   │   ├── (dashboard)/dashboard/  ← 仪表盘
│   │   ├── students/               ← 学生档案（[id] 详情）
│   │   ├── classroom/              ← 课堂（列表 + [id] 详情）
│   │   ├── schedule/               ← 可编辑课表
│   │   ├── letters/                ← 临别信（杂志内页风）
│   │   └── ...                     ← 其他 27 个路由
│   ├── components/
│   │   ├── layout/
│   │   │   ├── HeroCurtain.tsx     ← 首页幕布（核心动画组件）
│   │   │   ├── InnerLayout.tsx     ← 内页布局
│   │   │   └── Sidebar.tsx         ← 侧边栏导航
│   │   ├── auth/WeChatLogin.tsx    ← 微信登录弹窗
│   │   └── ui/                     ← shadcn/ui 组件
│   ├── lib/
│   │   ├── mock-data.ts            ← 全部模拟数据
│   │   ├── skin-context.tsx        ← 皮肤主题 Context
│   │   └── utils.ts                ← 工具函数
│   └── types/index.ts              ← TypeScript 类型
├── public/images/
│   ├── bg-hero.webp                ← 首页大图背景
│   └── avatars/                    ← 8 个学生各 2 张 AI 头像（WebP）
└── next.config.ts
```

---

## 关键设计决策

- **首页幕布动画：** HeroCurtain 使用 `useLayoutEffect` + ref 直接操控 DOM，在浏览器绘制前同步执行动画起始状态
- **内页卡片动画：** InnerLayout 中根据页面类型分配 5 种动画模式（slide-sides / scale / blur / elastic）
- **设计风格：** 温暖绘本风（暖色纸纹理 + 宝丽来卡片 + 胶带装饰 + 手写字体）
- **无后端：** 比赛只审前端页面，所有数据来自 `mock-data.ts`

---

## 自动 Commit 约定

每完成一个独立功能、页面跑通、无报错，自动 commit。前缀：
- ✅ 新功能 · 🐛 修bug · 🎨 样式 · ♻️ 重构 · 📦 装依赖
- 🔧 修复/架构调整 · 📝 文档
