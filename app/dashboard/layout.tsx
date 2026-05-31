import Sidebar from '@/components/layout/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh', overflow: 'hidden', background: '#F8FAFC', direction: 'ltr' }}>
      <main style={{ flex: 1, overflowY: 'auto', minWidth: 0, direction: 'rtl' }}>{children}</main>
      <Sidebar />
    </div>
  );
}
