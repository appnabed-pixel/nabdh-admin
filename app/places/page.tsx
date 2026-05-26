'use client';
import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Eye, ToggleLeft, ToggleRight } from 'lucide-react';
import Topbar from '@/components/layout/Topbar';
import Badge from '@/components/ui/Badge';
import CrowdBadge from '@/components/ui/CrowdBadge';
import { CATEGORY_LABELS } from '@/lib/constants';
import { api } from '@/lib/api';

export default function PlacesPage() {
  const [search, setSearch] = useState('');
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.places().then((r: any) => setPlaces(r.places || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = places.filter(p =>
    p.name.includes(search) || p.address.includes(search) || (CATEGORY_LABELS[p.category] || '').includes(search)
  );

  const toggleActive = async (id: string) => {
    try {
      const r: any = await api.togglePlace(id);
      setPlaces(prev => prev.map(p => p.id === id ? r.place : p));
    } catch (e) { console.error(e); }
  };

  const deletePlace = async (id: string) => {
    if (!confirm('حذف هذا المكان؟')) return;
    try {
      await api.deletePlace(id);
      setPlaces(prev => prev.filter(p => p.id !== id));
    } catch (e) { console.error(e); }
  };

  return (
    <div>
      <Topbar title="إدارة الأماكن" subtitle={`${places.length} مكان مسجّل في سطيف`} />
      <div className="p-6 space-y-4">

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="ابحث عن مكان..."
              className="w-full pr-9 pl-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
            />
          </div>
          <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors">
            <Plus size={16} />
            إضافة مكان
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs font-semibold">
                <th className="text-right px-5 py-3">الاسم</th>
                <th className="text-right px-4 py-3">الفئة</th>
                <th className="text-right px-4 py-3">التقييم</th>
                <th className="text-right px-4 py-3">الموثوقية</th>
                <th className="text-right px-4 py-3">الازدحام الحالي</th>
                <th className="text-right px-4 py-3">الحالة</th>
                <th className="text-right px-4 py-3">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={7} className="py-12 text-center text-gray-400">جاري التحميل...</td></tr>
              ) : filtered.map(place => (
                <tr key={place.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div>
                      <p className="font-semibold text-gray-800">{place.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{place.address}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-sm">{CATEGORY_LABELS[place.category] || place.category}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="font-semibold text-gray-700">{place.rating}</span>
                      <span className="text-gray-400">({place.reviewCount})</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${place.trustScore >= 90 ? 'bg-emerald-500' : place.trustScore >= 70 ? 'bg-yellow-400' : 'bg-red-400'}`}
                          style={{ width: `${place.trustScore}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-gray-600">{place.trustScore}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <CrowdBadge level={place.crowdLevel} />
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge label={place.isActive ? 'نشط' : 'معطّل'} variant={place.isActive ? 'green' : 'gray'} />
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <button className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye size={15} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors">
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => toggleActive(place.id)}
                        className="p-1.5 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                      >
                        {place.isActive ? <ToggleRight size={15} /> : <ToggleLeft size={15} />}
                      </button>
                      <button
                        onClick={() => deletePlace(place.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && filtered.length === 0 && (
            <div className="py-12 text-center text-gray-400">
              <p className="text-2xl mb-2">🔍</p>
              <p>لا توجد نتائج لـ &quot;{search}&quot;</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
