import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function getStats() {
  const { data: leads } = await supabase.from('leads').select('status, category');
  const total = leads?.length || 0;
  const published = leads?.filter(l => l.status === 'published').length || 0;
  const pending = leads?.filter(l => l.status === 'pending').length || 0;
  const draft = leads?.filter(l => l.status === 'draft').length || 0;

  const categories = {};
  leads?.forEach(l => { categories[l.category] = (categories[l.category] || 0) + 1; });

  return { total, published, pending, draft, categories };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const statCards = [
    { label: 'Total Leads', value: stats.total, color: '#f36100', icon: '☰' },
    { label: 'Published', value: stats.published, color: '#22c55e', icon: '✓' },
    { label: 'Pending', value: stats.pending, color: '#eab308', icon: '⏳' },
    { label: 'Draft', value: stats.draft, color: '#6b7280', icon: '✎' },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-white/40 text-sm mt-1">Overview of your whitelabel leads pipeline</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map((card) => (
          <div key={card.label} className="bg-[#1a1a1a] border border-white/5 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/40 text-xs font-medium uppercase tracking-wider">{card.label}</span>
              <span className="text-lg" style={{ color: card.color }}>{card.icon}</span>
            </div>
            <p className="text-3xl font-black" style={{ color: card.color }}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Category Breakdown */}
      <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6 mb-6">
        <h2 className="text-white font-semibold mb-4">Leads by Category</h2>
        <div className="space-y-3">
          {Object.entries(stats.categories).sort((a, b) => b[1] - a[1]).map(([cat, count]) => (
            <div key={cat} className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/70">{cat}</span>
                  <span className="text-white/40">{count}</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#f36100]"
                    style={{ width: `${(count / stats.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3">
        <Link href="/admin/leads"
          className="px-5 py-2.5 bg-[#f36100] text-white text-sm font-semibold rounded-lg hover:bg-[#d95700] transition-colors">
          View All Leads →
        </Link>
        <Link href="/admin/leads/new"
          className="px-5 py-2.5 bg-white/5 text-white/70 text-sm font-semibold rounded-lg hover:bg-white/10 transition-colors border border-white/10">
          + Add New Lead
        </Link>
      </div>
    </div>
  );
}
