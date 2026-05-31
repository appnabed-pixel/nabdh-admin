'use client';
import { useState } from 'react';
import { Search, Trash2, EyeOff, Pin, Flag, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import Topbar from '@/components/layout/Topbar';
import { mockQuestions } from '@/lib/mock-data';

const categoryLabels: Record<string, string> = { health: '🏥 صحة', food: '🍽️ أكل', services: '🔧 خدمات', general: '💡 عام', education: '📚 تعليم' };

const statusConfig: Record<string, { label: string; color: string }> = {
  answered: { label: 'مجاب عليه', color: 'bg-emerald-50 text-emerald-700' },
  open: { label: 'مفتوح', color: 'bg-blue-50 text-blue-700' },
  flagged: { label: 'مبلَّغ عنه', color: 'bg-red-50 text-red-700' },
  hidden: { label: 'مخفي', color: 'bg-gray-100 text-gray-500' },
};

export default function QuestionsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [questions, setQuestions] = useState(mockQuestions);

  const filtered = questions.filter(q => {
    const matchSearch = q.title.includes(search) || q.author.includes(search);
    const matchFilter = filter === 'all' || q.status === filter;
    return matchSearch && matchFilter;
  });

  const action = (id: string, act: string) => {
    setQuestions(prev => prev.map(q => q.id === id ? {
      ...q,
      status: act === 'hide' ? 'hidden' : act === 'flag' ? 'flagged' : act === 'resolve' ? 'answered' : q.status
    } : q).filter(q => act === 'delete' ? q.id !== id : true));
  };

  return (
    <div>
      <Topbar title="إدارة الأسئلة" subtitle={`${questions.length} سؤال إجمالي`} />
      <div className="p-6 space-y-4">

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'إجمالي', value: questions.length, color: 'text-gray-700', bg: 'bg-white' },
            { label: 'مبلّغ عنها', value: questions.filter(q => q.status === 'flagged').length, color: 'text-red-600', bg: 'bg-red-50' },
            { label: 'مفتوحة', value: questions.filter(q => q.status === 'open').length, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'مجاب عليها', value: questions.filter(q => q.status === 'answered').length, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          ].map(s => (
            <div key={s.label} className={`${s.bg} rounded-xl border border-gray-100 p-4 shadow-sm`}>
              <p className="text-sm text-gray-500">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters + Search */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-60">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="ابحث في الأسئلة..." className="w-full pr-9 pl-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300" />
          </div>
          {['all', 'flagged', 'open', 'answered', 'hidden'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-2 rounded-xl text-sm font-medium transition-all border ${filter === f ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
              {f === 'all' ? 'الكل' : statusConfig[f]?.label ?? f}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-right px-4 py-3 font-semibold text-gray-500">السؤال</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-500">الكاتب</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-500">التصنيف</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-500">إجابات</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-500">الحالة</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-500">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(q => {
                const sc = statusConfig[q.status] ?? statusConfig.open;
                return (
                  <tr key={q.id} className={`hover:bg-gray-50 transition-colors ${q.status === 'flagged' ? 'bg-red-50/30' : ''}`}>
                    <td className="px-4 py-3 max-w-xs">
                      <p className="font-medium text-gray-800 truncate">{q.title}</p>
                      <p className="text-xs text-gray-400">{new Date(q.createdAt).toLocaleString('ar')}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{q.author}</td>
                    <td className="px-4 py-3"><span className="text-xs">{categoryLabels[q.category] ?? q.category}</span></td>
                    <td className="px-4 py-3 text-center"><span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs font-semibold">{q.answers}</span></td>
                    <td className="px-4 py-3"><span className={`text-xs font-semibold px-2 py-1 rounded-full ${sc.color}`}>{sc.label}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => action(q.id, 'pin')} title="تثبيت" className="p-1.5 hover:bg-amber-50 rounded-lg text-amber-500 transition-colors"><Pin size={14} /></button>
                        <button onClick={() => action(q.id, 'hide')} title="إخفاء" className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors"><EyeOff size={14} /></button>
                        <button onClick={() => action(q.id, 'resolve')} title="وضع كمجاب" className="p-1.5 hover:bg-emerald-50 rounded-lg text-emerald-500 transition-colors"><CheckCircle size={14} /></button>
                        <button onClick={() => action(q.id, 'delete')} title="حذف" className="p-1.5 hover:bg-red-50 rounded-lg text-red-500 transition-colors"><Trash2 size={14} /></button>
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
