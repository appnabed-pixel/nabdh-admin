'use client';
import { useState } from 'react';
import { Search, Trash2, EyeOff, Pin, CheckCircle, AlertTriangle, HelpCircle, Eye } from 'lucide-react';
import Topbar from '@/components/layout/Topbar';
import { mockQuestions } from '@/lib/mock-data';

const categoryLabels: Record<string, string> = {
  health: '🏥 صحة', food: '🍽️ أكل', services: '🔧 خدمات',
  general: '💡 عام', education: '📚 تعليم',
};

const statusMap: Record<string, { label: string; bg: string; color: string }> = {
  answered: { label: 'مجاب',     bg: '#F0FDF4', color: '#16A34A' },
  open:     { label: 'مفتوح',    bg: '#EFF6FF', color: '#2563EB' },
  flagged:  { label: 'مبلَّغ',   bg: '#FEF2F2', color: '#DC2626' },
  hidden:   { label: 'مخفي',     bg: '#F8FAFC', color: '#94A3B8' },
};

const filters = [
  { key: 'all',     label: 'الكل' },
  { key: 'open',    label: 'مفتوح' },
  { key: 'answered',label: 'مجاب' },
  { key: 'flagged', label: 'مبلَّغ', danger: true },
  { key: 'hidden',  label: 'مخفي' },
];

