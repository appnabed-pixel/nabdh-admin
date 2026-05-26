'use client';
import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, MapPin, Clock } from 'lucide-react';
import Topbar from '@/components/layout/Topbar';
import CrowdBadge from '@/components/ui/CrowdBadge';
import { api } from '@/lib/api';

type Status = 'all' | 'active' | 'flagged' | 'expired';

function timeAgo(iso: string) {
  const diff = (Date.now() - new Date(iso).getTime()) / 60000;
  if (diff < 60) return `منذ ${Math.floor(diff)} دقيقة`;
  if (diff < 1440) return `منذ ${Math.floor(diff / 60)} ساعة`;
  return `منذ ${Math.floor(diff / 1440)} يوم`;
}

export default function CrowdPage() {
  const [filter, setFilter] = useState<Status>('all');
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.crowd().then((r: any) => setReports(r.reports || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const filtered = reports.filter(r => filter === 'all' || r.status === filter);

  const approve = async (id: string) => {
    try {
      const r: any = await api.approveCrowd(id);
      setReports(prev => prev.map(x => x.id === id ? r.report : x));
    } catch (e) { console.error(e); }
  };

  const remove = async (id: string) => {
    try {
      await api.deleteCrowd(id);
      setReports(prev => prev.filter(r => r.id !== id));
    } catch (e) { console.error(e); }
  };

  const counts = {
    all: reports.length,
    active: reports.filter(r => r.status === 'active').length,
    flagged: reports.filter(r => r.status === 'flagged').length,
    expired: reports.filter(r => r.status === 'expired').length,
  };

  const tabs: { key: Status; label: string }[] = [
    { key: 'all', label: 'الكل' },
    { key: 'active', label: 'نشط' },
    { key: 'flagged', label: 'مبلّغ عنه' },
    { key: 'expired', label: 'منتهي الصلاحية' },
  ];

  return (
    <div>
      <Topbar title="تقارير الازدحام" subtitle="مراجعة وإدارة تقارير الازدحام المجتمعية" />
      <div className="p-6 space-y-4">

        <div className="flex gap-2 bg-white p-1 rounded-xl border border-gray-100 w-fit">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === t.key ? 'bg-emerald-500 text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {t.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                filter === t.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                {counts[t.key]}
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {loading ? (
            <div className="col-span-3 py-16 text-center text-gray-400">جاري التحميل...</div>
          ) : filtered.map(r => (
            <div key={r.id} className={`bg-white rounded-2xl border shadow-sm p-5 space-y-3 ${
              r.status === 'flagged' ? 'border-red-200' : r.status === 'expired' ? 'border-gray-100 opacity-70' : 'border-gray-100'
            }`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-gray-800">{r.placeName}</p>
                  <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                    <Clock size={11} />
                    {timeAgo(r.createdAt)}
                  </p>
                </div>
                <CrowdBadge level={r.level} />
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="flex items-center gap-1">👤 {r.userName}</span>
                {r.gpsVerified && (
                  <span className="flex items-center gap-1 text-emerald-600 text-xs font-medium">
                    <MapPin size={12} /> GPS محقّق
                  </span>
                )}
              </div>

              {r.waitingMinutes > 0 && (
                <p className="text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
                  ⏳ وقت الانتظار: حوالي {r.waitingMinutes} دقيقة
                </p>
              )}

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-gray-400">👍 {r.upvotes}</span>
                <div className="flex gap-2">
                  {r.status === 'flagged' && (
                    <button
                      onClick={() => approve(r.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 text-xs font-semibold rounded-lg transition-colors"
                    >
                      <CheckCircle size={13} /> قبول
                    </button>
                  )}
                  <button
                    onClick={() => remove(r.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-500 text-xs font-semibold rounded-lg transition-colors"
                  >
                    <XCircle size={13} /> حذف
                  </button>
                </div>
              </div>
            </div>
          ))}

          {!loading && filtered.length === 0 && (
            <div className="col-span-3 py-16 text-center text-gray-400">
              <p className="text-4xl mb-3">📭</p>
              <p className="font-medium">لا توجد تقارير</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
