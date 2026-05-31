'use client';
import { useState } from 'react';
import { Save, Globe, Shield, Users, Database } from 'lucide-react';
import Topbar from '@/components/layout/Topbar';

export default function SettingsPage() {
  const [appName, setAppName] = useState('نبض');
  const [city, setCity] = useState('سطيف');
  const [contact, setContact] = useState('contact@nabdh.app');
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <Topbar title="إعدادات التطبيق" subtitle="إدارة إعدادات نبض" />
      <div className="p-6 space-y-6 max-w-3xl">

        {/* General */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="p-2 bg-emerald-50 rounded-lg"><Globe size={16} className="text-emerald-500" /></div>
            <h3 className="font-bold text-gray-800">معلومات عامة</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">اسم التطبيق</label>
              <input value={appName} onChange={e => setAppName(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">المدينة الرئيسية</label>
              <input value={city} onChange={e => setCity(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">بريد التواصل</label>
              <input value={contact} onChange={e => setContact(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300" />
            </div>
          </div>
        </div>

        {/* Roles */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="p-2 bg-blue-50 rounded-lg"><Shield size={16} className="text-blue-500" /></div>
            <h3 className="font-bold text-gray-800">صلاحيات الأدوار</h3>
          </div>
          <div className="space-y-3">
            {[
              { role: 'Super Admin', color: 'bg-red-50 text-red-700', perms: ['كل الصلاحيات', 'حذف المشرفين', 'إعدادات النظام'] },
              { role: 'Admin', color: 'bg-amber-50 text-amber-700', perms: ['إدارة المحتوى', 'إدارة المستخدمين', 'الإشعارات'] },
              { role: 'Moderator', color: 'bg-blue-50 text-blue-700', perms: ['مراجعة البلاغات', 'إخفاء المحتوى', 'التحقق'] },
            ].map(r => (
              <div key={r.role} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${r.color} min-w-fit`}>{r.role}</span>
                <div className="flex gap-2 flex-wrap">
                  {r.perms.map(p => <span key={p} className="text-xs text-gray-600 bg-white border border-gray-200 px-2 py-1 rounded-lg">{p}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Future */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="p-2 bg-purple-50 rounded-lg"><Database size={16} className="text-purple-500" /></div>
            <h3 className="font-bold text-gray-800">مزايا المستقبل</h3>
          </div>
          <div className="space-y-3">
            {[
              { label: 'دعم متعدد المدن', desc: 'توسيع نبض لمدن جزائرية أخرى', status: 'قريباً' },
              { label: 'صفحات موثّقة', desc: 'صفحات رسمية للمستشفيات والبنوك', status: 'قريباً' },
              { label: 'حسابات Premium', desc: 'مزايا إضافية للمستخدمين المدفوعين', status: 'مخطط' },
              { label: 'تحليلات متقدمة', desc: 'لوحة بيانات تفصيلية للمدينة', status: 'مخطط' },
            ].map(f => (
              <div key={f.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm font-semibold text-gray-700">{f.label}</p>
                  <p className="text-xs text-gray-400">{f.desc}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${f.status === 'قريباً' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>{f.status}</span>
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleSave} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${saved ? 'bg-emerald-500 text-white' : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm'}`}>
          <Save size={16} />
          {saved ? '✓ تم الحفظ!' : 'حفظ الإعدادات'}
        </button>
      </div>
    </div>
  );
}
