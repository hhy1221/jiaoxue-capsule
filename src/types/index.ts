// ═══════════════════════════════════════
// 支教支教星火 — 完整类型定义 v3
// ═══════════════════════════════════════

// ── 用户与队伍 ──
export type UserRole = 'teacher' | 'captain' | 'vice_captain' | 'advisor' | 'local_contact' | 'alumni'
export const ROLE_LABELS: Record<UserRole, string> = {
  teacher: '支教老师', captain: '队长', vice_captain: '副队长', advisor: '指导老师', local_contact: '当地负责人', alumni: '往届成员',
}
export interface User {
  id: string; name: string; email: string; avatar: string; roles: UserRole[]; teamId: string; createdAt: string
}
export interface Team { id: string; name: string; slug: string; description: string; logo: string; color: string; createdAt: string }
export interface Semester { id: string; teamId: string; name: string; startDate: string; endDate: string; location: string; isActive: boolean }

// ── 学生 ──
export interface Student {
  id: string; name: string; nickname: string; age: number; grade: string; avatar: string; photo: string; tags: string[]; personality: string; strengths: string; notes: string; createdAt: string; teamId: string
}
export interface GrowthRecord {
  id: string; studentId: string; date: string; type: 'photo' | 'note' | 'achievement' | 'milestone'; title: string; content: string; image?: string; tags: string[]; mood?: 'happy' | 'normal' | 'sad'
}
export interface Photo { id: string; studentId: string; url: string; description: string; date: string; tags: string[] }

// ── 临别信 ──
export type LetterTone = 'poetic' | 'friendly' | 'strict' | 'energetic' | 'playful'
export const TONE_LABELS: Record<LetterTone, string> = { poetic: '温柔诗意', friendly: '老友絮语', strict: '严师慈言', energetic: '燃系励志', playful: '童趣轻松' }
export const TONE_EMOJIS: Record<LetterTone, string> = { poetic: '🌸', friendly: '🤝', strict: '📚', energetic: '🔥', playful: '🎈' }
export const TONE_DESCRIPTIONS: Record<LetterTone, string> = { poetic: '如春风拂面，温柔而深情', friendly: '像老友聊天，亲切而自然', strict: '严中有爱，语重心长', energetic: '热血激昂，鼓舞人心', playful: '活泼可爱，童真满满' }
export interface Letter {
  id: string; studentId: string; studentName: string; tone: LetterTone; content: string; title: string; createdAt: string; isRead: boolean; template?: string
}

// ── 课表 ──
export interface Schedule { id: string; teamId: string; semesterId: string; theme: string; days: DayColumn[] }
export interface DayColumn { date: string; dayLabel: string; slots: TimeSlot[] }
export interface TimeSlot { time: string; className: string; teacher: string; location: string; notes: string }

// ── 课堂 ──
export interface Classroom {
  id: string; date: string; dayNum: number; timeSlot: string; courseName: string; courseEmoji: string; courseColor: string; teacher: string; location: string;
  preNotified: boolean; notifiedTeachers: string[];
  materials: Material[]; moments: ClassroomMoment[]; teachingNotes: TeachingNote[];
}
export interface Material { id: string; title: string; type: 'ppt'|'pdf'|'word'|'image'|'video'|'other'; fileSize: string; url: string; uploadedAt: string; uploadedBy: string }
export interface ClassroomMoment { id: string; type: 'photo'|'video'; url: string; caption: string; createdAt: string; author: string; tags: string[] }
export interface TeachingNote { id: string; content: string; author: string; mood?: string; createdAt: string; tags?: string[] }

// ── 消息 ──
export interface Conversation { id: string; participants: string[]; lastMessage: string; lastMessageAt: string; unread: number; type: 'direct' | 'group' | 'penpal' }
export interface Message { id: string; conversationId: string; senderId: string; senderName: string; content: string; createdAt: string }

// ── 评价/公告/相册/资源 ──
export interface Review { id: string; targetId: string; targetName: string; reviewerId: string; rating: number; content: string; createdAt: string }
export interface Announcement { id: string; teamId: string; title: string; content: string; author: string; pinned: boolean; createdAt: string }
export interface Album { id: string; teamId: string; title: string; cover: string; count: number; createdAt: string }
export interface Resource { id: string; teamId: string; title: string; type: 'lesson_plan' | 'worksheet' | 'template' | 'other'; url: string; uploadedBy: string; createdAt: string }

