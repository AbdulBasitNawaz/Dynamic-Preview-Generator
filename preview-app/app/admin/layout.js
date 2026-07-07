import AdminSidebar from '@/components/admin/AdminSidebar';

export const metadata = {
  title: 'PitchDeck Admin',
  description: 'Manage your whitelabel preview leads',
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#111111] text-white flex">
      <AdminSidebar />
      <main className="ml-56 flex-1 min-h-screen overflow-auto">
        {children}
      </main>
    </div>
  );
}
