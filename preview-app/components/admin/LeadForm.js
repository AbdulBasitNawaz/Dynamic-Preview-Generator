'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
  'Gym / Fitness',
  'Salon / Spa',
  'Café / Restaurant',
  'Retail / E-commerce',
  'Local Business',
  'Medical / Clinic',
  'Education',
  'Real Estate',
];

function toSlug(name = '') {
  return name.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function LeadForm({ initialData = {}, mode = 'new' }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    business_name: initialData.business_name || '',
    slug: initialData.slug || '',
    category: initialData.category || 'Gym / Fitness',
    primary_color: initialData.primary_color || '#f36100',
    logo_url: initialData.logo_url || '',
    image1: initialData.image1 || '',
    image2: initialData.image2 || '',
    image3: initialData.image3 || '',
    phone: initialData.phone || '',
    status: initialData.status || 'draft',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => {
      const updated = { ...prev, [name]: value };
      // Auto-generate slug when name changes (new mode only)
      if (name === 'business_name' && mode === 'new') {
        updated.slug = toSlug(value);
      }
      return updated;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const url = mode === 'new' ? '/api/admin/leads' : `/api/admin/leads/${initialData.id}`;
    const method = mode === 'new' ? 'POST' : 'PATCH';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Something went wrong. Please try again.');
      setSaving(false);
      return;
    }

    router.push('/admin/leads');
    router.refresh();
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-white">
          {mode === 'new' ? 'Add New Lead' : 'Edit Lead'}
        </h1>
        <p className="text-white/40 text-sm mt-1">
          {mode === 'new' ? 'Add a new business to your pipeline' : `Editing: ${initialData.business_name}`}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Business Name */}
        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
            Business Name *
          </label>
          <input
            name="business_name"
            value={form.business_name}
            onChange={handleChange}
            required
            placeholder="e.g. Mukhtiar Gold Gym"
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#f36100]/60 transition-colors"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
            URL Slug *
          </label>
          <div className="flex items-center bg-[#1a1a1a] border border-white/10 rounded-lg overflow-hidden focus-within:border-[#f36100]/60 transition-colors">
            <span className="px-3 text-white/20 text-sm border-r border-white/10 py-3 select-none">/gym/</span>
            <input
              name="slug"
              value={form.slug}
              onChange={handleChange}
              required
              placeholder="mukhtiar-gold-gym"
              className="flex-1 bg-transparent px-3 py-3 text-white text-sm placeholder-white/20 focus:outline-none"
            />
          </div>
        </div>

        {/* Category + Status Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#f36100]/60"
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#f36100]/60"
            >
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        {/* Primary Color */}
        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
            Primary Brand Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              name="primary_color"
              value={form.primary_color}
              onChange={handleChange}
              className="w-12 h-12 rounded-lg cursor-pointer border-0 bg-transparent"
            />
            <input
              name="primary_color"
              value={form.primary_color}
              onChange={handleChange}
              placeholder="#f36100"
              className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-mono placeholder-white/20 focus:outline-none focus:border-[#f36100]/60"
            />
            <div className="w-10 h-10 rounded-lg border border-white/10" style={{ backgroundColor: form.primary_color }} />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-2">
          <p className="text-xs text-white/30 uppercase tracking-wider font-semibold mb-4">Assets (URLs)</p>
        </div>

        {/* Logo URL */}
        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Logo URL</label>
          <input
            name="logo_url"
            value={form.logo_url}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#f36100]/60"
          />
        </div>

        {/* Images */}
        {['image1', 'image2', 'image3'].map((field, i) => (
          <div key={field}>
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
              Image {i + 1} URL {i === 0 && '(Hero / Main)'}
            </label>
            <input
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#f36100]/60"
            />
          </div>
        ))}

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Phone Number</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+923001234567"
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#f36100]/60"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-[#f36100] text-white text-sm font-bold rounded-lg hover:bg-[#d95700] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : mode === 'new' ? 'Save Lead' : 'Update Lead'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/leads')}
            className="px-6 py-3 bg-white/5 text-white/60 text-sm font-semibold rounded-lg hover:bg-white/10 transition-colors border border-white/10"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
