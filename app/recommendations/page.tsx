'use client';
import { useState } from 'react';
import { Search, CheckCircle, XCircle, Trash2, Star } from 'lucide-react';
import Topbar from '@/components/layout/Topbar';
import { mockRecommendations } from '@/lib/mock-data';

const typeLabels: Record<string, string> = { doctor: '👨‍⚕️ طبيب', pharmacy: '💊 صيدلية', business: '🔧 خدمة', food: '🍽️ مطعم', user: '👤 مستخدم' };

const statusConfig: Record<string, { label: string; color: string }> = {
  approved: { label: 'موافق عليه', color: 'bg-emerald-50 text-emerald-700' },
  pending: { label: 'في الانتظار', color: 'bg-amber-50 text-amber-700' },
  flagged: { label: 'مبلَّغ عنه', color: 'bg-red-50 text-red-700' },
  rejected: { label: 'مرفوض', color: 'bg-gray-100 text-gray-500' },
};

export default function RecommendationsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [recs, setRecs] = useState(mockRecommendations);

  const filtered = recs.filter(r => {
    const matchSearch = r.name.includes(search) || r.author.includes(search);
    const matchFilter = filter === 'all' || r.status === filter;
    return matchSearch && matchFilter;
  });

  const action = (id: string, act: 'approve' | 'reject' | 'delete') => {
    setRecs(prev => act === 'delete'
      ? prev.filter(r => r.id !== id)
      : prev.map(r => r.id === id ? { ...r, status: act === 'approve' ? 'approved' : 'rejected' } : r)
    );
  };

  return (
    <div>
      <Topbar title="إدارة التوصيات" subtitle={`${recs.length} توصية`} />
      <div className="p-6 space-y-4">

        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'إجمالي', value: recs.length, color: 'text-gray-700', bg: 'bg-white' },
            { label: 'في الانتظار', value: recs.filter(r => r.status === 'pending').length, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'مبلَّغ عنها', value: recs.filter(r => r.status === 'flagged').length, color: 'text-red-600', bg: 'bg-red-50' },
            { label: 'موافق عليها', value: recs.filter(r => r.status === 'approved').length, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          ].map(s => (
            <div key={s.label} className={`${s.bg} rounded-xl border border-gray-100 p-4 shadow-sm`}>
              <p className="text-sm text-gray-500">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-60">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="ابحث في التوصيات..." className="w-full pr-9 pl-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300" />
          </div>
          {['all', 'pending', 'approved', 'flagged', 'rejected'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-2 rounded-xl text-sm font-medium border transition-all ${filter === f ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
              {f === 'all' ? 'الكل' : statusConfig[f]?.label ?? f}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-right px-4 py-3 font-semibold text-gray-500">التوصية</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-500">الكاتب</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-500">النوع</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-500">التقييم</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-500">الحالة</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-500">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(r => {
                const sc = statusConfig[r.status];
                return (
                  <tr key={r.id} className={`hover:bg-gray-50 transition-colors ${r.status === 'flagged' ? 'bg-red-50/30' : r.status === 'pending' ? 'bg-amber-50/20' : ''}`}>
                    <td className="px-4 py-3 font-medium text-gray-800">{r.name}</td>
                    <td className="px-4 py-3 text-gray-600">{r.author}</td>
                    <td className="px-4 py-3 text-xs">{typeLabels[r.type] ?? r.type}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Star size={12} className="fill-amber-400 text-amber-400" />
                        <span className="font-semibold text-gray-700">{r.rating}</span>
                        <span className="text-gray-400 text-xs">({r.count})</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className={`text-xs font-semibold px-2 py-1 rounded-full ${sc.color}`}>{sc.label}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {r.status !== 'approved' && <button onClick={() => action(r.id, 'approve')} title="قبول" className="p-1.5 hover:bg-emerald-50 rounded-lg text-emerald-500 transition-colors"><CheckCircle size={14} /></button>}
                        {r.status !== 'rejected' && <button onClick={() => action(r.id, 'reject')} title="رفض" className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors"><XCircle size={14} /></button>}
                        <button onClick={() => action(r.id, 'delete')} title="حذف" className="p-1.5 hover:bg-red-50 rounded-lg text-red-500 transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-12 text-gray-400">لا توجد نتائج</div>}
        </div>
      </div>
    </div>
  );
}
