import type { StudentFriend, FriendRequest, StudentConversation, StudentDiscovery } from '@/types'

// ═══════════════════════════════════════
// 蒲公英 · 学生轻社交平台数据
// ═══════════════════════════════════════

// ── 每位学生的好友列表 ──
export const STUDENT_FRIENDS: Record<string, StudentFriend[]> = {
  sp1: [ // 小宇
    { studentId:'sp2',studentName:'小雨',studentAvatar:'🌻',grade:'二年级',school:'筠连县玉壶小学',interestGroup:'绘画天地',addedAt:'2026-07-20',lastActive:'刚刚'},
    { studentId:'sp4',studentName:'欣怡',studentAvatar:'🦋',grade:'一年级',school:'筠连县玉壶小学',interestGroup:'小小歌手',addedAt:'2026-07-21',lastActive:'10分钟前'},
    { studentId:'sp7',studentName:'萌萌',studentAvatar:'🐰',grade:'二年级',school:'筠连县城南小学',interestGroup:'手工创意',addedAt:'2026-07-22',lastActive:'30分钟前'},
  ],
  sp2: [
    { studentId:'sp1',studentName:'小宇',studentAvatar:'🌟',grade:'三年级',school:'筠连县城南小学',interestGroup:'手工创意',addedAt:'2026-07-20',lastActive:'刚刚'},
    { studentId:'sp6',studentName:'子涵',studentAvatar:'📖',grade:'三年级',school:'筠连县玉壶小学',interestGroup:'阅读时光',addedAt:'2026-07-21',lastActive:'5分钟前'},
    { studentId:'sp8',studentName:'小雅',studentAvatar:'🎀',grade:'三年级',school:'筠连县玉壶小学',interestGroup:'小小歌手',addedAt:'2026-07-22',lastActive:'1小时前'},
  ],
  sp3: [
    { studentId:'sp5',studentName:'大勇',studentAvatar:'🦁',grade:'四年级',school:'筠连县城南小学',interestGroup:'科学探索',addedAt:'2026-07-19',lastActive:'刚刚'},
  ],
}
export const MOCK_CURRENT_STUDENT = 'sp1'

// ── 待处理好友申请 ──
export const FRIEND_REQUESTS: FriendRequest[] = [
  { id:'fr1',from:{ id:'sp6',name:'子涵',avatar:'📖',grade:'三年级',school:'筠连县玉壶小学'},to:'sp1',interestGroup:'阅读时光',message:'你好小宇！我也喜欢做手工，可以和你做朋友吗？😊',status:'pending',createdAt:'2026-07-25'},
  { id:'fr2',from:{ id:'sp8',name:'小雅',avatar:'🎀',grade:'三年级',school:'筠连县玉壶小学'},to:'sp1',interestGroup:'小小歌手',message:'听说你做的恐龙很厉害！我们手工课上可以一起玩吗？',status:'pending',createdAt:'2026-07-25'},
]

