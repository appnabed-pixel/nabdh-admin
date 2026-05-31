import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color: 'teal' | 'blue' | 'orange' | 'red' | 'purple' | 'green';
  trend?: { value: number; label: string };
}

const colorMap = {
  teal:   { dot: '#14B8A6', light: '#F0FDFA', val: '#0F172A' },
  blue:   { dot: '#3B82F6', light: '#EFF6FF', val: '#0F172A' },
  orange: { dot: '#F59E0B', light: '#FFFBEB', val: '#0F172A' },
  red:    { dot: '#EF4444', light: '#FEF2F2', val: '#0F172A' },
  purple: { dot: '#8B5CF6', light: '#F5F3FF', val: '#0F172A' },
  green:  { dot: '#22C55E', light: '#F0FDF4', val: '#0F172A' },
};

// Keep backward compat
const aliasMap: Record<string, keyof typeof colorMap> = {
  emerald: 'teal',
};

export default function StatCard({ title, value, subtitle, icon: Icon, color, trend }: StatCardProps) {
  const key = (aliasMap[color] ?? color) as keyof typeof colorMap;
  const c = colorMap[key] ?? colorMap.teal;

  return (
    <div className="rounded-xl p-4 transition-shadow hover:shadow-sm" style={{ background: '#fff', border: '1px solid #E8EDF2' }}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-medium truncate" style={{ color: '#64748B' }}>{title}</p>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: c.light }}>
          <Icon size={14} style={{ color: c.dot }} />
        </div>
      </div>
      <p className="text-2xl font-bold" style={{ color: c.val }}>{value}</p>
      {subtitle && <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>{subtitle}</p>}
      {trend && (
        <p className="text-xs mt-1.5 font-medium" style={{ color: trend.value >= 0 ? '#22C55E' : '#EF4444' }}>
          {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}% <span style={{ color: '#94A3B8', fontWeight: 400 }}>{trend.label}</span>
        </p>
      )}
    </div>
  );
}
