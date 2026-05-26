'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend, AreaChart, Area } from 'recharts';
import Topbar from '@/components/layout/Topbar';
import { mockActivityData, mockCrowdChartData, mockPlaces, mockUsers } from '@/lib/mock-data';
import { CROWD_COLORS, CROWD_LABELS, CATEGORY_LABELS } from '@/lib/constants';

const categoryData = Object.entries(
  mockPlaces.reduce((acc, p) => ({ ...acc, [p.category]: (acc[p.category] || 0) + 1 }), {} as Record<string, number>)
).map(([cat, count]) => ({ name: CATEGORY_LABELS[cat] || cat, value: count }));

const crowdDistrib = [
  { name: 'فارغ', value: 28, color: CROWD_COLORS.empty },
  { name: 'متوسط', value: 45, color: CROWD_COLORS.medium },
  { name: 'مزدحم', value: 20, color: CROWD_COLORS.full },
  { name: 'جداً', value: 7, color: CROWD_COLORS.veryFull },
];

export default function AnalyticsPage() {
  return (
    <div>
      <Topbar title="الإحصائيات والتحليلات" subtitle="نظرة تحليلية عميقة على نشاط سطيف" />
      <div className="p-6 space-y-6">

        {/* Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h3 className="text-base font-bold text-gray-800 mb-1">النشاط الأسبوعي</h3>
            <p className="text-xs text-gray-400 mb-4">تقارير الازدحام والمستخدمون النشطون</p>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={mockActivityData}>
                <defs>
                  <linearGradient id="gr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00B894" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#00B894" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gb" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0984E3" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#0984E3" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" iconSize={8} />
                <Area type="monotone" dataKey="reports" name="تقارير" stroke="#00B894" fill="url(#gr)" strokeWidth={2.5} dot={{ r: 4, fill: '#00B894' }} />
                <Area type="monotone" dataKey="users" name="مستخدمون" stroke="#0984E3" fill="url(#gb)" strokeWidth={2.5} dot={{ r: 4, fill: '#0984E3' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h3 className="text-base font-bold text-gray-800 mb-1">توزيع الازدحام اليوم</h3>
            <p className="text-xs text-gray-400 mb-4">نسبة كل مستوى ازدحام</p>
            <div className="flex items-center justify-center gap-8">
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie data={crowdDistrib} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={3}>
                    {crowdDistrib.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(v) => [`${v}%`, 'النسبة']} contentStyle={{ borderRadius: 12, border: 'none' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {crowdDistrib.map(d => (
                  <div key={d.name} className="flex items-center gap-2 text-sm">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                    <span className="text-gray-600">{d.name}</span>
                    <span className="font-bold text-gray-800">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h3 className="text-base font-bold text-gray-800 mb-1">الأماكن حسب الفئة</h3>
            <p className="text-xs text-gray-400 mb-4">توزيع الأماكن المسجّلة</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={categoryData} layout="vertical">
                <XAxis type="number" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#636E72' }} axisLine={false} tickLine={false} width={90} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none' }} />
                <Bar dataKey="value" name="عدد الأماكن" fill="#00B894" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h3 className="text-base font-bold text-gray-800 mb-4">أكثر الأماكن نشاطاً</h3>
            <div className="space-y-3">
              {mockPlaces.slice(0, 5).map((p, i) => (
                <div key={p.id} className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-200 w-6 text-center">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{p.name}</span>
                      <span className="text-xs text-gray-400">{p.reviewCount} تقييم</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full"
                        style={{ width: `${(p.reviewCount / 312) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