// ── 🆕 v3 新增类型 ──
export interface VideoScript {
  id: string; studentId: string; title: string; scenes: VideoScene[]; narration: string; backgroundMusic: string; keyWords: string[]; duration: number; status: 'draft' | 'rendering' | 'complete'; createdAt: string
}
export interface VideoScene { startSec: number; endSec: number; type: 'title' | 'photo' | 'caption' | 'transition' | 'ending'; text: string; photoIndex?: number; animation: 'fadeIn' | 'slideUp' | 'zoomIn' | 'typewriter' }
export interface PenpalMatch {
  id: string; studentAId: string; studentBId: string; studentAName: string; studentBName: string; score: number; reason: string; firstLetterSuggestion: string; status: 'pending' | 'active' | 'inactive'; letters: PenpalLetter[]; createdAt: string
}
export interface PenpalLetter { id: string; matchId: string; senderId: string; content: string; aiAssisted: boolean; read: boolean; createdAt: string }
export interface TreeholeMessage {
  id: string; teamId: string; senderId?: string; anonymousAlias: string; anonymousAvatar: string; content: string; visibility: 'ai_only' | 'specific_member' | 'whole_team'; targetMemberId?: string; reply?: string; replyType?: 'ai' | 'human'; createdAt: string
}
export interface DialectEntry { id: string; teamId: string; mandarin: string; dialect: string; dialectType: string; category: string; usage?: string }
export interface DialectResult { translated: string; original: string; notes: string[]; confidence: number }

// ── 仪表盘 ──
export interface DashboardData {
  studentCount: number; diaryCount: number; photoCount: number; classCount: number; activeTrend: number; recentDiaries: { studentName: string; content: string; timeAgo: string }[]; tagDistribution: { name: string; count: number }[]; upcomingClasses: { time: string; title: string }[]
}

// ── 皮肤系统 ──
export interface SkinConfig {
  id: string; name: string; description: string;
  colors: { background: string; surface: string; surfaceHover: string; primary: string; primaryHover: string; text: string; textSecondary: string; textMuted: string; border: string; accent1: string; accent2: string }
  heroImage?: string; fontFamily?: string
}
export const PRESET_SKINS: SkinConfig[] = [
  { id: 'warm-cream', name: '温暖绘本', description: '米白暖调，像翻开一本手绘本', colors: { background: '#fdf8f1', surface: '#fffefb', surfaceHover: '#fffdf9', primary: '#c8862e', primaryHover: '#b07628', text: '#3d3025', textSecondary: '#5c4d3a', textMuted: '#8b7d6b', border: 'rgba(0,0,0,0.06)', accent1: '#d4a853', accent2: '#7a9a5a' } },
  { id: 'forest-green', name: '森林绿意', description: '清新自然，支教在山野间', colors: { background: '#f4f7f2', surface: '#ffffff', surfaceHover: '#f9fbf8', primary: '#5d8a4e', primaryHover: '#4a703e', text: '#2d3a26', textSecondary: '#4a5c42', textMuted: '#7d8d76', border: 'rgba(90,130,70,0.08)', accent1: '#8ab860', accent2: '#d4a853' } },
  { id: 'ocean-blue', name: '海洋蓝调', description: '宁静深远，如海般包容', colors: { background: '#f5f7fa', surface: '#ffffff', surfaceHover: '#fafbfd', primary: '#4a7eb5', primaryHover: '#3a6a9a', text: '#263545', textSecondary: '#4a6078', textMuted: '#7a8ea0', border: 'rgba(74,126,181,0.08)', accent1: '#6baed6', accent2: '#e8c878' } },
  { id: 'sunset-warm', name: '日落余晖', description: '温暖怀旧，回忆的色调', colors: { background: '#fdf6ee', surface: '#fffdf9', surfaceHover: '#fffbf5', primary: '#d4855e', primaryHover: '#c07550', text: '#3d2a1e', textSecondary: '#5c4030', textMuted: '#8b6e5a', border: 'rgba(200,130,90,0.08)', accent1: '#e8b890', accent2: '#7a9a5a' } },
  { id: 'ink-classic', name: '水墨经典', description: '黑白为主，极简雅致', colors: { background: '#fafaf8', surface: '#ffffff', surfaceHover: '#f8f8f6', primary: '#333333', primaryHover: '#1a1a1a', text: '#1a1a1a', textSecondary: '#4a4a4a', textMuted: '#888888', border: 'rgba(0,0,0,0.08)', accent1: '#666666', accent2: '#c8862e' } },
]

