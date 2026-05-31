'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, MapPin, Users, Radio, Newspaper,
  BarChart3, Settings, LogOut, HelpCircle,
  Star, AlertTriangle, Bell, Zap
} from 'lucide-react';

const navGroups = [
  {
    items: [
      { href: '/dashboard', label: 'الرئيسية', icon: LayoutDashboard },
    ],
  },
  {
    label: 'المحتوى',
    items: [
      { href: '/places', label: 'الأماكن', icon: MapPin },
      { href: '/questions', label: 'الأسئلة', icon: HelpCircle, badge: 1 },
      { href: '/recommendations', label: 'التوصيات', icon: Star, badge: 2 },
      { href: '/crowd', label: 'تقارير الازدحام', icon: Radio },
      { href: '/feed', label: 'المنشورات', icon: Newspaper, badge: 2 },
    ],
  },
  {
    label: 'الإشراف',
    items: [
      { href: '/reports', label: 'البلاغات', icon: AlertTriangle, badge: 4 },
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
    <aside style={{ width: 256, minWidth: 256, borderLeft: '1px solid #E8EDF2', background: '#fff' }} className="flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 py-4" style={{ borderBottom: '1px solid #E8EDF2' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #14B8A6, #0EA5E9)' }}>
            <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-sm font-bold" style={{ color: '#0F172A' }}>نبض</p>
            <p className="text-xs" style={{ color: '#94A3B8' }}>سطيف • Admin</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 overflow-y-auto">
        {navGroups.map((group, gi) => (
          <div key={gi} className={gi > 0 ? 'mt-5' : ''}>
            {group.label && (
              <p className="text-xs font-semibold px-2 mb-1.5" style={{ color: '#94A3B8', letterSpacing: '0.05em' }}>
                {group.label}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map(item => {
                const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all"
                    style={{
                      background: active ? '#F0FDFA' : 'transparent',
                      color: active ? '#14B8A6' : '#475569',
                      fontWeight: active ? 600 : 400,
                    }}
                    onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#F8FAFC'; }}
                    onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <Icon size={15} strokeWidth={active ? 2.5 : 2} style={{ color: active ? '#14B8A6' : '#94A3B8', flexShrink: 0 }} />
                    <span className="flex-1">{item.label}</span>
                    {'badge' in item && item.badge ? (
                      <span className="text-xs font-bold px-1.5 py-0.5 rounded-md min-w-[18px] text-center" style={{ background: '#FEF2F2', color: '#EF4444' }}>
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-3" style={{ borderTop: '1px solid #E8EDF2' }}>
        <Link href="/settings"
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all"
          style={{ color: pathname.startsWith('/settings') ? '#14B8A6' : '#475569' }}
        >
          <Settings size={15} style={{ color: pathname.startsWith('/settings') ? '#14B8A6' : '#94A3B8' }} />
          الإعدادات
        </Link>
        <div className="flex items-center gap-2.5 px-2.5 py-2 mt-1">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #14B8A6, #0EA5E9)' }}>A</div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold truncate" style={{ color: '#0F172A' }}>المشرف</p>
            <p className="text-xs" style={{ color: '#94A3B8' }}>Super Admin</p>
          </div>
          <button className="p-1 rounded-md transition-colors hover:bg-red-50 text-red-400">
            <LogOut size={13} />
          </button>
        </div>
      </div>
    </aside>
  );
}
