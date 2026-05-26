import { CROWD_LABELS } from '@/lib/constants';

const styles: Record<string, string> = {
  empty: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-yellow-100 text-yellow-700',
  full: 'bg-red-100 text-red-700',
  veryFull: 'bg-gray-800 text-white',
};

const dots: Record<string, string> = {
  empty: 'bg-emerald-500',
  medium: 'bg-yellow-500',
  full: 'bg-red-500',
  veryFull: 'bg-gray-500',
};

export default function CrowdBadge({ level }: { level: string | null }) {
  if (!level) return <span className="text-gray-300 text-xs">—</span>;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${styles[level]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[level]}`} />
      {CROWD_LABELS[level]}
    </span>
  );
}
