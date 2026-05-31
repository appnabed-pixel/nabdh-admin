import Sidebar from '@/components/layout/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <main style={{ marginRight: 240, minHeight: '100vh', overflowY: 'auto', background: '#F8FAFC' }}>
        {children}
      </main>
    </>
  );
}
