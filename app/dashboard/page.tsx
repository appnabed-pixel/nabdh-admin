'use client';
import { MapPin, Users, Radio, Newspaper, HelpCircle, Star, AlertTriangle, ArrowUpRight, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Topbar from '@/components/layout/Topbar';
import StatCard from '@/components/ui/StatCard';
import CrowdBadge from '@/components/ui/CrowdBadge';
import { mockStats, mockActivityData, mockCrowdChartData, mockCrowdReports, mockFeedPosts, mockQuestions, mockRecommendations, mockReports } from '@/lib/mock-data';

const badge = (status: string) => {
  const map: Record<string, [string, string]> = {
    answered: ['#F0FDF4', '#16A34A'],
    approved: ['#F0FDF4', '#16A34A'],
    open:     ['#EFF6FF', '#2563EB'],
    pending:  ['#FFFBEB', '#D97706'],
    flagged:  ['#FEF2F2', '#DC2626'],
    active:   ['#F0FDFA', '#0F9690'],
    expired:  ['#F8FAFC', '#94A3B8'],
  };
  const [bg, color] = map[status] ?? ['#F8FAFC', '#94A3B8'];
  const labels: Record<string, string> = { answered: 'مجاب', approved: 'موافق', open: 'مفتوح', pending: 'معلّق', flagged: 'مبلَّغ', active: 'نشط', expired: 'منتهي' };
  return <span style={{ background: bg, color, fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 6 }}>{labels[status] ?? status}</span>;
};

export default function DashboardPage() {
  const pendingCount = mockReports.filter(r => r.status === 'pending').length
    + mockRecommendations.filter(r => r.status === 'pending').length
    + mockFeedPosts.filter(p => p.status === 'flagged' || p.status === 'pending').length;

  return (
    <div dir="rtl">
      <Topbar title="الرئيسية" subtitle="نظرة عامة على سطيف اليوم" />

      <div style={{ padding: '20px 20px 40px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 12 }}>
          <StatCard title="الأماكن" value={mockStats.totalPlaces} icon={MapPin} color="teal" trend={{ value: 8, label: 'الشهر' }} />
          <StatCard title="المستخدمون" value={mockStats.totalUsers.toLocaleString()} icon={Users} color="blue" trend={{ value: 12, label: 'الشهر' }} />
          <StatCard title="الأسئلة" value={mockQuestions.length} icon={HelpCircle} color="purple" />
          <StatCard title="التوصيات" value={mockRecommendations.length} icon={Star} color="orange" />
          <StatCard title="تقارير اليوم" value={mockStats.crowdReportsToday} icon={Radio} color="green" trend={{ value: 5, label: 'أمس' }} />
          <StatCard title="البلاغات" value={mockReports.filter(r => r.status === 'pending').length} icon={AlertTriangle} color="red" subtitle="تنتظر المراجعة" />
        </div>

        {/* Review Center */}
        <div style={{ background: '#fff', border: '1.5px solid #FECACA', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertTriangle size={15} color="#EF4444" />
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>مركز المراجعة</p>
                <p style={{ fontSize: 12, color: '#94A3B8' }}>{pendingCount} عنصر ينتظر</p>
              </div>
            </div>
            <a href="/reports" style={{ fontSize: 12, color: '#14B8A6', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3, textDecoration: 'none' }}>
              عرض الكل <ArrowUpRight size={13} />
            </a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)' }}>
            {[
              { label: 'أماكن معلّقة', value: 3, color: '#F59E0B', href: '/places' },
              { label: 'توصيات تنتظر', value: mockRecommendations.filter(r => r.status === 'pending').length, color: '#F59E0B', href: '/recommendations' },
              { label: 'أسئلة مبلَّغة', value: mockQuestions.filter(q => q.status === 'flagged').length, color: '#EF4444', href: '/questions' },
              { label: 'إجابات مبلَّغة', value: 2, color: '#EF4444', href: '/reports' },
              { label: 'منشورات معلّقة', value: mockFeedPosts.filter(p => p.status === 'pending' || p.status === 'flagged').length, color: '#EF4444', href: '/feed' },
            ].map((item, i, arr) => (
              <a key={item.label} href={item.href} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 12px', textDecoration: 'none',
                borderRight: i < arr.length - 1 ? '1px solid #F1F5F9' : 'none',
                transition: 'background 0.15s',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = '#FFFBEB')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <span style={{ fontSize: 28, fontWeight: 800, color: item.color }}>{item.value}</span>
                <span style={{ fontSize: 11, color: '#64748B', textAlign: 'center', marginTop: 4 }}>{item.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ background: '#fff', border: '1px solid #E8EDF2', borderRadius: 16, padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>نشاط الأسبوع</p>
              <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, background: '#F0FDFA', color: '#14B8A6' }}>7 أيام</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={mockActivityData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#14B8A6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E8EDF2', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', fontSize: 12, fontFamily: 'Cairo' }} />
                <Area type="monotone" dataKey="reports" name="تقارير" stroke="#14B8A6" fill="url(#g1)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="users" name="مستخدمون" stroke="#3B82F6" fill="url(#g2)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div style={{ background: '#fff', border: '1px solid #E8EDF2', borderRadius: 16, padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>الازدحام حسب الساعة</p>
              <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, background: '#F0FDFA', color: '#14B8A6' }}>اليوم</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={mockCrowdChartData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <XAxis dataKey="hour" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E8EDF2', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', fontSize: 12, fontFamily: 'Cairo' }} />
                <Bar dataKey="empty" name="فارغ" stackId="a" fill="#14B8A6" />
                <Bar dataKey="medium" name="متوسط" stackId="a" fill="#F59E0B" />
                <Bar dataKey="full" name="مزدحم" stackId="a" fill="#EF4444" />
                <Bar dataKey="veryFull" name="مزدحم جداً" stackId="a" fill="#1E293B" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom tables */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

          {/* Crowd reports */}
          <div style={{ background: '#fff', border: '1px solid #E8EDF2', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>آخر تقارير الازدحام</p>
              <a href="/crowd" style={{ fontSize: 12, color: '#14B8A6', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3, textDecoration: 'none' }}>
                الكل <ArrowUpRight size={13} />
              </a>
            </div>
            {mockCrowdReports.slice(0, 5).map(r => (
              <div key={r.id} style={{ padding: '11px 18px', borderBottom: '1px solid #F8FAFC', display: 'flex', alignItems: 'center', gap: 10 }}>
                <CrowdBadge level={r.level} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 500, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.placeName}</p>
                  <p style={{ fontSize: 11, color: '#94A3B8' }}>{r.userName} {r.gpsVerified ? '· 📍' : ''}</p>
                </div>
                {badge(r.status)}
              </div>
            ))}
          </div>

          {/* Pending posts */}
          <div style={{ background: '#fff', border: '1px solid #E8EDF2', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>منشورات تنتظر المراجعة</p>
              <a href="/feed" style={{ fontSize: 12, color: '#14B8A6', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3, textDecoration: 'none' }}>
                الكل <ArrowUpRight size={13} />
              </a>
            </div>
            {mockFeedPosts.filter(p => p.status === 'pending' || p.status === 'flagged').length === 0 ? (
              <div style={{ padding: '32px 20px', textAlign: 'center' }}>
                <CheckCircle2 size={36} color="#22C55E" style={{ margin: '0 auto 10px' }} />
                <p style={{ fontSize: 13, color: '#94A3B8' }}>لا توجد منشورات معلّقة</p>
              </div>
            ) : mockFeedPosts.filter(p => p.status === 'pending' || p.status === 'flagged').map(p => (
              <div key={p.id} style={{ padding: '11px 18px', borderBottom: '1px solid #F8FAFC', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: p.status === 'flagged' ? '#EF4444' : '#F59E0B', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.content}</p>
                  <p style={{ fontSize: 11, color: '#94A3B8' }}>{p.userName}</p>
                </div>
                {badge(p.status)}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
