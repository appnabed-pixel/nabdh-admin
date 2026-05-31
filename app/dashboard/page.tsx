'use client';
import { MapPin, Users, Radio, HelpCircle, Star, AlertTriangle, ArrowUpRight, CheckCircle2, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Topbar from '@/components/layout/Topbar';
import CrowdBadge from '@/components/ui/CrowdBadge';
import { mockStats, mockActivityData, mockCrowdChartData, mockCrowdReports, mockFeedPosts, mockQuestions, mockRecommendations, mockReports } from '@/lib/mock-data';

const S: React.CSSProperties = { fontFamily: 'Cairo, sans-serif' };

function Stat({ label, value, sub, icon: Icon, iconColor, iconBg, trend }: {
  label: string; value: string | number; sub?: string;
  icon: React.ElementType; iconColor: string; iconBg: string;
  trend?: { v: number; t: string };
}) {
  return (
    <div style={{ background: '#fff', border: '1px solid #E8EDF2', borderRadius: 16, padding: '20px 22px', ...S }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <span style={{ fontSize: 13, color: '#64748B', fontWeight: 500 }}>{label}</span>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={17} color={iconColor} />
        </div>
      </div>
      <div style={{ fontSize: 30, fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 6 }}>{sub}</div>}
      {trend && (
        <div style={{ fontSize: 12, color: trend.v >= 0 ? '#22C55E' : '#EF4444', marginTop: 8, fontWeight: 600 }}>
          {trend.v >= 0 ? '↑' : '↓'} {Math.abs(trend.v)}%
          <span style={{ color: '#94A3B8', fontWeight: 400, marginRight: 4 }}>{trend.t}</span>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, [string, string, string]> = {
    answered: ['#F0FDF4', '#16A34A', 'مجاب'],
    approved: ['#F0FDF4', '#16A34A', 'موافق'],
    open:     ['#EFF6FF', '#2563EB', 'مفتوح'],
    pending:  ['#FFFBEB', '#D97706', 'معلّق'],
    flagged:  ['#FEF2F2', '#DC2626', 'مبلَّغ'],
    active:   ['#F0FDFA', '#0F9690', 'نشط'],
    expired:  ['#F8FAFC', '#94A3B8', 'منتهي'],
  };
  const [bg, color, label] = map[status] ?? ['#F8FAFC', '#94A3B8', status];
  return <span style={{ background: bg, color, fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 6, whiteSpace: 'nowrap' }}>{label}</span>;
}

export default function DashboardPage() {
  const pendingCount =
    mockReports.filter(r => r.status === 'pending').length +
    mockRecommendations.filter(r => r.status === 'pending').length +
    mockFeedPosts.filter(p => p.status === 'flagged' || p.status === 'pending').length;

  const pendingPosts = mockFeedPosts.filter(p => p.status === 'pending' || p.status === 'flagged');

  return (
    <div dir="rtl" style={{ ...S }}>
      <Topbar title="الرئيسية" subtitle="نظرة عامة على سطيف اليوم" />

      <div style={{ padding: '28px 24px 48px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Row 1 — 4 stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          <Stat label="إجمالي الأماكن" value={mockStats.totalPlaces} icon={MapPin} iconColor="#14B8A6" iconBg="#F0FDFA" trend={{ v: 8, t: 'الشهر' }} />
          <Stat label="المستخدمون" value={mockStats.totalUsers.toLocaleString()} icon={Users} iconColor="#3B82F6" iconBg="#EFF6FF" trend={{ v: 12, t: 'الشهر' }} />
          <Stat label="تقارير الازدحام اليوم" value={mockStats.crowdReportsToday} icon={Radio} iconColor="#F59E0B" iconBg="#FFFBEB" trend={{ v: 5, t: 'أمس' }} />
          <Stat label="بلاغات تنتظر" value={mockReports.filter(r => r.status === 'pending').length} icon={AlertTriangle} iconColor="#EF4444" iconBg="#FEF2F2" sub="يحتاج مراجعة فورية" />
        </div>

        {/* Row 2 — 3 stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          <Stat label="الأسئلة" value={mockQuestions.length} icon={HelpCircle} iconColor="#8B5CF6" iconBg="#F5F3FF" />
          <Stat label="التوصيات" value={mockRecommendations.length} icon={Star} iconColor="#F59E0B" iconBg="#FFFBEB" />
          <Stat label="نشطون اليوم" value={mockStats.activeUsersToday} icon={TrendingUp} iconColor="#22C55E" iconBg="#F0FDF4" />
        </div>

        {/* Review Center */}
        <div style={{ background: '#fff', border: '1.5px solid #FECACA', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '16px 22px', borderBottom: '1px solid #FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertTriangle size={17} color="#EF4444" />
              </div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#0F172A' }}>مركز المراجعة</p>
                <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 1 }}>{pendingCount} عنصر ينتظر المراجعة</p>
              </div>
            </div>
            <a href="/reports" style={{ fontSize: 13, color: '#14B8A6', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
              عرض الكل <ArrowUpRight size={14} />
            </a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
            {[
              { label: 'أماكن معلّقة',    value: 3, color: '#F59E0B', href: '/places' },
              { label: 'توصيات تنتظر',    value: mockRecommendations.filter(r => r.status === 'pending').length, color: '#F59E0B', href: '/recommendations' },
              { label: 'أسئلة مبلَّغة',   value: mockQuestions.filter(q => q.status === 'flagged').length, color: '#EF4444', href: '/questions' },
              { label: 'إجابات مبلَّغة',  value: 2, color: '#EF4444', href: '/reports' },
              { label: 'منشورات معلّقة',  value: pendingPosts.length, color: '#EF4444', href: '/feed' },
            ].map((item, i, arr) => (
              <a key={item.label} href={item.href} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '22px 12px', textDecoration: 'none',
                borderRight: i < arr.length - 1 ? '1px solid #FEF2F2' : 'none',
                transition: 'background 0.15s',
                cursor: 'pointer',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = '#FFFBEB')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <span style={{ fontSize: 32, fontWeight: 800, color: item.color, lineHeight: 1 }}>{item.value}</span>
                <span style={{ fontSize: 12, color: '#64748B', textAlign: 'center', marginTop: 6 }}>{item.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ background: '#fff', border: '1px solid #E8EDF2', borderRadius: 16, padding: '22px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>نشاط الأسبوع</p>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 8, background: '#F0FDFA', color: '#14B8A6', fontWeight: 600 }}>7 أيام</span>
            </div>
            <ResponsiveContainer width="100%" height={190}>
              <AreaChart data={mockActivityData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#14B8A6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'Cairo' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E8EDF2', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', fontSize: 12, fontFamily: 'Cairo' }} />
                <Area type="monotone" dataKey="reports" name="تقارير" stroke="#14B8A6" fill="url(#g1)" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                <Area type="monotone" dataKey="users" name="مستخدمون" stroke="#3B82F6" fill="url(#g2)" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div style={{ background: '#fff', border: '1px solid #E8EDF2', borderRadius: 16, padding: '22px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>الازدحام حسب الساعة</p>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 8, background: '#F0FDFA', color: '#14B8A6', fontWeight: 600 }}>اليوم</span>
            </div>
            <ResponsiveContainer width="100%" height={190}>
              <BarChart data={mockCrowdChartData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E8EDF2', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', fontSize: 12, fontFamily: 'Cairo' }} />
                <Bar dataKey="empty" name="فارغ" stackId="a" fill="#14B8A6" />
                <Bar dataKey="medium" name="متوسط" stackId="a" fill="#F59E0B" />
                <Bar dataKey="full" name="مزدحم" stackId="a" fill="#EF4444" />
                <Bar dataKey="veryFull" name="مزدحم جداً" stackId="a" fill="#1E293B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom tables */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

          <div style={{ background: '#fff', border: '1px solid #E8EDF2', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '16px 22px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>آخر تقارير الازدحام</p>
              <a href="/crowd" style={{ fontSize: 12, color: '#14B8A6', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3, textDecoration: 'none' }}>
                الكل <ArrowUpRight size={13} />
              </a>
            </div>
            {mockCrowdReports.slice(0, 5).map((r, i) => (
              <div key={r.id} style={{ padding: '13px 22px', borderBottom: i < 4 ? '1px solid #F8FAFC' : 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
                <CrowdBadge level={r.level} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 500, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.placeName}</p>
                  <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{r.userName} {r.gpsVerified ? '· 📍' : ''}</p>
                </div>
                <StatusBadge status={r.status} />
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', border: '1px solid #E8EDF2', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '16px 22px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>منشورات تنتظر المراجعة</p>
              <a href="/feed" style={{ fontSize: 12, color: '#14B8A6', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3, textDecoration: 'none' }}>
                الكل <ArrowUpRight size={13} />
              </a>
            </div>
            {pendingPosts.length === 0 ? (
              <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                <CheckCircle2 size={38} color="#22C55E" style={{ margin: '0 auto 12px' }} />
                <p style={{ fontSize: 13, color: '#94A3B8' }}>لا توجد منشورات معلّقة</p>
              </div>
            ) : pendingPosts.map((p, i) => (
              <div key={p.id} style={{ padding: '13px 22px', borderBottom: i < pendingPosts.length - 1 ? '1px solid #F8FAFC' : 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: p.status === 'flagged' ? '#EF4444' : '#F59E0B', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.content}</p>
                  <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{p.userName}</p>
                </div>
                <StatusBadge status={p.status} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
