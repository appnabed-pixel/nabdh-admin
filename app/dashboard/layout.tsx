import Sidebar from '@/components/layout/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main">{children}</main>
      <style>{`
        .admin-layout {
          display: flex !important;
          flex-direction: row-reverse !important;
          height: 100vh;
          overflow: hidden;
          background: #F8FAFC;
        }
        .admin-main {
          flex: 1;
          overflow-y: auto;
          min-width: 0;
        }
      `}</style>
    </div>
  );
}
