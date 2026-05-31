'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, MapPin, Users, Radio, Newspaper,
  BarChart3, HelpCircle, Star, AlertTriangle, Bell, Zap,
} from 'lucide-react';

const groups = [
  {
    items: [{ href: '/dashboard', label: 'الرئيسية', icon: LayoutDashboard }],
  },
  {
    label: 'المحتوى',
    items: [
      { href: '/places',          label: 'الأماكن',          icon: MapPin },
      { href: '/questions',       label: 'الأسئلة',          icon: HelpCircle,     badge: 1 },
      { href: '/recommendations', label: 'التوصيات',         icon: Star,            badge: 2 },
      { href: '/crowd',           label: 'تقارير الازدحام',  icon: Radio },
      { href: '/feed',            label: 'المنشورات',        icon: Newspaper,       badge: 2 },
    ],
  },
  {
    label: 'الإشراف',
    items: [
      { href: '/reports', label: 'البلاغات', icon: AlertTriangle, badge: 4 },
      { href: '/users',   label: 'المستخدمون', icon: Users },
    ],
  },
  {
    label: 'النظام',
    items: [
      { href: '/notifications', label: 'الإشعارات',  icon: Bell },
      { href: '/analytics',     label: 'الإحصائيات', icon: BarChart3 },
    ],
  },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside style={{ width: 240, minWidth: 240, background: '#fff', borderLeft: '1px solid #E8EDF2' }}
      className="flex flex-col h-screen sticky top-0">

      {/* Logo */}
      <div className="px-5 py-4 flex items-center gap-2.5" style={{ borderBottom: '1px solid #F1F5F9', height: 56, minHeight: 56 }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg,#14B8A6,#0EA5E9)' }}>
          <Zap size={16} className="text-white" strokeWidth={2.5} />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold truncate" style={{ color: '#0F172A', lineHeight: 1.2 }}>نبض Admin</p>
          <p className="text-xs truncate" style={{ color: '#94A3B8' }}>سطيف</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-5">
        {groups.map((g, gi) => (
          <div key={gi}>
            {g.label && (
              <p className="text-xs font-semibold px-2 mb-1" style={{ color: '#94A3B8', letterSpacing: '0.04em' }}>
                {g.label}
              </p>
            )}
            <div className="space-y-0.5">
              {g.items.map(item => {
                const active = path === item.href || (item.href !== '/dashboard' && path.startsWith(item.href));
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors"
                    style={{
                      background: active ? '#F0FDFA' : 'transparent',
                      color: active ? '#14B8A6' : '#475569',
                      fontWeight: active ? 600 : 400,
                    }}>
                    <Icon size={15} strokeWidth={active ? 2.5 : 2}
                      style={{ color: active ? '#14B8A6' : '#94A3B8', flexShrink: 0 }} />
                    <span className="flex-1 truncate">{item.label}</span>
                    {'badge' in item && item.badge ? (
                      <span className="text-xs font-bold px-1.5 min-w-[18px] text-center rounded-md"
                        style={{ background: '#FEF2F2', color: '#EF4444' }}>{item.badge}</span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
