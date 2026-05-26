'use client';
import { useState, useEffect } from 'react';
import { Search, Ban, Shield } from 'lucide-react';
import Topbar from '@/components/layout/Topbar';
import Badge from '@/components/ui/Badge';
import { api } from '@/lib/api';

export default function UsersPage() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.users().then((r: any) => setUsers(r.users || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = users.filter(u => u.name.includes(search) || u.phone.includes(search));

  const toggleBan = async (id: string) => {
    try {
      const r: any = await api.banUser(id);
      setUsers(prev => prev.map(u => u.id === id ? r.user : u));
    } catch (e) { console.error(e); }
  };

  return (
    <div>
      <Topbar title="إدارة المستخدمين" subtitle={`${users.length} مستخدم مسجّل`} />
      <div className="p-6 space-y-4">

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="ابحث بالاسم أو الهاتف..."
              className="w-full pr-9 pl-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs font-semibold">
                <th className="text-right px-5 py-3">المستخدم</th>
                <th className="text-right px-4 py-3">XP / المستوى</th>
                <th className="text-right px-4 py-3">الموثوقية</th>
                <th className="text-right px-4 py-3">المساهمات</th>
                <th className="text-right px-4 py-3">الشارات</th>
                <th className="text-right px-4 py-3">الحالة</th>
                <th className="text-right px-4 py-3">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={7} className="py-12 text-center text-gray-400">جاري التحميل...</td></tr>
              ) : filtered.map(u => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {u.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{u.name}</p>
                        <p className="text-xs text-gray-400">{u.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="font-bold text-emerald-600">{u.xp.toLocaleString('ar')} XP</p>
                    <p className="text-xs text-gray-400">{levelName(u.xp)}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${u.trustScore >= 90 ? 'bg-emerald-500' : u.trustScore >= 60 ? 'bg-yellow-400' : 'bg-red-400'}`}
                          style={{ width: `${u.trustScore}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-gray-600">{u.trustScore}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="font-semibold text-gray-700">{u.contributions}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex gap-1 flex-wrap">
                      {u.badges.slice(0, 2).map((b: string) => (
                        <span key={b} className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full font-medium">{badgeEmoji(b)}</span>
                      ))}
                      {u.badges.length > 2 && <span className="text-xs text-gray-400">+{u.badges.length - 2}</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge label={u.isActive ? 'نشط' : 'موقوف'} variant={u.isActive ? 'green' : 'red'} />
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <button className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="منح شارة">
                        <Shield size={15} />
                      </button>
                      <button
                        onClick={() => toggleBan(u.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          u.isActive ? 'text-gray-400 hover:text-red-500 hover:bg-red-50' : 'text-green-500 hover:bg-green-50'
                        }`}
                        title={u.isActive ? 'إيقاف' : 'تفعيل'}
                      >
                        <Ban size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function levelName(xp: number) {
  if (xp < 100) return 'مبتدئ';
  if (xp < 500) return 'نشط';
  if (xp < 1000) return 'متميز';
  if (xp < 5000) return 'خبير';
  return 'أسطورة';
}

function badgeEmoji(badge: string) {
  const map: Record<string, string> = {
    crowdReporter: '📡 مراقب',
    serviceExpert: '🛠 خبير',
    foodExpert: '🍯 طعام',
    pharmacyHelper: '💊 صيدلية',
    trustedUser: '🏆 موثوق',
  };
  return map[badge] ?? badge;
}
