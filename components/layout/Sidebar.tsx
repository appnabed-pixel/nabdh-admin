'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, MapPin, Users, Radio, Newspaper,
  BarChart3, HelpCircle, Star, AlertTriangle, Bell, Zap,
} from 'lucide-react';

const groups = [
  {
    items: [
      { href: '/dashboard', label: 'الرئيسية', icon: LayoutDashboard },
    ],
  },
  {
    label: 'المحتوى',
    items: [
      { href: '/places',          label: 'الأماكن',         icon: MapPin },
      { href: '/questions',       label: 'الأسئلة',         icon: HelpCircle,  badge: 1 },
      { href: '/recommendations', label: 'التوصيات',        icon: Star,         badge: 2 },
      { href: '/crowd',           label: 'تقارير الازدحام', icon: Radio },
      { href: '/feed',            label: 'المنشورات',       icon: Newspaper,    badge: 2 },
    ],
  },
  {
    label: 'الإشراف',
    items: [
      { href: '/reports', label: 'البلاغات',   icon: AlertTriangle, badge: 4 },
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
    <aside style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: 240,
      height: '100vh',
      background: '#fff',
      borderLeft: '1px solid #E8EDF2',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 30,
      fontFamily: 'Cairo, sans-serif',
      direction: 'rtl',
    }}>

      {/* Logo */}
      <div style={{ padding: '14px 18px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 10, height: 56 }}>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg,#14B8A6,#0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Zap size={16} color="#fff" strokeWidth={2.5} />
        </div>
        <div>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }}>نبض Admin</p>
          <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 1 }}>سطيف</p>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 10px' }}>
        {groups.map((g, gi) => (
          <div key={gi} style={{ marginBottom: 20 }}>
            {g.label && (
              <p style={{ fontSize: 10, fontWeight: 700, color: '#CBD5E1', padding: '0 8px', marginBottom: 4, letterSpacing: '0.05em' }}>
                {g.label}
              </p>
            )}
            {g.items.map(item => {
              const active = path === item.href || (item.href !== '/dashboard' && path.startsWith(item.href));
              const Icon = item.icon;
              const badge = 'badge' in item ? item.badge : undefined;

              return (
                <Link key={item.href} href={item.href} style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 10px',
                    borderRadius: 10,
                    marginBottom: 2,
                    background: active ? '#F0FDFA' : 'transparent',
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                  }}
                    onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#F8FAFC'; }}
                    onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}>

                    {/* Icon — RIGHT in RTL */}
                    <Icon size={15}
                      color={active ? '#14B8A6' : '#94A3B8'}
                      strokeWidth={active ? 2.5 : 2}
                      style={{ flexShrink: 0 }} />

                    {/* Label */}
                    <span style={{ flex: 1, fontSize: 13, fontWeight: active ? 600 : 400, color: active ? '#14B8A6' : '#475569' }}>
                      {item.label}
                    </span>

                    {/* Badge — LEFT in RTL */}
                    {badge ? (
                      <span style={{
                        fontSize: 10, fontWeight: 700,
                        background: '#FEF2F2', color: '#EF4444',
                        padding: '1px 6px', borderRadius: 5, lineHeight: 1.6,
                        flexShrink: 0,
                      }}>
                        {badge}
                      </span>
                    ) : null}
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
