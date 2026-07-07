'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const STATUS_COLORS = {
  published: 'bg-green-500/15 text-green-400 border-green-500/20',
  pending:   'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
  draft:     'bg-white/5 text-white/40 border-white/10',
};

export default function LeadsTableClient({ initialLeads }) {
  const router = useRouter();
  const [leads, setLeads] = useState(initialLeads);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [copiedId, setCopiedId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const categories = ['All', ...new Set(initialLeads.map(l => l.category))];
  const statuses = ['All', 'published', 'pending', 'draft'];

  const filtered = leads.filter(lead => {
    const matchSearch = lead.business_name?.toLowerCase().includes(search.toLowerCase()) ||
      lead.slug?.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === 'All' || lead.category === categoryFilter;
    const matchStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchSearch && matchCat && matchStatus;
  });

  async function handleDelete(id) {
    if (!confirm('Delete this lead? This cannot be undone.')) return;
    setDeletingId(id);
    const res = await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setLeads(prev => prev.filter(l => l.id !== id));
    } else {
      alert('Delete failed. Please try again.');
    }
    setDeletingId(null);
  }

  async function handleCopyLink(lead) {
    const baseUrl = window.location.origin;
    const categorySlug = lead.category?.toLowerCase().replace(/[^a-z]/g, '').replace('fitness', '') || 'gym';
    const url = `${baseUrl}/${categorySlug}/${lead.slug}`;

    // Mark as published
    await fetch(`/api/admin/leads/${lead.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'published' }),
    });

    setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, status: 'published' } : l));
    await navigator.clipboard.writeText(url);
    setCopiedId(lead.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Leads</h1>
          <p className="text-white/40 text-sm mt-1">{filtered.length} of {leads.length} leads</p>
        </div>
        <Link href="/admin/leads/new"
          className="px-4 py-2 bg-[#f36100] text-white text-sm font-semibold rounded-lg hover:bg-[#d95700] transition-colors">
          + Add Lead
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <input
          type="text"
          placeholder="Search by name or slug..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#f36100]/50"
        />
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 focus:outline-none focus:border-[#f36100]/50"
        >
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 focus:outline-none focus:border-[#f36100]/50"
        >
          {statuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#1a1a1a] border border-white/5 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left px-5 py-3.5 text-white/30 font-medium text-xs uppercase tracking-wider">Business</th>
              <th className="text-left px-5 py-3.5 text-white/30 font-medium text-xs uppercase tracking-wider">Category</th>
              <th className="text-left px-5 py-3.5 text-white/30 font-medium text-xs uppercase tracking-wider">Color</th>
              <th className="text-left px-5 py-3.5 text-white/30 font-medium text-xs uppercase tracking-wider">Status</th>
              <th className="text-right px-5 py-3.5 text-white/30 font-medium text-xs uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-12 text-white/30">No leads found</td>
              </tr>
            )}
            {filtered.map((lead, i) => (
              <tr key={lead.id}
                className={`border-b border-white/5 hover:bg-white/[0.02] transition-colors ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}`}>
                <td className="px-5 py-4">
                  <div>
                    <p className="text-white font-medium">{lead.business_name}</p>
                    <p className="text-white/30 text-xs mt-0.5">{lead.slug}</p>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="text-white/60 text-xs">{lead.category}</span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-full border border-white/10 flex-shrink-0"
                      style={{ backgroundColor: lead.primary_color || '#f36100' }}
                    />
                    <span className="text-white/40 text-xs font-mono">{lead.primary_color}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${STATUS_COLORS[lead.status] || STATUS_COLORS.draft}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleCopyLink(lead)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                        copiedId === lead.id
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-[#f36100]/10 text-[#f36100] hover:bg-[#f36100]/20'
                      }`}
                    >
                      {copiedId === lead.id ? '✓ Copied!' : '🔗 Get Link'}
                    </button>
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="px-3 py-1.5 text-xs font-semibold rounded-md bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(lead.id)}
                      disabled={deletingId === lead.id}
                      className="px-3 py-1.5 text-xs font-semibold rounded-md bg-red-500/5 text-red-400/60 hover:bg-red-500/15 hover:text-red-400 transition-all"
                    >
                      {deletingId === lead.id ? '...' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
