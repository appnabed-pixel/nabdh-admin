export const mockStats = {
  totalPlaces: 142,
  totalUsers: 1840,
  crowdReportsToday: 67,
  feedPostsToday: 34,
  activeUsersToday: 312,
  trustReportsAccuracy: 89,
};

export const mockPlaces = [
  { id: 'p1', name: 'بريد الجزائر - سطيف المركز', category: 'government', address: 'شارع محمد خيضر، سطيف', rating: 3.2, reviewCount: 148, trustScore: 87, crowdLevel: 'full', isActive: true },
  { id: 'p2', name: 'المستشفى الجامعي سعدان', category: 'health', address: 'طريق الجديدة، سطيف', rating: 3.8, reviewCount: 312, trustScore: 92, crowdLevel: 'medium', isActive: true },
  { id: 'p3', name: 'بلدية سطيف', category: 'government', address: 'ساحة الاستقلال، سطيف', rating: 2.9, reviewCount: 89, trustScore: 79, crowdLevel: 'veryFull', isActive: true },
  { id: 'p4', name: 'صيدلية نور - الوسط', category: 'pharmacy', address: 'شارع 8 مايو، سطيف', rating: 4.5, reviewCount: 67, trustScore: 95, crowdLevel: 'empty', isActive: true },
  { id: 'p5', name: 'بنك الجزائر - فرع سطيف', category: 'bank', address: 'شارع الجمهورية، سطيف', rating: 3.1, reviewCount: 203, trustScore: 84, crowdLevel: 'medium', isActive: true },
  { id: 'p6', name: 'مطعم الأصالة', category: 'food', address: 'حي 8000 مسكن، سطيف', rating: 4.2, reviewCount: 95, trustScore: 91, crowdLevel: null, isActive: true },
  { id: 'p7', name: 'محل التقنية - IT Store', category: 'shopping', address: 'شارع الجمهورية، سطيف', rating: 4.0, reviewCount: 54, trustScore: 88, crowdLevel: null, isActive: false },
];

export const mockCrowdReports = [
  { id: 'c1', placeName: 'بريد الجزائر', userName: 'أحمد بن علي', level: 'empty', waitingMinutes: 0, gpsVerified: true, upvotes: 24, createdAt: new Date(Date.now() - 15 * 60000).toISOString(), status: 'active' },
  { id: 'c2', placeName: 'بلدية سطيف', userName: 'سمير بلقاسم', level: 'veryFull', waitingMinutes: 60, gpsVerified: true, upvotes: 56, createdAt: new Date(Date.now() - 3 * 3600000).toISOString(), status: 'active' },
  { id: 'c3', placeName: 'المستشفى سعدان', userName: 'نادية عمراني', level: 'medium', waitingMinutes: 30, gpsVerified: false, upvotes: 8, createdAt: new Date(Date.now() - 6 * 3600000).toISOString(), status: 'active' },
  { id: 'c4', placeName: 'بنك الجزائر', userName: 'يوسف بوخضرة', level: 'full', waitingMinutes: 45, gpsVerified: true, upvotes: 31, createdAt: new Date(Date.now() - 8 * 3600000).toISOString(), status: 'expired' },
  { id: 'c5', placeName: 'بريد الجزائر', userName: 'مجهول', level: 'veryFull', waitingMinutes: 120, gpsVerified: false, upvotes: 0, createdAt: new Date(Date.now() - 2 * 3600000).toISOString(), status: 'flagged' },
];

export const mockUsers = [
  { id: 'u1', name: 'فريدة حمداوي', phone: '+213 550 123 456', xp: 3420, trustScore: 97, contributions: 89, badges: ['crowdReporter', 'trustedUser'], joinedAt: '2024-01-15', isActive: true },
  { id: 'u2', name: 'أحمد بن علي', phone: '+213 661 234 567', xp: 2890, trustScore: 94, contributions: 72, badges: ['serviceExpert', 'trustedUser'], joinedAt: '2024-02-01', isActive: true },
  { id: 'u3', name: 'كريم مسعود', phone: '+213 770 345 678', xp: 1240, trustScore: 92, contributions: 47, badges: ['crowdReporter'], joinedAt: '2024-03-01', isActive: true },
  { id: 'u4', name: 'نادية عمراني', phone: '+213 555 456 789', xp: 980, trustScore: 85, contributions: 31, badges: ['foodExpert'], joinedAt: '2024-03-15', isActive: true },
  { id: 'u5', name: 'مستخدم مريب', phone: '+213 699 000 000', xp: 50, trustScore: 22, contributions: 12, badges: [], joinedAt: '2024-05-01', isActive: false },
];

export const mockFeedPosts = [
  { id: 'f1', type: 'crowdUpdate', userName: 'أحمد بن علي', content: 'بريد الجزائر فارغ الآن، لا انتظار 👌', placeName: 'بريد الجزائر', likes: 24, comments: 3, createdAt: new Date(Date.now() - 15 * 60000).toISOString(), status: 'approved' },
  { id: 'f2', type: 'availability', userName: 'فريدة حمداوي', content: 'دواء Doliprane 1000 متوفر في صيدلية نور', placeName: 'صيدلية نور', likes: 41, comments: 7, createdAt: new Date(Date.now() - 45 * 60000).toISOString(), status: 'approved' },
  { id: 'f3', type: 'recommendation', userName: 'مستخدم مريب', content: 'إعلان تجاري مشبوه — اشتروا من موقعنا...', placeName: null, likes: 0, comments: 0, createdAt: new Date(Date.now() - 20 * 60000).toISOString(), status: 'flagged' },
  { id: 'f4', type: 'recommendation', userName: 'كريم مسعود', content: 'أنصح بالدكتور بوزيد للأسنان، خدمة ممتازة وسعر معقول', placeName: null, likes: 87, comments: 19, createdAt: new Date(Date.now() - 2 * 3600000).toISOString(), status: 'pending' },
];

export const mockCrowdChartData = [
  { hour: '06h', empty: 40, medium: 20, full: 5, veryFull: 0 },
  { hour: '08h', empty: 15, medium: 35, full: 25, veryFull: 8 },
  { hour: '10h', empty: 8, medium: 20, full: 38, veryFull: 15 },
  { hour: '12h', empty: 20, medium: 30, full: 22, veryFull: 5 },
  { hour: '14h', empty: 30, medium: 28, full: 18, veryFull: 3 },
  { hour: '16h', empty: 12, medium: 25, full: 35, veryFull: 10 },
  { hour: '18h', empty: 25, medium: 35, full: 20, veryFull: 4 },
  { hour: '20h', empty: 45, medium: 15, full: 5, veryFull: 0 },
];

export const mockActivityData = [
  { day: 'الأحد', reports: 45, posts: 23, users: 210 },
  { day: 'الاثنين', reports: 67, posts: 34, users: 312 },
  { day: 'الثلاثاء', reports: 52, posts: 28, users: 275 },
  { day: 'الأربعاء', reports: 78, posts: 41, users: 389 },
  { day: 'الخميس', reports: 91, posts: 55, users: 445 },
  { day: 'الجمعة', reports: 38, posts: 19, users: 180 },
  { day: 'السبت', reports: 62, posts: 37, users: 298 },
];