// ── 通知 ──
export interface Notification { id: string; type: 'info' | 'warning' | 'success'; title: string; content: string; read: boolean; createdAt: string }

// ═══════════════════════════════════════
// 社区交流平台 v4
// ═══════════════════════════════════════

export type CommunityAuthorRole = 'teacher' | 'volunteer' | 'student' | 'official' | 'govt' | 'public'
export type PostType = 'question' | 'story' | 'recruitment' | 'resource'
export type QuestionSubject = 'math' | 'chinese' | 'english' | 'science' | 'art' | 'music' | 'pe' | 'psychology' | 'general' | 'other'
export type RecruitmentType = 'team_recruit' | 'volunteer_wanted' | 'material_request' | 'self_recommend'

export const SUBJECT_LABELS: Record<QuestionSubject, string> = {
  math: '数学', chinese: '语文', english: '英语', science: '科学', art: '美术', music: '音乐', pe: '体育', psychology: '心理', general: '通识', other: '其他',
}
export const SUBJECT_EMOJIS: Record<QuestionSubject, string> = {
  math: '🧮', chinese: '📖', english: '🌍', science: '🔬', art: '🎨', music: '🎵', pe: '⚽', psychology: '💭', general: '📚', other: '📌',
}
export const RECRUIT_LABELS: Record<RecruitmentType, string> = {
  team_recruit: '支教队招新', volunteer_wanted: '支教地需求', material_request: '物资求助', self_recommend: '志愿者自荐',
}
export const RECRUIT_EMOJIS: Record<RecruitmentType, string> = {
  team_recruit: '🌟', volunteer_wanted: '📍', material_request: '📦', self_recommend: '🙋',
}

export interface CommunityAuthor {
  id: string; name: string; avatar: string; role: CommunityAuthorRole; verified: boolean; badge?: string; teamName?: string; location?: string
}

export interface CommunityQuestion {
  id: string; title: string; content: string; author: CommunityAuthor; subject: QuestionSubject; gradeRange: string; region: string; tags: string[]; answers: CommunityAnswer[]; bestAnswerId?: string; status: 'open' | 'answered' | 'resolved'; views: number; likes: number; createdAt: string
}

export interface CommunityAnswer {
  id: string; content: string; author: CommunityAuthor; likes: number; isAccepted: boolean; createdAt: string
}

export interface CommunityRecruit {
  id: string; type: RecruitmentType; title: string; content: string; author: CommunityAuthor; region: string; tags: string[]; deadline?: string; contact: string; status: 'active' | 'closed'; views: number; createdAt: string
}

export interface CommunityStory {
  id: string; title: string; content: string; author: CommunityAuthor; images: string[]; teamName: string; location: string; tags: string[]; likes: number; comments: CommunityComment[]; createdAt: string
}

export interface CommunityComment {
  id: string; content: string; author: CommunityAuthor; createdAt: string
}

export interface StudentSocialPost {
  id: string; studentName: string; studentAvatar: string; grade: string; school: string; content: string; image: string; type: 'artwork' | 'question' | 'greeting' | 'story'; likes: number; createdAt: string; verifiedBy: string; interestGroup?: string
}

export interface InterestGroup {
  id: string; name: string; emoji: string; description: string; memberCount: number
}

export interface OfficialAccount {
  id: string; name: string; avatar: string; type: 'team' | 'school' | 'govt'; verified: boolean; description: string; memberCount: number; location: string; activeSince: string
}

