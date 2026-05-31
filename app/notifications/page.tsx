'use client';
import { useState } from 'react';
import { Send, Bell, AlertTriangle, Megaphone, Info, Users, ChevronDown } from 'lucide-react';
import Topbar from '@/components/layout/Topbar';

const notifTypes = [
  { id: 'announcement', label: 'إعلان عام', icon: Megaphone, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 'alert', label: 'تنبيه خدمة', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50' },
  { id: 'maintenance', label: 'صيانة', icon: Info, color: 'text-purple-500', bg: 'bg-purple-50' },
  { id: 'emergency', label: 'طارئ', icon: Bell, color: 'text-red-500', bg: 'bg-red-50' },
];

const sentHistory = [
  { id: 'n1', type: 'announcement', title: 'مرحباً بكم في نبض!', body: 'تطبيق نبض متاح الآن في سطيف', audience: 'all', sentAt: new Date(Date.now() - 2 * 24 * 3600000).toISOString(), recipients: 1840 },
  { id: 'n2', type: 'alert', title: 'بريد الجزائر — ازدحام شديد', body: 'أفاد 12 مستخدم بازدحام شديد في بريد الجزائر المركز', audience: 'all', sentAt: new Date(Date.now() - 3 * 3600000).toISOString(), recipients: 1840 },
  { id: 'n3', type: 'maintenance', title: 'صيانة مؤقتة', body: 'سيتوقف التطبيق للصيانة ليلة الجمعة من 2 إلى 4 صباحاً', audience: 'all', sentAt: new Date(Date.now() - 1 * 24 * 3600000).toISOString(), recipients: 1840 },
];

export default function NotificationsPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [type, setType] = useState('announcement');
  const [audience, setAudience] = useState('all');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    if (!title.trim() || !body.trim()) return;
    setSending(true);
    await new Promise(r => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
    setTitle(''); setBody('');
    setTimeout(() => setSent(false), 3000);
  };

  const selectedType = notifTypes.find(t => t.id === type)!;
  const Icon = selectedType.icon;

  return (
    <div>
      <Topbar title="إدارة الإشعارات" subtitle="أرسل إشعارات لمستخدمي سطيف" />
      <div className="p-6 space-y-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Compose */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
            <h3 className="font-bold text-gray-800 text-base">إنشاء إشعار جديد</h3>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">نوع الإشعار</label>
              <div className="grid grid-cols-2 gap-2">
                {notifTypes.map(t => {
                  const TIcon = t.icon;
                  return (
                    <button key={t.id} onClick={() => setType(t.id)} className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${type === t.id ? 'border-emerald-400 bg-emerald-50 text-emerald-700' : 'border-gray-200 hover:bg-gray-50 text-gray-600'}`}>
                      <TIcon size={16} className={type === t.id ? 'text-emerald-500' : t.color} />
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">المستقبلون</label>
              <div className="relative">
                <select value={audience} onChange={e => setAudience(e.target.value)} className="w-full appearance-none pr-10 pl-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300">
                  <option value="all">جميع المستخدمين (1,840)</option>
                  <option value="active">المستخدمون النشطون اليوم (312)</option>
                  <option value="setif">سكان سطيف المدينة</option>
                  <option value="new">مستخدمون جدد (هذا الشهر)</option>
                </select>
                <ChevronDown size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">عنوان الإشعار *</label>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="مثال: تنبيه — ازدحام في بريد الجزائر" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300" maxLength={80} />
              <p className="text-xs text-gray-400 mt-1">{title.length}/80</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">نص الإشعار *</label>
              <textarea value={body} onChange={e => setBody(e.target.value)} rows={4} placeholder="اكتب نص الإشعار هنا..." className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 resize-none" maxLength={200} />
              <p className="text-xs text-gray-400 mt-1">{body.length}/200</p>
            </div>

            {/* Preview */}
            {(title || body) && (
              <div className={`rounded-xl p-4 border ${selectedType.bg} border-opacity-50`}>
                <p className="text-xs font-bold text-gray-500 mb-2">معاينة</p>
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-white shadow-sm`}><Icon size={16} className={selectedType.color} /></div>
                  <div><p className="text-sm font-bold text-gray-800">{title || 'العنوان'}</p><p className="text-xs text-gray-600 mt-0.5">{body || 'النص'}</p></div>
                </div>
              </div>
            )}

            <button onClick={handleSend} disabled={!title.trim() || !body.trim() || sending}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${!title.trim() || !body.trim() || sending ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : sent ? 'bg-emerald-500 text-white' : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm'}`}>
              {sending ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />جاري الإرسال...</> : sent ? '✓ تم الإرسال بنجاح!' : <><Send size={16} />إرسال الإشعار</>}
            </button>
          </div>

          {/* History */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-800 text-base mb-4">الإشعارات المرسلة</h3>
            <div className="space-y-3">
              {sentHistory.map(n => {
                const nt = notifTypes.find(t => t.id === n.type)!;
                const NIcon = nt.icon;
                return (
                  <div key={n.id} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className={`p-2 rounded-lg ${nt.bg}`}><NIcon size={14} className={nt.color} /></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{n.title}</p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{n.body}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-400">{new Date(n.sentAt).toLocaleDateString('ar')}</span>
                        <span className="flex items-center gap-1 text-xs text-gray-400"><Users size={10} />{n.recipients.toLocaleString('ar')}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
