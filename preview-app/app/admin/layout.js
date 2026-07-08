import AdminSidebar from '@/components/admin/AdminSidebar';

export const metadata = {
  title: 'PitchDeck Admin',
  description: 'Manage your whitelabel preview leads',
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <AdminSidebar />
      <main className="min-h-screen overflow-auto" style={{ paddingLeft: '14rem' }}>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
