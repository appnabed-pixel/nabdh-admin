import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color: 'teal' | 'blue' | 'orange' | 'red' | 'purple' | 'green' | 'emerald';
  trend?: { value: number; label: string };
}

const colors: Record<string, { icon: string; bg: string; val: string }> = {
  teal:    { icon: '#14B8A6', bg: '#F0FDFA', val: '#0F172A' },
  emerald: { icon: '#14B8A6', bg: '#F0FDFA', val: '#0F172A' },
  blue:    { icon: '#3B82F6', bg: '#EFF6FF', val: '#0F172A' },
  orange:  { icon: '#F59E0B', bg: '#FFFBEB', val: '#0F172A' },
  red:     { icon: '#EF4444', bg: '#FEF2F2', val: '#0F172A' },
  purple:  { icon: '#8B5CF6', bg: '#F5F3FF', val: '#0F172A' },
  green:   { icon: '#22C55E', bg: '#F0FDF4', val: '#0F172A' },
};

export default function StatCard({ title, value, subtitle, icon: Icon, color, trend }: StatCardProps) {
  const c = colors[color] ?? colors.teal;
  return (
    <div style={{ background: '#fff', border: '1px solid #E8EDF2', borderRadius: 14, padding: '16px 18px' }}
      className="hover:shadow-sm transition-shadow">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <p style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>{title}</p>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon size={15} color={c.icon} />
        </div>
      </div>
      <p style={{ fontSize: 26, fontWeight: 800, color: c.val, lineHeight: 1 }}>{value}</p>
      {subtitle && <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>{subtitle}</p>}
      {trend && (
        <p style={{ fontSize: 11, color: trend.value >= 0 ? '#22C55E' : '#EF4444', marginTop: 6, fontWeight: 600 }}>
          {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}%
          <span style={{ color: '#94A3B8', fontWeight: 400, marginRight: 4 }}>{trend.label}</span>
        </p>
      )}
    </div>
  );
}