// ═══════════════════════════════════════
// 教学资源广场 v5
// ═══════════════════════════════════════
export type ResourceCategory = 'lesson_plan' | 'worksheet' | 'ppt' | 'activity' | 'assessment' | 'handbook' | 'video' | 'other'
export type ResourceGrade = 'preschool' | 'grade1-2' | 'grade3-4' | 'grade5-6' | 'junior' | 'all'
export const RESOURCE_CATEGORIES: Record<ResourceCategory, { label: string; emoji: string; color: string }> = {
  lesson_plan: { label: '教案', emoji: '📖', color: '#d4855e' },
  worksheet: { label: '练习题', emoji: '📝', color: '#7a9a5a' },
  ppt: { label: '课件PPT', emoji: '📊', color: '#6baed6' },
  activity: { label: '活动方案', emoji: '🎯', color: '#e8a040' },
  assessment: { label: '评估工具', emoji: '📋', color: '#a78bfa' },
  handbook: { label: '教师手册', emoji: '📕', color: '#e06060' },
  video: { label: '教学视频', emoji: '🎬', color: '#9880c8' },
  other: { label: '其他', emoji: '📎', color: '#8b7d6b' },
}
export const GRADE_LABELS: Record<ResourceGrade, string> = {
  preschool: '学前班', 'grade1-2': '1-2年级', 'grade3-4': '3-4年级', 'grade5-6': '5-6年级', junior: '初中', all: '全年级',
}
export interface CommunityResource {
  id: string; title: string; description: string; category: ResourceCategory; grade: ResourceGrade; subject: string
  fileType: string; fileSize: string; downloads: number; rating: number; author: CommunityAuthor
  teamName: string; location: string; tags: string[]; createdAt: string; featured?: boolean
}

// ── 智能匹配 ──
export interface TeamProfile {
  id: string; name: string; logo: string; location: string; duration: string; teamSize: number
  subjects: string[]; description: string; recruitmentStatus: 'open' | 'urgent' | 'closed'
  skillsNeeded: string[]; contactInfo: string; matchScore?: number; matchReasons?: string[]
}
export interface VolunteerProfile {
  id: string; name: string; avatar: string; location: string; available: string; skills: string[]
  preferredGrades: ResourceGrade[]; preferredSubjects: string[]; experience: string; bio: string
}

// ── 影响力体系 ──
export interface ContributorBadge {
  id: string; name: string; emoji: string; description: string; tier: 'bronze' | 'silver' | 'gold' | 'diamond'
  condition: string
}
export interface ContributorRank {
  rank: number; author: CommunityAuthor; score: number; badges: ContributorBadge[]
  highlights: string[]
}

// ── 个人主页 ──
export type CommunityIdentity = 'teacher' | 'volunteer' | 'team_leader' | 'local_official' | 'school' | 'expert' | 'organization'
export const IDENTITY_LABELS: Record<CommunityIdentity, string> = {
  teacher: '一线教师', volunteer: '志愿者', team_leader: '支教队长', local_official: '地方团委/村支书',
  school: '学校代表', expert: '教育专家', organization: '公益组织',
}
export interface CommunityProfile {
  id: string; name: string; avatar: string; identity: CommunityIdentity; verified: boolean
  location: string; organization?: string; badge?: string
  bio: string; tags: string[]; skills: string[]; interests: string[]
  localNeeds?: { title: string; description: string; contactInfo: string; deadline?: string }[]
  stats: { questionsAnswered: number; resourcesShared: number; storiesWritten: number; recruitsPosted: number; joinedAt: string }
}

// ═══════════════════════════════════════
// 蒲公英 · 学生轻社交平台
// ═══════════════════════════════════════
export interface StudentFriend {
  studentId: string; studentName: string; studentAvatar: string
  grade: string; school: string; interestGroup: string
  addedAt: string; lastActive?: string
}
export interface FriendRequest {
  id: string; from: { id: string; name: string; avatar: string; grade: string; school: string }
  to: string; interestGroup: string; message: string; status: 'pending' | 'accepted' | 'declined'; createdAt: string
}
export interface StudentChatMessage {
  id: string; conversationId: string; senderId: string; senderName: string
  content: string; createdAt: string
}
export interface StudentConversation {
  id: string; type: 'direct' | 'group'
  name: string; avatar: string // group name+icon, or friend name+avatar
  participants: { id: string; name: string; avatar: string }[]
  lastMessage: string; lastMessageAt: string
  messages: StudentChatMessage[]
  // group-specific
  interestGroup?: string; groupDescription?: string; createdBy?: string
}
export interface StudentDiscovery {
  id: string; name: string; avatar: string; grade: string; school: string
  interestGroups: string[]; recentPost: string; alreadyFriend: boolean; requestSent: boolean
}
