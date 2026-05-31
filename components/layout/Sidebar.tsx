'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, MapPin, Users, Radio, Newspaper,
  BarChart3, Settings, LogOut, Antenna, HelpCircle,
  Star, AlertTriangle, Bell, Shield
} from 'lucide-react';

const navGroups = [
  {
    label: 'عام',
    items: [
      { href: '/dashboard', label: 'الرئيسية', icon: LayoutDashboard },
    ],
  },
  {
    label: 'إدارة المحتوى',
    items: [
      { href: '/places', label: 'الأماكن', icon: MapPin },
      { href: '/questions', label: 'الأسئلة', icon: HelpCircle, badge: 1 },
      { href: '/recommendations', label: 'التوصيات', icon: Star, badge: 2 },
      { href: '/crowd', label: 'تقارير الازدحام', icon: Radio, badge: 3 },
      { href: '/feed', label: 'تدقيق المنشورات', icon: Newspaper, badge: 2 },
    ],
  },
  {
    label: 'الإشراف',
    items: [
      { href: '/reports', label: 'مركز البلاغات', icon: AlertTriangle, badge: 4 },
      { href: '/users', label: 'المستخدمون', icon: Users },
    ],
  },
  {
    label: 'النظام',
    items: [
      { href: '/notifications', label: 'الإشعارات', icon: Bell },
      { href: '/analytics', label: 'الإحصائيات', icon: BarChart3 },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-l border-gray-100 flex flex-col h-screen sticky top-0 shadow-sm">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
            <Antenna className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-800">نبض</p>
            <p className="text-xs text-gray-400">لوحة التحكم — سطيف</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-4">
        {navGroups.map(group => (
          <div key={group.label}>
            <p className="text-xs font-semibold text-gray-400 px-3 mb-1 uppercase tracking-wider">{group.label}</p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      active ? 'bg-emerald-50 text-emerald-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? 'text-emerald-500' : 'text-gray-400'}`} size={17} />
                    <span className="flex-1">{item.label}</span>
                    {'badge' in item && item.badge ? (
                      <span className="bg-red-100 text-red-600 text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">{item.badge}</span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-gray-100 space-y-0.5">
        <Link href="/settings" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${pathname.startsWith('/settings') ? 'bg-emerald-50 text-emerald-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}>
          <Settings size={17} className={pathname.startsWith('/settings') ? 'text-emerald-500' : 'text-gray-400'} />
          الإعدادات
        </Link>
        <div className="px-3 py-2 flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-600">A</div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-700 truncate">المشرف</p>
            <p className="text-xs text-gray-400">Super Admin</p>
          </div>
        </div>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-all font-medium">
          <LogOut size={17} />
          تسجيل الخروج
        </button>
      </div>
    </aside>
  );
}
