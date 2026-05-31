'use client';
import { Bell, Search, ChevronDown } from 'lucide-react';

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  return (
    <header className="sticky top-0 z-10 px-6 flex items-center gap-4" style={{ background: '#F8FAFC', borderBottom: '1px solid #E8EDF2', height: 56, minHeight: 56 }}>

      {/* Title */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <h1 className="text-sm font-bold truncate" style={{ color: '#0F172A' }}>{title}</h1>
          {subtitle && <span className="text-xs hidden sm:block" style={{ color: '#94A3B8' }}>{subtitle}</span>}
        </div>
      </div>

      {/* Search */}
      <div className="relative hidden md:block" style={{ width: 240 }}>
        <Search size={13} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
        <input
          placeholder="بحث..."
          className="w-full text-sm rounded-lg pr-8 pl-3 py-1.5 outline-none transition-all"
          style={{
            background: '#fff',
            border: '1px solid #E8EDF2',
            color: '#0F172A',
            fontFamily: 'inherit',
          }}
          onFocus={e => e.target.style.borderColor = '#14B8A6'}
          onBlur={e => e.target.style.borderColor = '#E8EDF2'}
        />
      </div>

      {/* Live dot */}
      <div className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: '#F0FDF4', color: '#16A34A' }}>
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#22C55E' }}></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: '#22C55E' }}></span>
        </span>
        مباشر
      </div>

      {/* Bell */}
      <button className="relative p-1.5 rounded-lg transition-colors hover:bg-white" style={{ color: '#94A3B8' }}>
        <Bell size={16} />
        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full" style={{ background: '#EF4444' }}></span>
      </button>

      {/* Profile */}
      <button className="flex items-center gap-2 px-2 py-1 rounded-lg transition-colors hover:bg-white">
        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #14B8A6, #0EA5E9)' }}>A</div>
        <ChevronDown size={12} style={{ color: '#94A3B8' }} />
      </button>
    </header>
  );
}