// ── 聊天对话 ──
export const STUDENT_CONVERSATIONS: StudentConversation[] = [
  {
    id:'conv1',type:'direct',name:'小雨',avatar:'🌻',
    participants:[{ id:'sp1',name:'小宇',avatar:'🌟' },{ id:'sp2',name:'小雨',avatar:'🌻' }],
    lastMessage:'我也想画一只大恐龙！🦕',lastMessageAt:'刚刚',
    messages:[
      { id:'dm1',conversationId:'conv1',senderId:'sp2',senderName:'小雨',content:'小宇！你的恐龙做得真好！',createdAt:'昨天 16:30'},
      { id:'dm2',conversationId:'conv1',senderId:'sp1',senderName:'小宇',content:'谢谢你小雨～你喜欢画画吗？',createdAt:'昨天 16:32'},
      { id:'dm3',conversationId:'conv1',senderId:'sp2',senderName:'小雨',content:'喜欢！我昨天画了一幅向日葵🌻',createdAt:'昨天 16:35'},
      { id:'dm4',conversationId:'conv1',senderId:'sp1',senderName:'小宇',content:'好厉害！我也想看看～',createdAt:'昨天 16:36'},
      { id:'dm5',conversationId:'conv1',senderId:'sp2',senderName:'小雨',content:'那我明天带给你看！我也想画一只大恐龙！🦕',createdAt:'刚刚'},
    ],
  },
  {
    id:'conv2',type:'group',name:'手工创意小分队',avatar:'✂️',
    participants:[{ id:'sp1',name:'小宇',avatar:'🌟' },{ id:'sp7',name:'萌萌',avatar:'🐰' },{ id:'sp2',name:'小雨',avatar:'🌻' },{ id:'sp8',name:'小雅',avatar:'🎀' }],
    lastMessage:'明天我们一起做纸飞机比赛吧！',lastMessageAt:'10分钟前',
    interestGroup:'手工创意',groupDescription:'喜欢做手工的小伙伴们～分享作品、交流创意、一起动手！',createdBy:'小宇',
    messages:[
      { id:'gm1',conversationId:'conv2',senderId:'sp1',senderName:'小宇',content:'大家好啊！我建了一个手工群～',createdAt:'7/24 10:00'},
      { id:'gm2',conversationId:'conv2',senderId:'sp7',senderName:'萌萌',content:'哇！太好了！我昨天做了一张树叶书签🍂',createdAt:'7/24 10:02'},
      { id:'gm3',conversationId:'conv2',senderId:'sp2',senderName:'小雨',content:'可以请教一下怎么做吗？',createdAt:'7/24 10:05'},
      { id:'gm4',conversationId:'conv2',senderId:'sp7',senderName:'萌萌',content:'很简单的！把树叶夹在厚书里压平，然后贴在卡纸上就好了！',createdAt:'7/24 10:07'},
      { id:'gm5',conversationId:'conv2',senderId:'sp1',senderName:'小宇',content:'明天我们一起做纸飞机比赛吧！',createdAt:'10分钟前'},
    ],
  },
  {
    id:'conv3',type:'group',name:'小小科学家的十万个为什么',avatar:'🔬',
    participants:[{ id:'sp1',name:'小宇',avatar:'🌟' },{ id:'sp3',name:'浩然',avatar:'🚀' },{ id:'sp5',name:'大勇',avatar:'🦁' }],
    lastMessage:'为什么树叶会变颜色呢？',lastMessageAt:'30分钟前',
    interestGroup:'科学探索',groupDescription:'爱问为什么的小伙伴都在这里！一起探索世界的秘密。',createdBy:'浩然',
    messages:[
      { id:'gm7',conversationId:'conv3',senderId:'sp3',senderName:'浩然',content:'老师今天讲了叶子为什么会变黄，好神奇！🌿',createdAt:'30分钟前'},
      { id:'gm8',conversationId:'conv3',senderId:'sp5',senderName:'大勇',content:'我知道！因为叶绿素分解了！',createdAt:'28分钟前'},
      { id:'gm9',conversationId:'conv3',senderId:'sp1',senderName:'小宇',content:'👍 大勇真厉害！',createdAt:'25分钟前'},
    ],
  },
  {
    id:'conv4',type:'direct',name:'欣怡',avatar:'🦋',
    participants:[{ id:'sp1',name:'小宇',avatar:'🌟' },{ id:'sp4',name:'欣怡',avatar:'🦋' }],
    lastMessage:'你唱歌真好听！',lastMessageAt:'1小时前',
    messages:[
      { id:'dm6',conversationId:'conv4',senderId:'sp4',senderName:'欣怡',content:'小宇哥哥，我喜欢你做的恐龙！🦕',createdAt:'7/23 14:00'},
      { id:'dm7',conversationId:'conv4',senderId:'sp1',senderName:'小宇',content:'谢谢你欣怡！你唱歌真好听！🎵',createdAt:'1小时前'},
    ],
  },
]

// ── 可发现的新朋友 ──
export const DISCOVERABLE_STUDENTS: StudentDiscovery[] = [
  { id:'sp6',name:'子涵',avatar:'📖',grade:'三年级',school:'筠连县玉壶小学',interestGroups:['阅读时光','绘画天地'],recentPost:'今天科学课我们观察了树叶的脉络！我画下了三种不同树叶的样子。',alreadyFriend:false,requestSent:false},
  { id:'sp8',name:'小雅',avatar:'🎀',grade:'三年级',school:'筠连县玉壶小学',interestGroups:['小小歌手','手工创意'],recentPost:'今天教同学们跳了我们苗族的舞蹈！一开始很紧张怕他们笑话我。',alreadyFriend:false,requestSent:false},
  { id:'sp3',name:'浩然',avatar:'🚀',grade:'四年级',school:'筠连县城南小学',interestGroups:['科学探索','阅读时光'],recentPost:'今天运动会上我当上了方阵组长！带着一年级的弟弟妹妹们喊口号。',alreadyFriend:false,requestSent:false},
  { id:'sp4',name:'欣怡',avatar:'🦋',grade:'一年级',school:'筠连县玉壶小学',interestGroups:['小小歌手'],recentPost:'今天老师教我们唱歌，我唱得最大声！我想当歌手。',alreadyFriend:true,requestSent:false},
  { id:'sp5',name:'大勇',avatar:'🦁',grade:'四年级',school:'筠连县城南小学',interestGroups:['科学探索','手工创意'],recentPost:'教室里的风扇坏了，我用螺丝刀把它修好了！',alreadyFriend:true,requestSent:false},
  { id:'sp7',name:'萌萌',avatar:'🐰',grade:'二年级',school:'筠连县城南小学',interestGroups:['手工创意','绘画天地'],recentPost:'我用树叶和花瓣做了一张书签，要送给我的奶奶。',alreadyFriend:true,requestSent:false},
]
