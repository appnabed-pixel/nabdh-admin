'use client';
import { useEffect, useState } from 'react';
import { MapPin, Users, Radio, Newspaper, TrendingUp, ShieldCheck } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, Legend } from 'recharts';
import Topbar from '@/components/layout/Topbar';
import StatCard from '@/components/ui/StatCard';
import CrowdBadge from '@/components/ui/CrowdBadge';
import { mockCrowdChartData, mockActivityData } from '@/lib/mock-data';
import { api } from '@/lib/api';

export default function DashboardPage() {
  const [stats, setStats] = useState<Record<string, number>>({});
  const [recentReports, setRecentReports] = useState<any[]>([]);
  const [pendingPosts, setPendingPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.stats(),
      api.crowd(),
      api.feed('pending'),
    ]).then(([s, c, f]) => {
      setStats(s);
      setRecentReports((c as any).reports?.slice(0, 4) || []);
      const items = (f as any).items || [];
      setPendingPosts(items.filter((p: any) => p.status === 'pending' || p.status === 'flagged'));
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Topbar title="لوحة التحكم" subtitle="نظرة عامة على نشاط سطيف اليوم" />

      <div className="p-6 space-y-6">

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard title="إجمالي الأماكن" value={stats.totalPlaces ?? '—'} icon={MapPin} color="emerald" trend={{ value: 8, label: 'هذا الشهر' }} />
          <StatCard title="المستخدمون" value={stats.totalUsers?.toLocaleString('ar') ?? '—'} icon={Users} color="blue" trend={{ value: 12, label: 'هذا الشهر' }} />
          <StatCard title="تقارير ازدحام اليوم" value={stats.crowdReportsToday ?? '—'} icon={Radio} color="orange" trend={{ value: 5, label: 'أمس' }} />
          <StatCard title="منشورات اليوم" value={stats.feedPostsToday ?? '—'} icon={Newspaper} color="purple" trend={{ value: -3, label: 'أمس' }} />
          <StatCard title="تنتظر المراجعة" value={stats.pendingModeration ?? '—'} icon={TrendingUp} color="emerald" subtitle="منشورات معلّقة" />
          <StatCard title="دقة التقارير" value={stats.trustReportsAccuracy != null ? `${stats.trustReportsAccuracy}%` : '—'} icon={ShieldCheck} color="blue" subtitle="معدل الموثوقية" />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h3 className="text-base font-bold text-gray-800 mb-4">نشاط الأسبوع</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={mockActivityData}>
                <defs>
                  <linearGradient id="reports" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00B894" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#00B894" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="users" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0984E3" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#0984E3" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" iconSize={8} />
                <Area type="monotone" dataKey="reports" name="تقارير" stroke="#00B894" fill="url(#reports)" strokeWidth={2} />
                <Area type="monotone" dataKey="users" name="مستخدمون" stroke="#0984E3" fill="url(#users)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h3 className="text-base font-bold text-gray-800 mb-4">توزيع الازدحام حسب الساعة</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={mockCrowdChartData}>
                <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="empty" name="فارغ" stackId="a" fill="#00B894" />
                <Bar dataKey="medium" name="متوسط" stackId="a" fill="#FDCB6E" />
                <Bar dataKey="full" name="مزدحم" stackId="a" fill="#E17055" />
                <Bar dataKey="veryFull" name="مزدحم جداً" stackId="a" fill="#2D3436" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Reports + Pending Posts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-800">آخر تقارير الازدحام</h3>
              <a href="/crowd" className="text-xs text-emerald-600 hover:underline font-medium">الكل</a>
            </div>
            <div className="divide-y divide-gray-50">
              {loading ? (
                <p className="px-5 py-6 text-sm text-gray-400 text-center">جاري التحميل...</p>
              ) : recentReports.length === 0 ? (
                <p className="px-5 py-6 text-sm text-gray-400 text-center">لا توجد تقارير</p>
              ) : recentReports.map(r => (
                <div key={r.id} className="px-5 py-3 flex items-center gap-3">
                  <CrowdBadge level={r.level} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{r.placeName}</p>
                    <p className="text-xs text-gray-400">{r.userName} · {r.gpsVerified ? '📍 GPS' : 'بدون GPS'}</p>
                  </div>
                  {r.status === 'flagged' && (
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-semibold">مبلّغ عنه</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-800">منشورات تنتظر المراجعة</h3>
              <a href="/feed" className="text-xs text-emerald-600 hover:underline font-medium">الكل</a>
            </div>
            <div className="divide-y divide-gray-50">
              {loading ? (
                <p className="px-5 py-6 text-sm text-gray-400 text-center">جاري التحميل...</p>
              ) : pendingPosts.length === 0 ? (
                <p className="px-5 py-6 text-sm text-gray-400 text-center">لا توجد منشورات معلّقة 🎉</p>
              ) : pendingPosts.map(p => (
                <div key={p.id} className="px-5 py-3 flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${p.status === 'flagged' ? 'bg-red-400' : 'bg-orange-400'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800 truncate">{p.content}</p>
                    <p className="text-xs text-gray-400">{p.userName}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    p.status === 'flagged' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                  }`}>
                    {p.status === 'flagged' ? 'مبلّغ عنه' : 'معلّق'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
