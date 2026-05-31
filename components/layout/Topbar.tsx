'use client';
import { useState, useRef, useEffect } from 'react';
import { Bell, Search, ChevronDown, Settings, LogOut, User, Moon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TopbarProps { title: string; subtitle?: string; }

const searchIndex = [
  { label: 'بريد الجزائر', href: '/places', type: 'مكان' },
  { label: 'المستشفى الجامعي', href: '/places', type: 'مكان' },
  { label: 'فريدة حمداوي', href: '/users', type: 'مستخدم' },
  { label: 'أفضل طبيب أعصاب في سطيف؟', href: '/questions', type: 'سؤال' },
  { label: 'توصية الحاج مسعود — عسل', href: '/recommendations', type: 'توصية' },
  { label: 'بلاغ على محتوى مشبوه', href: '/reports', type: 'بلاغ' },
];

export default function Topbar({ title, subtitle }: TopbarProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const results = search.length > 1
    ? searchIndex.filter(i => i.label.includes(search) || i.type.includes(search)).slice(0, 5)
    : [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  }

  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 px-5"
      style={{ height: 56, minHeight: 56, background: '#fff', borderBottom: '1px solid #E8EDF2' }}>

      {/* Title */}
      <div className="flex-1 min-w-0 hidden sm:block">
        <p className="text-sm font-bold truncate" style={{ color: '#0F172A' }}>{title}</p>
        {subtitle && <p className="text-xs truncate" style={{ color: '#94A3B8' }}>{subtitle}</p>}
      </div>

      {/* Global search */}
      <div className="relative" style={{ width: 260 }}>
        <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#94A3B8' }} />
        <input
          value={search}
          onChange={e => { setSearch(e.target.value); setSearchOpen(true); }}
          onFocus={() => setSearchOpen(true)}
          onBlur={() => setTimeout(() => setSearchOpen(false), 150)}
          placeholder="بحث سريع..."
          className="w-full text-sm rounded-lg py-1.5 pr-8 pl-8 outline-none transition-all"
          style={{ background: '#F8FAFC', border: '1px solid #E8EDF2', color: '#0F172A' }}
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }}>
            <X size={13} />
          </button>
        )}
        {searchOpen && results.length > 0 && (
          <div className="absolute top-full mt-1 right-0 w-full rounded-xl overflow-hidden fade-in"
            style={{ background: '#fff', border: '1px solid #E8EDF2', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 50 }}>
            {results.map((r, i) => (
              <button key={i} onClick={() => { router.push(r.href); setSearch(''); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-right transition-colors hover:bg-gray-50">
                <span className="flex-1 text-sm truncate" style={{ color: '#0F172A' }}>{r.label}</span>
                <span className="text-xs px-1.5 py-0.5 rounded-md flex-shrink-0"
                  style={{ background: '#F0FDFA', color: '#14B8A6' }}>{r.type}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Live */}
      <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0"
        style={{ background: '#F0FDF4', color: '#16A34A' }}>
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#22C55E' }} />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: '#22C55E' }} />
        </span>
        مباشر
      </div>

      {/* Bell */}
      <button className="relative p-1.5 rounded-lg flex-shrink-0 transition-colors hover:bg-gray-50" style={{ color: '#94A3B8' }}>
        <Bell size={17} />
        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full" style={{ background: '#EF4444' }} />
      </button>

      {/* Profile dropdown */}
      <div className="relative flex-shrink-0" ref={dropRef}>
        <button onClick={() => setDropdownOpen(v => !v)}
          className="flex items-center gap-2 px-2 py-1 rounded-lg transition-colors hover:bg-gray-50">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ background: 'linear-gradient(135deg,#14B8A6,#0EA5E9)' }}>A</div>
          <span className="text-sm font-medium hidden md:block" style={{ color: '#0F172A' }}>Admin</span>
          <ChevronDown size={13} style={{ color: '#94A3B8' }} />
        </button>

        {dropdownOpen && (
          <div className="absolute top-full mt-2 left-0 w-52 rounded-xl overflow-hidden fade-in"
            style={{ background: '#fff', border: '1px solid #E8EDF2', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 50 }}>
            <div className="px-4 py-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
              <p className="text-sm font-semibold" style={{ color: '#0F172A' }}>المشرف</p>
              <p className="text-xs" style={{ color: '#94A3B8' }}>admin@nabdh.app</p>
            </div>
            {[
              { icon: User, label: 'الملف الشخصي', href: '/profile' },
              { icon: Settings, label: 'الإعدادات', href: '/settings' },
              { icon: Bell, label: 'الإشعارات', href: '/notifications' },
              { icon: Moon, label: 'الوضع الداكن', href: '#' },
            ].map(item => {
              const Icon = item.icon;
              return (
                <button key={item.label} onClick={() => { router.push(item.href); setDropdownOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-gray-50" style={{ color: '#475569' }}>
                  <Icon size={15} style={{ color: '#94A3B8' }} />
                  {item.label}
                </button>
              );
            })}
            <div style={{ borderTop: '1px solid #F1F5F9' }}>
              <button onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-red-50" style={{ color: '#EF4444' }}>
                <LogOut size={15} />
                تسجيل الخروج
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
