'use client';
import { useState } from 'react';
import { CheckCircle, XCircle, Trash2, AlertTriangle, MessageSquare, HelpCircle, Star, User } from 'lucide-react';
import Topbar from '@/components/layout/Topbar';
import { mockReports } from '@/lib/mock-data';

const reasonLabels: Record<string, { label: string; color: string }> = {
  spam: { label: 'إعلان مزعج', color: 'bg-orange-50 text-orange-700' },
  misinformation: { label: 'معلومات كاذبة', color: 'bg-red-50 text-red-700' },
  offensive: { label: 'محتوى مسيء', color: 'bg-purple-50 text-purple-700' },
  duplicate: { label: 'مكرر', color: 'bg-gray-100 text-gray-600' },
};

const typeIcons: Record<string, React.ReactNode> = {
  question: <HelpCircle size={14} className="text-blue-500" />,
  answer: <MessageSquare size={14} className="text-emerald-500" />,
  recommendation: <Star size={14} className="text-amber-500" />,
  user: <User size={14} className="text-purple-500" />,
};

export default function ReportsPage() {
  const [reports, setReports] = useState(mockReports);
  const [filter, setFilter] = useState('all');

  const filtered = reports.filter(r => filter === 'all' || r.status === filter || r.type === filter);

  const action = (id: string, act: 'approve' | 'reject' | 'delete') => {
    setReports(prev => act === 'delete'
      ? prev.filter(r => r.id !== id)
      : prev.map(r => r.id === id ? { ...r, status: act === 'approve' ? 'resolved' : 'dismissed' } : r)
    );
  };

  return (
    <div>
      <Topbar title="مركز البلاغات" subtitle="مراجعة المحتوى المبلَّغ عنه" />
      <div className="p-6 space-y-4">

        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'إجمالي البلاغات', value: reports.length, color: 'text-gray-700', bg: 'bg-white' },
            { label: 'في الانتظار', value: reports.filter(r => r.status === 'pending').length, color: 'text-red-600', bg: 'bg-red-50' },
            { label: 'تم الحل', value: reports.filter(r => r.status === 'resolved').length, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'مرفوضة', value: reports.filter(r => r.status === 'dismissed').length, color: 'text-gray-500', bg: 'bg-gray-50' },
          ].map(s => (
            <div key={s.label} className={`${s.bg} rounded-xl border border-gray-100 p-4 shadow-sm`}>
              <p className="text-sm text-gray-500">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {['all', 'pending', 'resolved', 'question', 'answer', 'recommendation', 'user'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${filter === f ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
              {f === 'all' ? 'الكل' : f === 'pending' ? 'في الانتظار' : f === 'resolved' ? 'محلول' : f === 'question' ? 'سؤال' : f === 'answer' ? 'إجابة' : f === 'recommendation' ? 'توصية' : 'مستخدم'}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map(r => {
            const reason = reasonLabels[r.reason] ?? { label: r.reason, color: 'bg-gray-100 text-gray-600' };
            const isPending = r.status === 'pending';
            return (
              <div key={r.id} className={`bg-white rounded-xl border shadow-sm p-4 ${isPending ? 'border-red-200' : 'border-gray-100'}`}>
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${isPending ? 'bg-red-50' : 'bg-gray-50'}`}>
                    <AlertTriangle size={16} className={isPending ? 'text-red-500' : 'text-gray-400'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <div className="flex items-center gap-1">{typeIcons[r.type]}<span className="text-xs font-semibold text-gray-600">{r.type === 'question' ? 'سؤال' : r.type === 'answer' ? 'إجابة' : r.type === 'recommendation' ? 'توصية' : 'مستخدم'}</span></div>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${reason.color}`}>{reason.label}</span>
                      {!isPending && <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">{r.status === 'resolved' ? 'محلول' : 'مرفوض'}</span>}
                    </div>
                    <p className="text-sm text-gray-800 font-medium mb-1">{r.content}</p>
                    <p className="text-xs text-gray-400">بلّغ عنه: <span className="text-gray-600">{r.reportedBy}</span> • {new Date(r.createdAt).toLocaleString('ar')}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {isPending && <>
                      <button onClick={() => action(r.id, 'approve')} className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-xs font-medium hover:bg-emerald-600 transition-colors">
                        <CheckCircle size={12} /> قبول
                      </button>
                      <button onClick={() => action(r.id, 'reject')} className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors">
                        <XCircle size={12} /> تجاهل
                      </button>
                    </>}
                    <button onClick={() => action(r.id, 'delete')} className="p-1.5 hover:bg-red-50 rounded-lg text-red-400 transition-colors"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && <div className="text-center py-16 text-gray-400 bg-white rounded-2xl border border-gray-100"><CheckCircle className="w-10 h-10 mx-auto mb-3 text-emerald-300" /><p>لا توجد بلاغات</p></div>}
        </div>
      </div>
    </div>
  );
}
