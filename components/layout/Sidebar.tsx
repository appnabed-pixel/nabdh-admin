'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, MapPin, Users, Radio, Newspaper,
  BarChart3, Settings, LogOut, Antenna
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'الرئيسية', icon: LayoutDashboard },
  { href: '/places', label: 'الأماكن', icon: MapPin },
  { href: '/crowd', label: 'تقارير الازدحام', icon: Radio },
  { href: '/users', label: 'المستخدمون', icon: Users },
  { href: '/feed', label: 'تدقيق المنشورات', icon: Newspaper },
  { href: '/analytics', label: 'الإحصائيات', icon: BarChart3 },
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
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              <Icon className={`w-4.5 h-4.5 ${active ? 'text-emerald-500' : 'text-gray-400'}`} size={18} />
              {item.label}
              {item.href === '/crowd' && (
                <span className="mr-auto bg-red-100 text-red-600 text-xs font-bold px-1.5 py-0.5 rounded-full">5</span>
              )}
              {item.href === '/feed' && (
                <span className="mr-auto bg-orange-100 text-orange-600 text-xs font-bold px-1.5 py-0.5 rounded-full">2</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-gray-100 space-y-1">
        <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-all">
          <Settings size={18} className="text-gray-400" />
          الإعدادات
        </Link>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-all">
          <LogOut size={18} />
          تسجيل الخروج
        </button>
      </div>
    </aside>
  );
}
