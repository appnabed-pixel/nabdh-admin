'use client';
import { useEffect, useState } from 'react';
import { MapPin, Users, Radio, Newspaper, TrendingUp, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Topbar from '@/components/layout/Topbar';
import StatCard from '@/components/ui/StatCard';
import CrowdBadge from '@/components/ui/CrowdBadge';
import { mockCrowdChartData, mockActivityData, mockStats, mockCrowdReports, mockFeedPosts } from '@/lib/mock-data';

export default function DashboardPage() {
  const stats = mockStats;
  const recentReports = mockCrowdReports.slice(0, 5);
  const pendingPosts = mockFeedPosts.filter(p => p.status === 'pending' || p.status === 'flagged').slice(0, 4);

  return (
    <div>
      <Topbar title="لوحة التحكم" subtitle="سطيف — نشاط اليوم" />

      <div className="p-5 space-y-5">

        {/* Stats - compact row */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          <StatCard title="إجمالي الأماكن" value={stats.totalPlaces} icon={MapPin} color="teal" trend={{ value: 8, label: 'الشهر' }} />
          <StatCard title="المستخدمون" value={(stats.totalUsers).toLocaleString()} icon={Users} color="blue" trend={{ value: 12, label: 'الشهر' }} />
          <StatCard title="تقارير اليوم" value={stats.crowdReportsToday} icon={Radio} color="orange" trend={{ value: 5, label: 'أمس' }} />
          <StatCard title="منشورات اليوم" value={stats.feedPostsToday} icon={Newspaper} color="purple" trend={{ value: -3, label: 'أمس' }} />
          <StatCard title="نشطون اليوم" value={stats.activeUsersToday} icon={TrendingUp} color="green" />
          <StatCard title="دقة التقارير" value={`${stats.trustReportsAccuracy}%`} icon={ShieldCheck} color="teal" subtitle="معدل الموثوقية" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-xl p-4" style={{ background: '#fff', border: '1px solid #E8EDF2' }}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold" style={{ color: '#0F172A' }}>نشاط الأسبوع</p>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#F0FDFA', color: '#14B8A6' }}>7 أيام</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={mockActivityData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="gr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#14B8A6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E8EDF2', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', fontSize: 12 }} />
                <Area type="monotone" dataKey="reports" name="تقارير" stroke="#14B8A6" fill="url(#gr)" strokeWidth={1.5} dot={false} />
                <Area type="monotone" dataKey="users" name="مستخدمون" stroke="#3B82F6" fill="url(#gu)" strokeWidth={1.5} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl p-4" style={{ background: '#fff', border: '1px solid #E8EDF2' }}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold" style={{ color: '#0F172A' }}>الازدحام حسب الساعة</p>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#F0FDFA', color: '#14B8A6' }}>اليوم</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={mockCrowdChartData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <XAxis dataKey="hour" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E8EDF2', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', fontSize: 12 }} />
                <Bar dataKey="empty" name="فارغ" stackId="a" fill="#14B8A6" />
                <Bar dataKey="medium" name="متوسط" stackId="a" fill="#F59E0B" />
                <Bar dataKey="full" name="مزدحم" stackId="a" fill="#EF4444" />
                <Bar dataKey="veryFull" name="مزدحم جداً" stackId="a" fill="#1E293B" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tables row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Recent crowd reports */}
          <div className="rounded-xl overflow-hidden" style={{ background: '#fff', border: '1px solid #E8EDF2' }}>
            <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid #F1F5F9' }}>
              <p className="text-sm font-semibold" style={{ color: '#0F172A' }}>آخر تقارير الازدحام</p>
              <a href="/crowd" className="flex items-center gap-0.5 text-xs font-medium transition-colors" style={{ color: '#14B8A6' }}>
                الكل <ArrowUpRight size={12} />
              </a>
            </div>
            <div className="divide-y" style={{ borderColor: '#F8FAFC' }}>
              {recentReports.map(r => (
                <div key={r.id} className="px-4 py-2.5 flex items-center gap-3">
                  <CrowdBadge level={r.level} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: '#0F172A' }}>{r.placeName}</p>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>{r.userName} {r.gpsVerified ? '· 📍' : ''}</p>
                  </div>
                  <span className="text-xs px-1.5 py-0.5 rounded-md font-medium" style={{
                    background: r.status === 'flagged' ? '#FEF2F2' : r.status === 'expired' ? '#F1F5F9' : '#F0FDF4',
                    color: r.status === 'flagged' ? '#EF4444' : r.status === 'expired' ? '#94A3B8' : '#22C55E',
                  }}>
                    {r.status === 'flagged' ? 'مبلّغ' : r.status === 'expired' ? 'منتهي' : 'نشط'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pending posts */}
          <div className="rounded-xl overflow-hidden" style={{ background: '#fff', border: '1px solid #E8EDF2' }}>
            <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid #F1F5F9' }}>
              <p className="text-sm font-semibold" style={{ color: '#0F172A' }}>منشورات تنتظر المراجعة</p>
              <a href="/feed" className="flex items-center gap-0.5 text-xs font-medium" style={{ color: '#14B8A6' }}>
                الكل <ArrowUpRight size={12} />
              </a>
            </div>
            <div className="divide-y" style={{ borderColor: '#F8FAFC' }}>
              {pendingPosts.length === 0 ? (
                <p className="px-4 py-6 text-sm text-center" style={{ color: '#94A3B8' }}>لا توجد منشورات معلّقة 🎉</p>
              ) : pendingPosts.map(p => (
                <div key={p.id} className="px-4 py-2.5 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.status === 'flagged' ? '#EF4444' : '#F59E0B' }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate" style={{ color: '#0F172A' }}>{p.content}</p>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>{p.userName}</p>
                  </div>
                  <span className="text-xs px-1.5 py-0.5 rounded-md font-medium" style={{
                    background: p.status === 'flagged' ? '#FEF2F2' : '#FFFBEB',
                    color: p.status === 'flagged' ? '#EF4444' : '#F59E0B',
                  }}>
                    {p.status === 'flagged' ? 'مبلّغ' : 'معلّق'}
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