export default function QuestionsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [questions, setQuestions] = useState(mockQuestions);

  const filtered = questions.filter(q => {
    const matchSearch = !search || q.title.includes(search) || q.author.includes(search);
    const matchFilter = filter === 'all' || q.status === filter;
    return matchSearch && matchFilter;
  });

  const act = (id: string, action: 'hide' | 'resolve' | 'delete' | 'pin') => {
    setQuestions(prev =>
      action === 'delete'
        ? prev.filter(q => q.id !== id)
        : prev.map(q => q.id === id
          ? { ...q, status: action === 'hide' ? 'hidden' : action === 'resolve' ? 'answered' : q.status }
          : q)
    );
  };

  const counts = {
    all: questions.length,
    flagged: questions.filter(q => q.status === 'flagged').length,
    open: questions.filter(q => q.status === 'open').length,
    answered: questions.filter(q => q.status === 'answered').length,
  };

  return (
    <div dir="rtl" style={{ fontFamily: 'Cairo, sans-serif', minHeight: '100vh', background: '#F8FAFC' }}>
      <Topbar title="الأسئلة" subtitle={`${questions.length} سؤال إجمالي`} />

      <div style={{ padding: '24px 24px 48px' }}>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
          {[
            { label: 'إجمالي الأسئلة', value: counts.all, color: '#0F172A', bg: '#F8FAFC', border: '#E8EDF2' },
            { label: 'مفتوحة',          value: counts.open, color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE' },
            { label: 'مجاب عليها',      value: counts.answered, color: '#16A34A', bg: '#F0FDF4', border: '#BBF7D0' },
            { label: 'مبلَّغ عنها',     value: counts.flagged, color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' },
          ].map(s => (
            <div key={s.label} style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 14, padding: '16px 20px' }}>
              <p style={{ fontSize: 12, color: '#64748B', marginBottom: 8 }}>{s.label}</p>
              <p style={{ fontSize: 28, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Main card */}
        <div style={{ background: '#fff', border: '1px solid #E8EDF2', borderRadius: 16, overflow: 'hidden' }}>

          {/* Toolbar */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Search */}
            <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
              <Search size={14} color="#94A3B8" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="ابحث في الأسئلة..."
                style={{
                  width: '100%', height: 38, background: '#F8FAFC',
                  border: '1px solid #E8EDF2', borderRadius: 10,
                  paddingRight: 36, paddingLeft: 12,
                  fontSize: 13, color: '#0F172A', fontFamily: 'Cairo, sans-serif', outline: 'none',
                }}
                onFocus={e => { e.target.style.borderColor = '#14B8A6'; e.target.style.background = '#fff'; }}
                onBlur={e => { e.target.style.borderColor = '#E8EDF2'; e.target.style.background = '#F8FAFC'; }}
              />
            </div>

            {/* Filter chips */}
            <div style={{ display: 'flex', gap: 6 }}>
              {filters.map(f => (
                <button key={f.key} onClick={() => setFilter(f.key)}
                  style={{
                    height: 34, padding: '0 14px', borderRadius: 8, border: 'none',
                    fontSize: 12, fontWeight: 600, fontFamily: 'Cairo, sans-serif', cursor: 'pointer',
                    background: filter === f.key
                      ? (f.danger ? '#EF4444' : '#14B8A6')
                      : '#F8FAFC',
                    color: filter === f.key ? '#fff' : '#64748B',
                    transition: 'all 0.15s',
                  }}>
                  {f.label}
                  {(f.key === 'flagged' && counts.flagged > 0) && (
                    <span style={{ marginRight: 4, background: filter === f.key ? 'rgba(255,255,255,0.25)' : '#FEF2F2', color: filter === f.key ? '#fff' : '#DC2626', fontSize: 10, fontWeight: 700, padding: '1px 5px', borderRadius: 4 }}>
                      {counts.flagged}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          {filtered.length === 0 ? (
            <div style={{ padding: '60px 20px', textAlign: 'center' }}>
              <HelpCircle size={40} color="#CBD5E1" style={{ margin: '0 auto 12px' }} />
              <p style={{ fontSize: 14, color: '#94A3B8' }}>لا توجد أسئلة</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F8FAFC' }}>
                  {['السؤال', 'الكاتب', 'التصنيف', 'إجابات', 'الحالة', 'الإجراءات'].map(h => (
                    <th key={h} style={{ padding: '11px 20px', textAlign: 'right', fontSize: 11, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.03em', borderBottom: '1px solid #F1F5F9', whiteSpace: 'nowrap' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((q, i) => {
                  const st = statusMap[q.status] ?? statusMap.open;
                  const isFlagged = q.status === 'flagged';
                  return (
                    <tr key={q.id}
                      style={{ borderBottom: i < filtered.length - 1 ? '1px solid #F8FAFC' : 'none', background: isFlagged ? '#FFFBFB' : 'transparent', transition: 'background 0.1s' }}
                      onMouseEnter={e => { if (!isFlagged) e.currentTarget.style.background = '#FAFAFA'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = isFlagged ? '#FFFBFB' : 'transparent'; }}>

                      <td style={{ padding: '14px 20px', maxWidth: 320 }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                          {isFlagged && <AlertTriangle size={14} color="#EF4444" style={{ flexShrink: 0, marginTop: 2 }} />}
                          <div>
                            <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 280 }}>{q.title}</p>
                            <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 3 }}>{new Date(q.createdAt).toLocaleDateString('ar-DZ')}</p>
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: '14px 20px', fontSize: 13, color: '#475569', whiteSpace: 'nowrap' }}>{q.author}</td>

                      <td style={{ padding: '14px 20px' }}>
                        <span style={{ fontSize: 11, color: '#64748B', background: '#F8FAFC', border: '1px solid #E8EDF2', padding: '3px 8px', borderRadius: 6 }}>
                          {categoryLabels[q.category] ?? q.category}
                        </span>
                      </td>

                      <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#475569', background: '#F1F5F9', padding: '3px 10px', borderRadius: 6 }}>{q.answers}</span>
                      </td>

                      <td style={{ padding: '14px 20px' }}>
                        <span style={{ background: st.bg, color: st.color, fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 6, whiteSpace: 'nowrap' }}>{st.label}</span>
                      </td>

                      <td style={{ padding: '14px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          {[
                            { icon: Pin, title: 'تثبيت', color: '#F59E0B', hoverBg: '#FFFBEB', action: 'pin' as const },
                            { icon: q.status === 'hidden' ? Eye : EyeOff, title: q.status === 'hidden' ? 'إظهار' : 'إخفاء', color: '#64748B', hoverBg: '#F8FAFC', action: 'hide' as const },
                            { icon: CheckCircle, title: 'مجاب', color: '#22C55E', hoverBg: '#F0FDF4', action: 'resolve' as const },
                            { icon: Trash2, title: 'حذف', color: '#EF4444', hoverBg: '#FEF2F2', action: 'delete' as const },
                          ].map(btn => {
                            const Icon = btn.icon;
                            return (
                              <button key={btn.title} onClick={() => act(q.id, btn.action)} title={btn.title}
                                style={{ width: 30, height: 30, border: 'none', background: 'transparent', borderRadius: 7, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: btn.color, transition: 'background 0.15s' }}
                                onMouseEnter={e => { e.currentTarget.style.background = btn.hoverBg; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                                <Icon size={14} />
                              </button>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {/* Footer */}
          <div style={{ padding: '12px 20px', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontSize: 12, color: '#94A3B8' }}>{filtered.length} من {questions.length} سؤال</p>
          </div>
        </div>
      </div>
    </div>
  );
}
